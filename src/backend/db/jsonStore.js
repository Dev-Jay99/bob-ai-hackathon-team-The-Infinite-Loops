/**
 * JSON File Store — local database implementation
 * Reads and writes to src/data/*.json files. Used when DATABASE_URL is not set.
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

function saveTransactions(data) {
  fs.writeFileSync(path.join(DATA_DIR, 'transactions.json'), JSON.stringify(data, null, 2));
  invalidate('transactions');
}

function saveAlerts(data) {
  fs.writeFileSync(path.join(DATA_DIR, 'alerts.json'), JSON.stringify(data, null, 2));
  invalidate('alerts');
}

function saveRiskFactors(data) {
  fs.writeFileSync(path.join(DATA_DIR, 'risk_factors.json'), JSON.stringify(data, null, 2));
  invalidate('risk_factors');
}

// ─── Timeline Helper ──────────────────────────────────────────────────────────
function buildTimeline(alert, txn, inv, verificationStatus, verificationResponse, verificationTime) {
  if (inv && Array.isArray(inv.timeline) && inv.timeline.length > 0) {
    return inv.timeline;
  }

  const txTime = txn ? txn.timestamp : alert.created_at;
  const analysisTime = new Date(new Date(txTime).getTime() + 2000).toISOString();
  const dispatchTime = new Date(new Date(txTime).getTime() + 4000).toISOString();

  const events = [
    {
      id: 'evt-init',
      type: 'TRANSACTION_DETECTED',
      title: 'Transaction Initiated',
      description: `Transaction ${txn ? txn.id : alert.transaction_id} of ₹${Number(txn ? txn.amount : 0).toLocaleString('en-IN')} initiated from ${txn ? txn.location : 'Unknown'} on device ${txn ? txn.device : 'Standard'}.`,
      timestamp: txTime,
    },
    {
      id: 'evt-risk',
      type: 'RISK_ANALYSIS_COMPLETED',
      title: 'Risk Analysis Completed',
      description: `Risk Engine evaluated transaction at score ${alert.risk_score || 0}/100 (${alert.risk_level || 'LOW'}).`,
      timestamp: analysisTime,
    },
  ];

  const vStatus = verificationStatus || (txn ? txn.customer_verification : 'NOT_REQUIRED') || 'NOT_REQUIRED';
  if (vStatus !== 'NOT_REQUIRED') {
    events.push({
      id: 'evt-dispatch',
      type: 'VERIFICATION_REQUESTED',
      title: 'Customer Verification Dispatched',
      description: 'AI Copilot prompted the account owner to verify transaction authorization.',
      timestamp: dispatchTime,
    });
  }

  if (vStatus === 'CONFIRMED') {
    events.push({
      id: 'evt-confirmed',
      type: 'CUSTOMER_CONFIRMED',
      title: 'Customer Confirmed Transaction',
      description: `Account owner confirmed: "${verificationResponse || 'Yes, this was me'}". Transaction authorized.`,
      timestamp: verificationTime || dispatchTime,
    });
  } else if (vStatus === 'DENIED') {
    events.push({
      id: 'evt-denied',
      type: 'CUSTOMER_DENIED',
      title: 'Customer Denied Transaction',
      description: `Account owner reported: "${verificationResponse || 'I did not make this transaction'}". Customer flagged unauthorized activity.`,
      timestamp: verificationTime || dispatchTime,
    });
    events.push({
      id: 'evt-escalate',
      type: 'INVESTIGATION_ESCALATED',
      title: 'Alert Escalated to Investigator Queue',
      description: 'High-priority investigation case created for urgent forensic review and cardholder protection.',
      timestamp: new Date(new Date(verificationTime || dispatchTime).getTime() + 1000).toISOString(),
    });
  }

  if (inv && (inv.status === 'ESCALATED' || inv.status === 'MONITORED' || inv.status === 'DISMISSED')) {
    events.push({
      id: 'evt-decision',
      type: 'INVESTIGATOR_DECISION',
      title: `Investigator Action: ${inv.status}`,
      description: inv.notes ? `Investigator noted: "${inv.notes}"` : `Case status updated to ${inv.status}.`,
      timestamp: inv.updated_at || new Date().toISOString(),
    });
  }

  return events;
}

// ─── Enriched Alerts Helper ───────────────────────────────────────────────────
function getEnrichedAlerts() {
  const alerts = getAlerts();
  const accounts = getAccounts();
  const transactions = getTransactions();
  const investigations = getInvestigations();
  const { calculateRiskScore } = require('../risk-engine/scoring');

  return alerts.map(a => {
    const acc = accounts.find(ac => ac.id === a.account_id) || {};
    const txn = transactions.find(t => t.id === a.transaction_id) || {};
    const inv = investigations.find(i => i.alert_id === a.id);
    const risk = calculateRiskScore(a, txn, acc);

    // Derive verification state: alert > txn > inv > default
    let customerVerification = a.customer_verification || (txn ? txn.customer_verification : null) || (inv ? inv.customer_verification : null);
    if (!customerVerification) {
      if (a.status === 'DISMISSED' || (inv && inv.status === 'DISMISSED')) {
        customerVerification = 'CONFIRMED';
      } else if (a.id === 'ALT-10482' || (txn && txn.id === 'TXN10482')) {
        customerVerification = 'PENDING';
      } else if (risk.totalScore >= 35) {
        customerVerification = 'PENDING';
      } else {
        customerVerification = 'NOT_REQUIRED';
      }
    }

    const customerResponse = txn.customer_verification_response || (inv ? inv.customer_response : '') || '';
    const customerVerificationTime = txn.customer_verification_timestamp || (inv ? inv.customer_verification_timestamp : null);

    const timeline = buildTimeline(
      { ...a, risk_score: risk.totalScore, risk_level: risk.riskLevel },
      txn,
      inv,
      customerVerification,
      customerResponse,
      customerVerificationTime
    );

    return {
      ...a,
      customer_name: acc.customer_name || '',
      location: txn.location || '',
      amount: txn.amount || 0,
      risk_score: risk.totalScore,
      risk_level: risk.riskLevel,
      status: inv ? inv.status : a.status,
      customer_verification: customerVerification,
      customer_response: customerResponse,
      customer_verification_timestamp: customerVerificationTime,
      timeline,
    };
  });
}

// ─── Alert Queries ────────────────────────────────────────────────────────────
function queryAlerts({ page = 1, limit = 20, search = '', riskLevel = '', status = '', location = '', customerVerification = '' } = {}) {
  let alerts = getEnrichedAlerts();

  if (search) {
    const q = search.toLowerCase();
    alerts = alerts.filter(a =>
      a.id.toLowerCase().includes(q) ||
      a.customer_name.toLowerCase().includes(q) ||
      a.account_id.toLowerCase().includes(q) ||
      (a.transaction_id && a.transaction_id.toLowerCase().includes(q))
    );
  }
  if (riskLevel)            alerts = alerts.filter(a => a.risk_level === riskLevel.toUpperCase());
  if (status)               alerts = alerts.filter(a => a.status === status.toUpperCase());
  if (location)             alerts = alerts.filter(a => a.location.toLowerCase().includes(location.toLowerCase()));
  if (customerVerification) alerts = alerts.filter(a => (a.customer_verification || 'NOT_REQUIRED').toUpperCase() === customerVerification.toUpperCase());

  // Sort: newest first, but prioritize customer DENIED alerts to the top
  alerts.sort((a, b) => {
    if (a.customer_verification === 'DENIED' && b.customer_verification !== 'DENIED') return -1;
    if (b.customer_verification === 'DENIED' && a.customer_verification !== 'DENIED') return 1;
    return new Date(b.created_at) - new Date(a.created_at);
  });

  const total = alerts.length;
  const pages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const data = alerts.slice(offset, offset + limit);

  return { data, pagination: { page: Number(page), limit: Number(limit), total, pages } };
}

function queryAlertStats() {
  const alerts = getEnrichedAlerts();
  const investigations = getInvestigations();

  return {
    totalAlerts: alerts.length,
    criticalAlerts: alerts.filter(a => a.risk_level === 'CRITICAL').length,
    highRiskAlerts: alerts.filter(a => a.risk_level === 'HIGH').length,
    pendingInvestigations: investigations.filter(i => i.status === 'OPEN' || i.status === 'ESCALATED').length,
    customerConfirmed: alerts.filter(a => a.customer_verification === 'CONFIRMED').length,
    customerDenied: alerts.filter(a => a.customer_verification === 'DENIED').length,
    pendingVerification: alerts.filter(a => a.customer_verification === 'PENDING').length,
    escalatedInvestigations: investigations.filter(i => i.status === 'ESCALATED').length,
    monitoredInvestigations: investigations.filter(i => i.status === 'MONITORED').length,
    byRiskLevel: {
      CRITICAL: alerts.filter(a => a.risk_level === 'CRITICAL').length,
      HIGH:     alerts.filter(a => a.risk_level === 'HIGH').length,
      MEDIUM:   alerts.filter(a => a.risk_level === 'MEDIUM').length,
      LOW:      alerts.filter(a => a.risk_level === 'LOW').length,
    },
    byVerification: {
      DENIED:    alerts.filter(a => a.customer_verification === 'DENIED').length,
      CONFIRMED: alerts.filter(a => a.customer_verification === 'CONFIRMED').length,
      PENDING:   alerts.filter(a => a.customer_verification === 'PENDING').length,
      NOT_REQUIRED: alerts.filter(a => a.customer_verification === 'NOT_REQUIRED').length,
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
  const investigations = getInvestigations();
  const { calculateRiskScore } = require('../risk-engine/scoring');

  const rawAlert = alerts.find(a => a.id === id);
  if (!rawAlert) return null;

  const transaction = transactions.find(t => t.id === rawAlert.transaction_id) || null;
  const account     = accounts.find(a => a.id === rawAlert.account_id) || null;
  const investigation = investigations.find(i => i.alert_id === id) || null;

  // Calculate live risk assessment
  const riskAssessment = calculateRiskScore(rawAlert, transaction, account);

  // Derive customer verification state
  let customerVerification = rawAlert.customer_verification || (transaction ? transaction.customer_verification : null) || (investigation ? investigation.customer_verification : null);
  if (!customerVerification) {
    if (rawAlert.status === 'DISMISSED' || (investigation && investigation.status === 'DISMISSED')) {
      customerVerification = 'CONFIRMED';
    } else if (rawAlert.id === 'ALT-10482' || (transaction && transaction.id === 'TXN10482')) {
      customerVerification = 'PENDING';
    } else if (riskAssessment.totalScore >= 35) {
      customerVerification = 'PENDING';
    } else {
      customerVerification = 'NOT_REQUIRED';
    }
  }

  const customerResponse = (transaction && transaction.customer_verification_response) || (investigation && investigation.customer_response) || '';
  const customerVerificationTime = (transaction && transaction.customer_verification_timestamp) || (investigation && investigation.customer_verification_timestamp) || null;

  const alert = {
    ...rawAlert,
    risk_score: riskAssessment.totalScore,
    risk_level: riskAssessment.riskLevel,
    status: investigation ? investigation.status : rawAlert.status,
    customer_verification: customerVerification,
    customer_response: customerResponse,
    customer_verification_timestamp: customerVerificationTime,
  };

  const factors = riskAssessment.factors.map(f => ({
    alert_id: id,
    factor_name: f.name,
    score: f.score,
    max_score: f.maxScore,
    explanation: f.explanation,
  }));

  const timeline = buildTimeline(alert, transaction, investigation, customerVerification, customerResponse, customerVerificationTime);

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

  return {
    alert,
    transaction,
    account,
    riskFactors: factors,
    riskAssessment,
    recentTransactions,
    precedingSequence,
    investigation,
    timeline,
    customerVerification: {
      status: customerVerification,
      response: customerResponse,
      timestamp: customerVerificationTime,
    },
  };
}

// ─── Transaction Queries ──────────────────────────────────────────────────────
function queryTransactions({ page = 1, limit = 20, accountId = '', verification = '', status = '', search = '' } = {}) {
  const transactions = getTransactions();
  const accounts     = getAccounts();
  const alerts       = getAlerts();
  const { calculateRiskScore } = require('../risk-engine/scoring');

  let list = transactions.map(t => {
    const sender   = accounts.find(a => a.id === t.sender_id) || {};
    const receiver = accounts.find(a => a.id === t.receiver_id) || {};
    const alert    = alerts.find(a => a.transaction_id === t.id);
    const risk     = calculateRiskScore(alert || { account_id: t.sender_id }, t, sender);

    let customerVerification = t.customer_verification;
    if (!customerVerification) {
      if (t.id === 'TXN10482' || (alert && alert.id === 'ALT-10482')) {
        customerVerification = 'PENDING';
      } else if (risk.totalScore >= 35) {
        customerVerification = 'PENDING';
      } else {
        customerVerification = 'NOT_REQUIRED';
      }
    }

    let txnStatus = t.status || 'COMPLETED';
    if (customerVerification === 'CONFIRMED') {
      txnStatus = 'USER_CONFIRMED';
    } else if (customerVerification === 'DENIED') {
      txnStatus = 'UNDER_INVESTIGATION';
    } else if (customerVerification === 'PENDING') {
      txnStatus = 'UNUSUAL_PENDING_VERIFICATION';
    } else if (risk.totalScore < 35) {
      txnStatus = 'NORMAL';
    }

    return {
      ...t,
      sender_name: sender.customer_name || t.sender_id,
      receiver_name: receiver.customer_name || t.receiver_id,
      risk_score: risk.totalScore,
      risk_level: risk.riskLevel,
      customer_verification: customerVerification,
      customer_verification_response: t.customer_verification_response || '',
      customer_verification_timestamp: t.customer_verification_timestamp || null,
      transaction_status: txnStatus,
      alert_id: alert ? alert.id : null,
    };
  });

  if (accountId) {
    list = list.filter(t => t.sender_id === accountId || t.receiver_id === accountId);
  }
  if (verification) {
    list = list.filter(t => (t.customer_verification || 'NOT_REQUIRED').toUpperCase() === verification.toUpperCase());
  }
  if (status) {
    list = list.filter(t => (t.transaction_status || t.status || '').toUpperCase() === status.toUpperCase());
  }
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(t =>
      t.id.toLowerCase().includes(q) ||
      (t.sender_name && t.sender_name.toLowerCase().includes(q)) ||
      (t.receiver_name && t.receiver_name.toLowerCase().includes(q)) ||
      (t.location && t.location.toLowerCase().includes(q))
    );
  }

  // Sort newest first
  list.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  const total = list.length;
  const pages = Math.ceil(total / limit);
  const offset = (page - 1) * limit;
  const data = list.slice(offset, offset + limit);

  return { data, pagination: { page: Number(page), limit: Number(limit), total, pages } };
}

function queryTransactionById(id) {
  const transactions = getTransactions();
  const accounts     = getAccounts();
  const alerts       = getAlerts();
  const { calculateRiskScore } = require('../risk-engine/scoring');

  const txn = transactions.find(t => t.id === id);
  if (!txn) return null;

  const sender   = accounts.find(a => a.id === txn.sender_id) || {};
  const receiver = accounts.find(a => a.id === txn.receiver_id) || {};
  const alert    = alerts.find(a => a.transaction_id === id) || null;
  const risk     = calculateRiskScore(alert || { account_id: txn.sender_id }, txn, sender);

  let customerVerification = txn.customer_verification;
  if (!customerVerification) {
    if (txn.id === 'TXN10482' || (alert && alert.id === 'ALT-10482')) {
      customerVerification = 'PENDING';
    } else if (risk.totalScore >= 35) {
      customerVerification = 'PENDING';
    } else {
      customerVerification = 'NOT_REQUIRED';
    }
  }

  let txnStatus = txn.status || 'COMPLETED';
  if (customerVerification === 'CONFIRMED') {
    txnStatus = 'USER_CONFIRMED';
  } else if (customerVerification === 'DENIED') {
    txnStatus = 'UNDER_INVESTIGATION';
  } else if (customerVerification === 'PENDING') {
    txnStatus = 'UNUSUAL_PENDING_VERIFICATION';
  } else if (risk.totalScore < 35) {
    txnStatus = 'NORMAL';
  }

  return {
    transaction: {
      ...txn,
      sender_name: sender.customer_name || txn.sender_id,
      receiver_name: receiver.customer_name || txn.receiver_id,
      risk_score: risk.totalScore,
      risk_level: risk.riskLevel,
      customer_verification: customerVerification,
      customer_verification_response: txn.customer_verification_response || '',
      customer_verification_timestamp: txn.customer_verification_timestamp || null,
      transaction_status: txnStatus,
      alert_id: alert ? alert.id : null,
    },
    sender,
    receiver,
    alert,
    riskAssessment: risk,
  };
}

// ─── Customer Verification Workflow ───────────────────────────────────────────
function verifyTransaction(txnId, verificationResponse, notes = '') {
  const normalized = String(verificationResponse || '').trim().toUpperCase();
  if (normalized !== 'CONFIRMED' && normalized !== 'DENIED') {
    throw new Error('Invalid verification response. Must be "CONFIRMED" or "DENIED".');
  }

  const transactions   = getTransactions();
  const alerts         = getAlerts();
  const accounts       = getAccounts();
  const investigations = getInvestigations();
  const { calculateRiskScore } = require('../risk-engine/scoring');

  const txnIndex = transactions.findIndex(t => t.id === txnId);
  if (txnIndex === -1) {
    throw new Error(`Transaction ${txnId} not found.`);
  }

  const txn = transactions[txnIndex];
  const sender = accounts.find(a => a.id === txn.sender_id) || {};
  const responseText = normalized === 'CONFIRMED'
    ? 'Yes, this was me'
    : 'I did not make this transaction';
  const now = new Date().toISOString();

  // 1. Update Transaction
  txn.customer_verification = normalized;
  txn.customer_verification_response = responseText;
  txn.customer_verification_timestamp = now;
  txn.status = normalized === 'CONFIRMED' ? 'USER_CONFIRMED' : 'USER_DENIED';
  transactions[txnIndex] = txn;
  saveTransactions(transactions);

  // 2. Find or Create Alert
  let alert = alerts.find(a => a.transaction_id === txnId);
  const risk = calculateRiskScore(alert || { account_id: txn.sender_id }, txn, sender);

  if (!alert) {
    const alertId = `ALT-${txnId.replace(/^TXN/, '') || Date.now()}`;
    alert = {
      id: alertId,
      transaction_id: txnId,
      account_id: txn.sender_id,
      risk_score: risk.totalScore,
      risk_level: risk.riskLevel,
      status: normalized === 'DENIED' ? 'ESCALATED' : 'DISMISSED',
      customer_verification: normalized,
      customer_response: responseText,
      customer_verification_timestamp: now,
      created_at: txn.timestamp || now,
      updated_at: now,
    };
    alerts.unshift(alert);
  } else {
    alert.risk_score = risk.totalScore;
    alert.risk_level = risk.riskLevel;
    alert.customer_verification = normalized;
    alert.customer_response = responseText;
    alert.customer_verification_timestamp = now;
    if (normalized === 'DENIED') {
      alert.status = 'ESCALATED';
    } else if (normalized === 'CONFIRMED') {
      alert.status = 'DISMISSED';
    }
    alert.updated_at = now;
  }
  saveAlerts(alerts);

  // 3. Find or Create Investigation
  let inv = investigations.find(i => i.alert_id === alert.id);
  if (!inv) {
    inv = {
      id: `INV-${alert.id}`,
      alert_id: alert.id,
      status: normalized === 'DENIED' ? 'ESCALATED' : 'DISMISSED',
      decision: normalized === 'DENIED' ? 'ESCALATED' : 'DISMISSED',
      notes: notes || (normalized === 'CONFIRMED' ? 'Customer confirmed transaction authorization. Resolved.' : ''),
      customer_verification: normalized,
      customer_response: responseText,
      customer_verification_timestamp: now,
      priority: normalized === 'DENIED' ? 'CRITICAL' : 'NORMAL',
      created_at: now,
      updated_at: now,
      timeline: [],
    };
    investigations.push(inv);
  } else {
    inv.customer_verification = normalized;
    inv.customer_response = responseText;
    inv.customer_verification_timestamp = now;
    if (normalized === 'DENIED') {
      inv.status = 'ESCALATED';
      inv.decision = 'ESCALATED';
      inv.priority = 'CRITICAL';
    } else if (normalized === 'CONFIRMED') {
      inv.status = 'DISMISSED';
      inv.decision = 'DISMISSED';
    }
    if (notes) inv.notes = notes;
    inv.updated_at = now;
  }

  // 4. Update Auditable Timeline
  const existingTimeline = Array.isArray(inv.timeline) && inv.timeline.length > 0
    ? inv.timeline
    : buildTimeline(alert, txn, inv, 'PENDING', '', '');

  if (normalized === 'CONFIRMED') {
    existingTimeline.push({
      id: `evt-${Date.now()}`,
      type: 'CUSTOMER_CONFIRMED',
      title: 'Customer Confirmed Transaction',
      description: `Account owner ${sender.customer_name || txn.sender_id} verified: "Yes, this was me". Cardholder authorization documented.`,
      timestamp: now,
    });
  } else {
    existingTimeline.push({
      id: `evt-${Date.now()}`,
      type: 'CUSTOMER_DENIED',
      title: 'Customer Denied Transaction',
      description: `Account owner ${sender.customer_name || txn.sender_id} reported: "I did not make this transaction". Flagged as suspected unauthorized access.`,
      timestamp: now,
    });
    existingTimeline.push({
      id: `evt-${Date.now() + 1}`,
      type: 'INVESTIGATION_ESCALATED',
      title: 'High-Priority Alert Escalated to Human Investigator',
      description: 'Case escalated with CRITICAL priority for immediate account lockdown, recipient tracing, and SAR review.',
      timestamp: new Date(Date.now() + 500).toISOString(),
    });
  }
  inv.timeline = existingTimeline;
  saveInvestigations(investigations);

  return {
    success: true,
    transaction: txn,
    alert,
    investigation: inv,
    customerVerification: {
      status: normalized,
      response: responseText,
      timestamp: now,
    },
  };
}

// ─── Transaction Simulator ───────────────────────────────────────────────────
function simulateTransaction({ sender_id = 'A001', receiver_id = 'A023', amount = 1500, location = 'Ahmedabad', device = 'Samsung Galaxy S23' } = {}) {
  const transactions = getTransactions();
  const accounts     = getAccounts();
  const alerts       = getAlerts();
  const { calculateRiskScore } = require('../risk-engine/scoring');

  const sender = accounts.find(a => a.id === sender_id);
  if (!sender) throw new Error(`Sender account ${sender_id} not found.`);

  const txnId = `TXN${Date.now().toString().slice(-6)}`;
  const now = new Date().toISOString();

  const newTxn = {
    id: txnId,
    sender_id,
    receiver_id,
    amount: Number(amount),
    currency: 'INR',
    timestamp: now,
    location,
    device,
    status: 'COMPLETED',
    is_suspicious: false,
  };

  const risk = calculateRiskScore({ account_id: sender_id }, newTxn, sender);
  const isUnusual = risk.totalScore >= 35;

  if (isUnusual) {
    newTxn.is_suspicious = true;
    newTxn.status = 'UNUSUAL_PENDING_VERIFICATION';
    newTxn.customer_verification = 'PENDING';

    const alertId = `ALT-${txnId.replace(/^TXN/, '')}`;
    const newAlert = {
      id: alertId,
      transaction_id: txnId,
      account_id: sender_id,
      risk_score: risk.totalScore,
      risk_level: risk.riskLevel,
      status: 'OPEN',
      created_at: now,
      updated_at: now,
    };
    alerts.unshift(newAlert);
    saveAlerts(alerts);
  } else {
    newTxn.is_suspicious = false;
    newTxn.status = 'NORMAL';
    newTxn.customer_verification = 'NOT_REQUIRED';
  }

  transactions.unshift(newTxn);
  saveTransactions(transactions);

  return {
    transaction: newTxn,
    isUnusual,
    riskAssessment: risk,
  };
}

// ─── Reset Benchmark Demo ─────────────────────────────────────────────────────
function resetBenchmarkTransaction() {
  const transactions   = getTransactions();
  const alerts         = getAlerts();
  const investigations = getInvestigations();

  // 1. Reset TXN10482
  const txn = transactions.find(t => t.id === 'TXN10482');
  if (txn) {
    txn.customer_verification = 'PENDING';
    delete txn.customer_verification_response;
    delete txn.customer_verification_timestamp;
    txn.status = 'UNUSUAL_PENDING_VERIFICATION';
    saveTransactions(transactions);
  }

  // 2. Reset ALT-10482
  const alert = alerts.find(a => a.id === 'ALT-10482');
  if (alert) {
    alert.status = 'OPEN';
    alert.risk_score = 94;
    alert.risk_level = 'CRITICAL';
    alert.updated_at = new Date().toISOString();
    saveAlerts(alerts);
  }

  // 3. Reset INV-ALT-10482
  let inv = investigations.find(i => i.alert_id === 'ALT-10482');
  const now = new Date().toISOString();
  const initialTimeline = [
    {
      id: 'evt-init',
      type: 'TRANSACTION_DETECTED',
      title: 'Transaction Initiated',
      description: 'Transaction TXN10482 of ₹75,000 to A023 initiated from Mumbai on iPhone 14 Pro (unrecognized).',
      timestamp: '2026-09-12T20:47:00.000Z',
    },
    {
      id: 'evt-risk',
      type: 'RISK_ANALYSIS_COMPLETED',
      title: 'Risk Analysis Completed',
      description: 'Risk Engine evaluated transaction at score 94/100 (CRITICAL). 6 anomalous factors identified.',
      timestamp: '2026-09-12T20:47:02.000Z',
    },
    {
      id: 'evt-dispatch',
      type: 'VERIFICATION_REQUESTED',
      title: 'Customer Verification Dispatched',
      description: 'AI Copilot prompted account owner Vikram Mehta to verify transaction authorization.',
      timestamp: '2026-09-12T20:47:05.000Z',
    },
  ];

  if (inv) {
    inv.status = 'OPEN';
    inv.decision = 'OPEN';
    inv.notes = '';
    inv.customer_verification = 'PENDING';
    delete inv.customer_response;
    delete inv.customer_verification_timestamp;
    delete inv.investigation_started_at;
    delete inv.investigator_name;
    inv.priority = 'HIGH';
    inv.timeline = initialTimeline;
    inv.updated_at = now;
  } else {
    inv = {
      id: 'INV-ALT-10482',
      alert_id: 'ALT-10482',
      status: 'OPEN',
      decision: 'OPEN',
      notes: '',
      customer_verification: 'PENDING',
      priority: 'HIGH',
      created_at: now,
      updated_at: now,
      timeline: initialTimeline,
    };
    investigations.push(inv);
  }
  saveInvestigations(investigations);

  return {
    success: true,
    message: 'Benchmark case ALT-10482 / TXN10482 reset to initial pending verification state.',
    transaction: txn,
    alert,
    investigation: inv,
  };
}

// ─── Investigation Management ─────────────────────────────────────────────────
function queryInvestigations({ status = '' } = {}) {
  const investigations = getInvestigations();
  const alerts = getEnrichedAlerts();

  let inv = investigations.map(i => {
    const alert = alerts.find(a => a.id === i.alert_id) || {};
    return {
      ...i,
      risk_level: alert.risk_level || 'MEDIUM',
      risk_score: alert.risk_score || 0,
      customer_name: alert.customer_name || '',
      customer_verification: i.customer_verification || alert.customer_verification || 'NOT_REQUIRED',
      customer_response: i.customer_response || alert.customer_response || '',
      amount: alert.amount || 0,
      location: alert.location || '',
    };
  });

  if (status) inv = inv.filter(i => i.status === status.toUpperCase());
  return inv.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

function updateInvestigationStatus(alertId, newStatus, notes) {
  const investigations = getInvestigations();
  const alerts         = getAlerts();
  let inv = investigations.find(i => i.alert_id === alertId);
  const now = new Date().toISOString();

  if (!inv) {
    inv = {
      id: `INV-${alertId}`,
      alert_id: alertId,
      status: newStatus,
      decision: newStatus,
      notes: notes || '',
      created_at: now,
      updated_at: now,
      timeline: [],
    };
    investigations.push(inv);
  } else {
    inv.status = newStatus;
    inv.decision = newStatus;
    if (notes) inv.notes = notes;
    inv.updated_at = now;
  }

  // Append decision event to timeline
  if (!Array.isArray(inv.timeline)) inv.timeline = [];
  inv.timeline.push({
    id: `evt-dec-${Date.now()}`,
    type: 'INVESTIGATOR_DECISION',
    title: `Investigator Action: ${newStatus}`,
    description: notes ? `Investigator noted: "${notes}"` : `Case status marked as ${newStatus}.`,
    timestamp: now,
  });

  if (newStatus === 'DISMISSED') {
    inv.customer_verification = 'CONFIRMED';
    inv.customer_response = notes || 'Investigator verified transaction as legitimate customer activity.';
    inv.customer_verification_timestamp = now;
  }

  // Also update corresponding alert status
  const alert = alerts.find(a => a.id === alertId);
  if (alert) {
    alert.status = newStatus;
    if (newStatus === 'DISMISSED') {
      alert.customer_verification = 'CONFIRMED';
      alert.customer_response = notes || 'Investigator verified transaction as legitimate customer activity.';
      alert.customer_verification_timestamp = now;
    }
    alert.updated_at = now;
    saveAlerts(alerts);
  }

  // Update transaction if marked legitimate
  const transactions = getTransactions();
  const txnId = alert ? alert.transaction_id : null;
  const txn = txnId ? transactions.find(t => t.id === txnId) : null;
  if (txn && newStatus === 'DISMISSED') {
    txn.customer_verification = 'CONFIRMED';
    txn.customer_verification_response = notes || 'Investigator verified transaction as legitimate customer activity.';
    txn.customer_verification_timestamp = now;
    txn.status = 'USER_CONFIRMED';
    saveTransactions(transactions);
  }

  saveInvestigations(investigations);
  return inv;
}

// ─── Start Investigation (Approve Customer Report) ────────────────────────────
function startInvestigation(alertId, notes) {
  const investigations = getInvestigations();
  const alerts         = getAlerts();
  const transactions   = getTransactions();
  const now = new Date().toISOString();

  let inv = investigations.find(i => i.alert_id === alertId);
  if (!inv) {
    throw new Error(`No investigation found for alert ${alertId}.`);
  }

  // Only allow starting from ESCALATED status (customer-denied cases)
  if (inv.status !== 'ESCALATED') {
    throw new Error(`Investigation ${inv.id} is in status '${inv.status}', expected 'ESCALATED'. Cannot start investigation.`);
  }

  // Transition to UNDER_INVESTIGATION
  inv.status = 'UNDER_INVESTIGATION';
  inv.decision = 'UNDER_INVESTIGATION';
  inv.investigation_started_at = now;
  inv.investigator_name = 'S. Rajan';
  if (notes) inv.notes = notes;
  inv.updated_at = now;

  // Append timeline event
  if (!Array.isArray(inv.timeline)) inv.timeline = [];
  inv.timeline.push({
    id: `evt-start-${Date.now()}`,
    type: 'INVESTIGATION_STARTED',
    title: 'Investigation Approved & Started',
    description: notes
      ? `Investigator S. Rajan approved the customer fraud report and initiated formal investigation. Notes: "${notes}"`
      : 'Investigator S. Rajan approved the customer fraud report and initiated formal investigation. Account protection measures activated.',
    timestamp: now,
  });

  // Also update corresponding alert status
  const alert = alerts.find(a => a.id === alertId);
  if (alert) {
    alert.status = 'UNDER_INVESTIGATION';
    alert.updated_at = now;
    saveAlerts(alerts);
  }

  // Update the transaction status as well
  const txn = transactions.find(t => t.id === (alert ? alert.transaction_id : ''));
  if (txn) {
    txn.status = 'UNDER_INVESTIGATION';
    saveTransactions(transactions);
  }

  saveInvestigations(investigations);
  return inv;
}

// ─── Customer Investigation Status ────────────────────────────────────────────
function getCustomerInvestigationStatus(accountId) {
  const investigations = getInvestigations();
  const alerts         = getAlerts();
  const transactions   = getTransactions();

  // Find all alerts for this account
  const accountAlerts = alerts.filter(a => a.account_id === accountId);
  const results = [];

  for (const alert of accountAlerts) {
    const inv = investigations.find(i => i.alert_id === alert.id);
    if (!inv) continue;
    // Only include cases where customer denied the transaction
    if (inv.customer_verification !== 'DENIED') continue;

    const txn = transactions.find(t => t.id === alert.transaction_id) || {};
    results.push({
      alertId: alert.id,
      transactionId: alert.transaction_id,
      amount: txn.amount || 0,
      investigationId: inv.id,
      investigationStatus: inv.status,
      investigatorName: inv.investigator_name || null,
      investigationStartedAt: inv.investigation_started_at || null,
      customerDeniedAt: inv.customer_verification_timestamp || null,
      lastUpdated: inv.updated_at,
      notes: inv.notes || '',
      timelineCount: (inv.timeline || []).length,
    });
  }

  return results.sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated));
}

function queryAccountById(id) {
  const accounts = getAccounts();
  return accounts.find(a => a.id === id) || null;
}

function queryAccountTransactions(id, { page = 1, limit = 20 } = {}) {
  return queryTransactions({ page, limit, accountId: id });
}

module.exports = {
  queryAlerts,
  queryAlertStats,
  queryAlertById,
  queryAccountById,
  queryAccountTransactions,
  queryTransactions,
  queryTransactionById,
  verifyTransaction,
  simulateTransaction,
  resetBenchmarkTransaction,
  queryInvestigations,
  updateInvestigationStatus,
  startInvestigation,
  getCustomerInvestigationStatus,
};
