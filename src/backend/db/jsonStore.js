/**
 * JSON File Store — local database implementation
 * Reads from src/data/*.json files. Used when DATABASE_URL is not set.
 */
const fs = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(__dirname, '../../', process.env.DATA_DIR)
  : path.resolve(__dirname, '../../data');

function load(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Data file not found: ${filePath}\nRun "npm run seed" first to generate synthetic data.`
    );
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

// Cache loaded data in memory for the process lifetime
let _cache = {};
function getData(key, file) {
  if (!_cache[key]) _cache[key] = load(file);
  return _cache[key];
}

function getAccounts()       { return getData('accounts',       'accounts.json'); }
function getTransactions()   { return getData('transactions',   'transactions.json'); }
function getAlerts()         { return getData('alerts',         'alerts.json'); }
function getRiskFactors()    { return getData('risk_factors',   'risk_factors.json'); }
function getInvestigations() { return getData('investigations', 'investigations.json'); }

// Invalidate cache entry so mutations are reflected
function invalidate(key) { delete _cache[key]; }

// ─── Persist mutations ────────────────────────────────────────────────────────
function saveInvestigations(data) {
  fs.writeFileSync(path.join(DATA_DIR, 'investigations.json'), JSON.stringify(data, null, 2));
  invalidate('investigations');
}

// ─── Query methods ────────────────────────────────────────────────────────────

function queryAlerts({ page = 1, limit = 20, search = '', riskLevel = '', status = '', location = '' } = {}) {
  let alerts = getAlerts();
  const accounts = getAccounts();
  const transactions = getTransactions();
  const investigations = getInvestigations();

  // Enrich alerts with account name, transaction location, and live investigation status
  alerts = alerts.map(a => {
    const acc = accounts.find(ac => ac.id === a.account_id) || {};
    const txn = transactions.find(t => t.id === a.transaction_id) || {};
    const inv = investigations.find(i => i.alert_id === a.id);
    return {
      ...a,
      customer_name: acc.customer_name || '',
      location: txn.location || '',
      status: inv ? inv.status : a.status,
    };
  });

  if (search) {
    const q = search.toLowerCase();
    alerts = alerts.filter(a =>
      a.id.toLowerCase().includes(q) ||
      a.customer_name.toLowerCase().includes(q) ||
      a.account_id.toLowerCase().includes(q)
    );
  }
  if (riskLevel) alerts = alerts.filter(a => a.risk_level === riskLevel.toUpperCase());
  if (status)    alerts = alerts.filter(a => a.status === status.toUpperCase());
  if (location)  alerts = alerts.filter(a => a.location.toLowerCase().includes(location.toLowerCase()));

  // Sort: newest first
  alerts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

  const total = alerts.length;
  const pages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const data = alerts.slice(offset, offset + limit);

  return { data, pagination: { page: Number(page), limit: Number(limit), total, pages } };
}

function queryAlertStats() {
  const alerts = getAlerts();
  const investigations = getInvestigations();

  return {
    totalAlerts: alerts.length,
    criticalAlerts: alerts.filter(a => a.risk_level === 'CRITICAL').length,
    highRiskAlerts: alerts.filter(a => a.risk_level === 'HIGH').length,
    pendingInvestigations: investigations.filter(i => i.status === 'OPEN' || i.status === 'ESCALATED').length,
    byRiskLevel: {
      CRITICAL: alerts.filter(a => a.risk_level === 'CRITICAL').length,
      HIGH:     alerts.filter(a => a.risk_level === 'HIGH').length,
      MEDIUM:   alerts.filter(a => a.risk_level === 'MEDIUM').length,
      LOW:      alerts.filter(a => a.risk_level === 'LOW').length,
    },
    hourlyTrend: buildHourlyTrend(alerts),
  };
}

function buildHourlyTrend(alerts) {
  const now = new Date();
  const hours = [];
  for (let i = 23; i >= 0; i--) {
    const from = new Date(now.getTime() - (i + 1) * 3600000);
    const to   = new Date(now.getTime() - i * 3600000);
    const label = `${String(to.getHours()).padStart(2, '0')}:00`;
    const count = alerts.filter(a => {
      const t = new Date(a.created_at);
      return t >= from && t < to;
    }).length;
    hours.push({ label, count });
  }
  return hours;
}

function queryAlertById(id) {
  const alerts       = getAlerts();
  const accounts     = getAccounts();
  const transactions = getTransactions();
  const riskFactors  = getRiskFactors();
  const investigations = getInvestigations();

  const alert = alerts.find(a => a.id === id);
  if (!alert) return null;

  const transaction = transactions.find(t => t.id === alert.transaction_id) || null;
  const account     = accounts.find(a => a.id === alert.account_id) || null;
  const factors     = riskFactors.filter(r => r.alert_id === id);
  const investigation = investigations.find(i => i.alert_id === id) || null;

  // Recent transaction velocity — last 10 transactions for this account
  const recentTransactions = transactions
    .filter(t => t.sender_id === alert.account_id || t.receiver_id === alert.account_id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 10);

  // Preceding sequence — transactions within 10 minutes before/after alert transaction
  let precedingSequence = [];
  if (transaction) {
    const alertTime = new Date(transaction.timestamp).getTime();
    precedingSequence = transactions
      .filter(t =>
        (t.sender_id === alert.account_id) &&
        Math.abs(new Date(t.timestamp).getTime() - alertTime) <= 600000
      )
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  }

  return { alert, transaction, account, riskFactors: factors, recentTransactions, precedingSequence, investigation };
}

function queryAccountById(id) {
  const accounts = getAccounts();
  return accounts.find(a => a.id === id) || null;
}

function queryAccountTransactions(id, { page = 1, limit = 20 } = {}) {
  const transactions = getTransactions();
  let txns = transactions
    .filter(t => t.sender_id === id || t.receiver_id === id)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const total = txns.length;
  const pages = Math.ceil(total / limit);
  const data  = txns.slice((page - 1) * limit, page * limit);
  return { data, pagination: { page: Number(page), limit: Number(limit), total, pages } };
}

function queryInvestigations({ status = '' } = {}) {
  const investigations = getInvestigations();
  const alerts = getAlerts();
  let inv = investigations.map(i => {
    const alert = alerts.find(a => a.id === i.alert_id) || {};
    return { ...i, risk_level: alert.risk_level, risk_score: alert.risk_score };
  });
  if (status) inv = inv.filter(i => i.status === status.toUpperCase());
  return inv.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

function updateInvestigationStatus(alertId, newStatus, notes) {
  const investigations = getInvestigations();
  let inv = investigations.find(i => i.alert_id === alertId);

  if (!inv) {
    // Create a new investigation record
    inv = {
      id: `INV-${alertId}`,
      alert_id: alertId,
      status: newStatus,
      decision: newStatus,
      notes: notes || '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
    investigations.push(inv);
  } else {
    inv.status = newStatus;
    inv.decision = newStatus;
    if (notes) inv.notes = notes;
    inv.updated_at = new Date().toISOString();
  }

  saveInvestigations(investigations);
  invalidate('investigations');
  return inv;
}

module.exports = {
  queryAlerts,
  queryAlertStats,
  queryAlertById,
  queryAccountById,
  queryAccountTransactions,
  queryInvestigations,
  updateInvestigationStatus,
};
