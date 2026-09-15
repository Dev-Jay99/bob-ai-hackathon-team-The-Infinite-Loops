/* ============================================================
   FinGuard — details.js
   Alert Details: A001 data, risk factors, audit trail, actions
   ============================================================ */

// ─── A001 Alert Data ──────────────────────────────────────────
// Future: replace with GET /api/alerts/{alert_id}

const ALERTS_DATA = {
  A001: {
    id: 'A001',
    txId: 'TX-88210001',
    account: 'ACC-8821',
    name: 'Rajesh Kumar',
    dob: '1985-03-12',
    kycStatus: 'Verified',
    accountType: 'Savings',
    since: 'Mar 2018',
    risk: 94,
    level: 'CRITICAL',
    status: 'Open',
    assignee: 'Siddharth A.',
    location: 'Mumbai',
    device: 'New iPhone (first use)',
    raisedAt: '2024-01-16 02:17 AM',
    summary: 'Three rapid high-value transactions in 3 minutes from a new device in an unusual city between 02:15–02:17 AM. Total exposure: ₹1,72,000.',

    accountHistory: {
      avgTransaction: 3200,
      maxHistorical: 9800,
      usualLocation: 'Ahmedabad',
      usualDevice: 'Samsung Galaxy A52',
      accountBalance: 74500,
      monthlyAvgCredit: 38000,
      totalTx30Days: 22,
    },

    suspiciousTransactions: [
      { txId: 'TX-88210001', time: '02:15 AM', amount: 42000, location: 'Mumbai', device: 'New iPhone', merchant: 'Online Transfer', type: 'Debit' },
      { txId: 'TX-88210002', time: '02:16 AM', amount: 55000, location: 'Mumbai', device: 'New iPhone', merchant: 'Online Transfer', type: 'Debit' },
      { txId: 'TX-88210003', time: '02:17 AM', amount: 75000, location: 'Mumbai', device: 'New iPhone', merchant: 'Online Transfer', type: 'Debit' },
    ],

    riskFactors: [
      { name: 'Velocity (3 txns/3min)', score: 20, max: 20, severity: 'critical', desc: '3 transactions in 3 minutes — far exceeds normal pattern of 1–2 transactions per day.' },
      { name: 'Amount Anomaly',          score: 20, max: 20, severity: 'critical', desc: 'Amounts 13×–23× above avg (₹3,200). Max historical was ₹9,800.' },
      { name: 'Location Anomaly',        score: 18, max: 20, severity: 'critical', desc: 'Transaction from Mumbai. Account usually active in Ahmedabad.' },
      { name: 'New Device',              score: 15, max: 15, severity: 'critical', desc: 'First-ever use of this iPhone — device ID not seen before on this account.' },
      { name: 'Unusual Time',            score: 12, max: 15, severity: 'high',     desc: '02:15 AM — outside 95% of this account\'s normal transaction hours (8AM–10PM).' },
      { name: 'Network Risk',            score: 9,  max: 10, severity: 'high',     desc: 'Destination accounts flagged in 2 prior unrelated suspicious pattern reviews.' },
    ],

    recentTransactions: [
      { date: '2024-01-16', time: '02:15 AM', desc: 'Online Transfer',      amount: -42000, location: 'Mumbai',      device: 'New iPhone',          status: 'Suspicious' },
      { date: '2024-01-16', time: '02:16 AM', desc: 'Online Transfer',      amount: -55000, location: 'Mumbai',      device: 'New iPhone',          status: 'Suspicious' },
      { date: '2024-01-16', time: '02:17 AM', desc: 'Online Transfer',      amount: -75000, location: 'Mumbai',      device: 'New iPhone',          status: 'Suspicious' },
      { date: '2024-01-14', time: '10:32 AM', desc: 'ATM Withdrawal',        amount: -3000,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-12', time: '03:15 PM', desc: 'UPI Payment - Grocery', amount: -850,   location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-10', time: '11:00 AM', desc: 'Salary Credit',         amount: 38000,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-08', time: '07:55 PM', desc: 'UPI Payment - Zomato',  amount: -320,   location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-05', time: '01:20 PM', desc: 'Online Shopping',       amount: -2400,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-03', time: '09:45 AM', desc: 'Insurance Premium',     amount: -5500,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2023-12-30', time: '12:00 PM', desc: 'ATM Withdrawal',        amount: -3200,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
    ],

    networkConnections: [
      { id: 'ACC-4421', name: 'Bharat T.',    relation: 'Received ₹42,000', risk: 'critical', note: 'Requires review' },
      { id: 'ACC-5532', name: 'Meena P.',     relation: 'Received ₹55,000', risk: 'high',     note: 'Suspicious relationship' },
      { id: 'ACC-7743', name: 'Vikram R.',    relation: 'Received ₹75,000', risk: 'critical', note: 'Requires review' },
      { id: 'ACC-8812', name: 'Sunita C.',    relation: 'Prior transaction', risk: 'medium',   note: 'Transaction connection' },
    ],
  },

  A002: {
    id: 'A002', txId: 'TX-33450001', account: 'ACC-3345', name: 'Priya Mehta',
    risk: 85, level: 'CRITICAL', status: 'In Review', assignee: 'Pooja N.',
    location: 'Delhi', device: 'Unknown Device', raisedAt: '2024-01-15 11:42 PM',
    summary: 'High-value transfer from new device in unfamiliar location during late hours.',
    riskFactors: [
      { name: 'Amount Anomaly',  score: 22, max: 25, severity: 'critical', desc: 'Amount 18× above average transaction.' },
      { name: 'New Device',      score: 15, max: 15, severity: 'critical', desc: 'First use of unknown device.' },
      { name: 'Unusual Time',    score: 13, max: 15, severity: 'high',     desc: 'Transaction at 11:42 PM.' },
      { name: 'Location Anomaly',score: 18, max: 20, severity: 'critical', desc: 'Account usually used in Pune.' },
      { name: 'Network Risk',    score: 17, max: 25, severity: 'high',     desc: 'Destination flagged previously.' },
    ],
    suspiciousTransactions: [
      { txId: 'TX-33450001', time: '11:42 PM', amount: 88500, location: 'Delhi', device: 'Unknown Device', merchant: 'Online Transfer', type: 'Debit' },
    ],
    recentTransactions: [],
    networkConnections: [],
    accountHistory: { avgTransaction: 4900, maxHistorical: 12000, usualLocation: 'Pune', usualDevice: 'iPhone 12', accountBalance: 92000, monthlyAvgCredit: 55000, totalTx30Days: 18 },
  },
};

// ─── Audit Trail (in memory + localStorage) ──────────────────
const AUDIT_STORAGE_KEY = 'fg_audit_';

function loadAuditTrail(alertId) {
  const stored = localStorage.getItem(AUDIT_STORAGE_KEY + alertId);
  if (stored) return JSON.parse(stored);

  // Default initial entries
  return [
    { time: getCurrentTime(-14), text: 'Alert raised by fraud detection engine', type: 'system' },
    { time: getCurrentTime(-10), text: 'Alert opened by Siddharth A.', type: 'system' },
  ];
}

function saveAuditTrail(alertId, trail) {
  localStorage.setItem(AUDIT_STORAGE_KEY + alertId, JSON.stringify(trail));
}

/**
 * Add an entry to the audit trail and re-render.
 * @param {string} text
 * @param {'action'|'note'|'system'} type
 */
function addAuditLog(text, type = 'system') {
  const alertId = getQueryParam('id') || 'A001';
  const trail = loadAuditTrail(alertId);
  trail.push({ time: getCurrentTime(0), text, type });
  saveAuditTrail(alertId, trail);
  renderAuditTrail(trail);
}

function getCurrentTime(offsetMin = 0) {
  const d = new Date(Date.now() + offsetMin * 60000);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// ─── Render Functions ─────────────────────────────────────────

function renderCaseHeader(alert) {
  const el = document.getElementById('case-header');
  if (!el) return;

  const riskCls = getRiskClass(alert.level);

  el.innerHTML = `
    <div class="case-id-block">
      <div class="case-id">${alert.id}</div>
      <div class="case-label">Suspicious Alert</div>
    </div>
    <div class="case-risk-block">
      <div class="risk-score-large ${riskCls !== 'critical' ? 'score-'+riskCls : ''}">
        <div class="risk-score-num">${alert.risk}</div>
        <div style="font-size:18px;color:var(--text-muted);line-height:1;">/100</div>
        <div class="risk-score-label">Risk Score</div>
      </div>
      <div>
        ${updateRiskBadge(alert.level)}
        <div style="margin-top:6px;font-size:12px;color:var(--text-muted);">Risk Level</div>
      </div>
    </div>
    <div class="case-meta">
      <div class="case-meta-item"><span class="case-meta-key">Account</span><span class="case-meta-val">${alert.account}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Account Holder</span><span class="case-meta-val">${alert.name}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Location</span><span class="case-meta-val">${alert.location}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Device</span><span class="case-meta-val">${alert.device}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Status</span><span class="case-meta-val">${statusBadge(alert.status)}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Raised At</span><span class="case-meta-val">${alert.raisedAt}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Assigned To</span><span class="case-meta-val">${alert.assignee}</span></div>
    </div>
    <div class="case-actions">
      <button class="btn btn-danger" onclick="handleAction('escalate')">↑ Escalate</button>
      <button class="btn btn-secondary" onclick="handleAction('monitor')">👁 Monitor</button>
      <button class="btn btn-success" onclick="handleAction('legitimate')">✓ Legitimate</button>
    </div>
  `;
}

function renderSuspiciousTransactions(txList) {
  const el = document.getElementById('sus-tx-list');
  if (!el) return;

  el.innerHTML = txList.map((tx, i) => `
    <div class="sus-tx-item" style="animation-delay:${i*0.08}s">
      <div class="sus-tx-time">${tx.time}</div>
      <div class="sus-tx-info">
        <div class="sus-tx-desc">${tx.merchant} → ${tx.location}</div>
        <div class="sus-tx-meta">${tx.txId} · ${tx.device} · ${tx.type}</div>
      </div>
      <div class="sus-tx-amount">−${formatINR(tx.amount)}</div>
      <div class="sus-tx-badge">${updateRiskBadge('CRITICAL')}</div>
    </div>
  `).join('');

  // Total
  const total = txList.reduce((s, tx) => s + tx.amount, 0);
  el.innerHTML += `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;
                background:var(--risk-critical-bg);border:1px solid rgba(239,68,68,0.25);border-radius:6px;margin-top:4px;">
      <span style="font-size:13px;font-weight:700;color:var(--text-primary);">Total Exposure</span>
      <span style="font-size:18px;font-weight:900;color:var(--risk-critical);font-family:monospace;">−${formatINR(total)}</span>
    </div>
  `;
}

function renderRiskFactors(factors) {
  const el = document.getElementById('risk-factors-grid');
  if (!el) return;

  const total = factors.reduce((s, f) => s + f.score, 0);
  const maxPossible = factors.reduce((s, f) => s + f.max, 0);

  el.innerHTML = factors.map(f => {
    const pct = Math.round((f.score / f.max) * 100);
    return `
      <div class="risk-factor-card rfc-${f.severity}">
        <div class="rfc-name">${f.name}</div>
        <div class="rfc-score">${f.score}<span style="font-size:12px;color:var(--text-muted);font-weight:400;">/${f.max}</span></div>
        <div class="rfc-bar-wrap"><div class="rfc-bar" style="width:${pct}%;"></div></div>
        <div class="rfc-desc">${f.desc}</div>
      </div>
    `;
  }).join('');

  el.innerHTML += `
    <div class="rfc-total-card">
      <div>
        <div class="rfc-total-label">Total Risk Score</div>
        <div style="font-size:11px;color:var(--text-muted);">Sum of all weighted risk factors</div>
      </div>
      <div>
        <span class="rfc-total-score">${total}</span>
        <span class="rfc-total-max">/ ${maxPossible}</span>
      </div>
    </div>
  `;
}

function renderAccountHistory(history) {
  const el = document.getElementById('account-history');
  if (!el) return;

  // max suspicious amount for comparison
  const maxSus = 75000;
  const maxPct  = Math.min(100, Math.round((maxSus / maxSus) * 100));
  const avgPct  = Math.round((history.avgTransaction / maxSus) * 100);
  const histPct = Math.round((history.maxHistorical / maxSus) * 100);

  el.innerHTML = `
    <div class="history-stat-row">
      <div class="history-stat">
        <div class="history-stat-val">${formatINR(history.avgTransaction)}</div>
        <div class="history-stat-lbl">Avg Transaction</div>
      </div>
      <div class="history-stat">
        <div class="history-stat-val">${formatINR(history.maxHistorical)}</div>
        <div class="history-stat-lbl">Max Historical</div>
      </div>
      <div class="history-stat">
        <div class="history-stat-val">${formatINR(history.accountBalance)}</div>
        <div class="history-stat-lbl">Balance</div>
      </div>
    </div>

    <div class="compare-bar-wrap">
      <div class="compare-bar-label" style="display:flex;justify-content:space-between;">
        <span>Transaction Amount Comparison</span>
        <span style="color:var(--risk-critical);font-weight:700;">Suspicious: ₹75,000</span>
      </div>
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:3px;">
          <span>Average (₹3,200)</span><span>${((3200/75000)*100).toFixed(0)}% of suspicious</span>
        </div>
        <div class="compare-bar-track">
          <div class="compare-bar-fill" style="width:${avgPct}%;background:var(--risk-low);"></div>
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:3px;">
          <span>Max Historical (₹9,800)</span><span>${((9800/75000)*100).toFixed(0)}% of suspicious</span>
        </div>
        <div class="compare-bar-track">
          <div class="compare-bar-fill" style="width:${histPct}%;background:var(--risk-medium);"></div>
        </div>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:3px;">
          <span>Suspicious Txn (₹75,000)</span><span style="color:var(--risk-critical);">23.4× above average</span>
        </div>
        <div class="compare-bar-track">
          <div class="compare-bar-fill" style="width:100%;background:var(--risk-critical);"></div>
        </div>
      </div>
    </div>

    <div style="display:flex;gap:10px;font-size:12px;color:var(--text-secondary);">
      <div style="flex:1;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:8px 10px;">
        <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.6px;margin-bottom:3px;">Usual Location</div>
        <div style="font-weight:600;color:var(--text-primary);">${history.usualLocation}</div>
        <div style="font-size:11px;color:var(--risk-critical);margin-top:2px;">⚠ Transaction from Mumbai</div>
      </div>
      <div style="flex:1;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:8px 10px;">
        <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.6px;margin-bottom:3px;">Usual Device</div>
        <div style="font-weight:600;color:var(--text-primary);">${history.usualDevice}</div>
        <div style="font-size:11px;color:var(--risk-critical);margin-top:2px;">⚠ New iPhone used</div>
      </div>
    </div>
  `;
}

function renderRecentTransactions(txList) {
  const tbody = document.getElementById('recent-tx-tbody');
  if (!tbody) return;

  tbody.innerHTML = txList.map(tx => {
    const isSuspicious = tx.status === 'Suspicious';
    const amtStr = tx.amount > 0
      ? `<span style="color:var(--risk-low);font-weight:700;">+${formatINR(tx.amount)}</span>`
      : `<span style="color:${isSuspicious ? 'var(--risk-critical)' : 'var(--text-primary)'};font-weight:700;">${formatINR(tx.amount)}</span>`;
    return `
      <tr style="${isSuspicious ? 'background:rgba(239,68,68,0.04);' : ''}">
        <td style="font-size:12px;color:var(--text-muted);">${tx.date}</td>
        <td style="font-size:12px;color:var(--text-secondary);">${tx.time}</td>
        <td style="font-weight:${isSuspicious?'600':'400'};color:${isSuspicious?'var(--text-primary)':'var(--text-secondary)'};">${tx.desc}</td>
        <td>${amtStr}</td>
        <td style="font-size:12px;color:var(--text-muted);">${tx.location}</td>
        <td style="font-size:12px;color:var(--text-muted);">${tx.device}</td>
        <td>${isSuspicious ? updateRiskBadge('CRITICAL') : '<span class="status-badge status-closed">Normal</span>'}</td>
      </tr>
    `;
  }).join('');
}

function renderNetworkMini(connections) {
  const el = document.getElementById('network-connections');
  if (!el) return;

  el.innerHTML = connections.map(conn => `
    <div class="network-node-row" onclick="showToast('Opening network view for ${conn.id}', 'info')">
      <span class="node-dot ${conn.risk}"></span>
      <span class="node-name">${conn.name}</span>
      <span class="node-rel">${conn.relation}</span>
      <span style="margin-left:4px;" class="risk-badge risk-${conn.risk === 'critical' ? 'critical' : conn.risk === 'high' ? 'high' : 'medium'}">${conn.note}</span>
      <span class="node-arrow">›</span>
    </div>
  `).join('');
}

function renderAuditTrail(trail) {
  const el = document.getElementById('audit-list');
  if (!el) return;

  const dotClass = { action: 'action-dot', note: 'note-dot', system: 'system-dot' };

  el.innerHTML = trail.map(entry => `
    <div class="audit-entry">
      <div class="audit-dot ${dotClass[entry.type] || 'system-dot'}"></div>
      <div class="audit-content">
        <div class="audit-time">${entry.time}</div>
        <div class="audit-text">${entry.text}</div>
      </div>
    </div>
  `).reverse().join('');
}

// ─── Investigator Actions ─────────────────────────────────────
// Future: POST /api/investigations/{id}/escalate | monitor | dismiss

function handleAction(action) {
  const alertId = getQueryParam('id') || 'A001';
  const messages = {
    escalate:   { text: 'Alert escalated to Senior Investigator / Compliance Team.', type: 'action', toast: 'Alert escalated successfully.', toastType: 'warning' },
    monitor:    { text: 'Alert placed under active monitoring.', type: 'action', toast: 'Alert set to Monitoring mode.', toastType: 'info' },
    legitimate: { text: 'Investigator decision: Marked as Legitimate after review.', type: 'action', toast: 'Alert marked as Legitimate and closed.', toastType: 'success' },
  };

  const m = messages[action];
  if (!m) return;

  showConfirm(
    `Confirm: ${action.charAt(0).toUpperCase() + action.slice(1)}`,
    `Are you sure you want to ${action} this alert? This action will be recorded in the audit trail.`,
    () => {
      addAuditLog(`Investigator action: ${m.text} — by Siddharth A.`, 'action');
      showToast(m.toast, m.toastType);
    },
    action === 'escalate' ? 'danger' : action === 'legitimate' ? 'info' : 'warning'
  );
}

function handleAddNote() {
  const textarea = document.getElementById('notes-input');
  if (!textarea) return;
  const note = textarea.value.trim();
  if (!note) { showToast('Please enter a note first.', 'warning'); return; }
  addAuditLog(`Note: "${note}" — by Siddharth A.`, 'note');
  textarea.value = '';
  showToast('Note added to investigation.', 'success');
}

// ─── AI Copilot (details page inline) ────────────────────────
const DETAIL_COPILOT_RESPONSES = {
  'why critical': 'This alert is CRITICAL (94/100) due to a combination of: (1) 3 rapid transactions in 3 minutes totalling ₹1,72,000, (2) amounts 13–23× above the account average of ₹3,200, (3) first-ever use of an iPhone when the registered device is a Samsung Galaxy A52, and (4) transactions from Mumbai despite the account being used exclusively in Ahmedabad.',
  'unusual': 'Compared to account history: Average transaction is ₹3,200; these three transactions are ₹42,000, ₹55,000, and ₹75,000 — between 13× and 23× the historical average. The maximum historical transaction was ₹9,800. The velocity (3 transactions in 3 minutes) is entirely unprecedented on this account.',
  'last 10': 'The 10 most recent transactions are shown in the "Recent Transaction History" table. 3 are flagged as Suspicious (the 3 rapid transfers from Mumbai). The remaining 7 are normal transactions from Ahmedabad using the Samsung device.',
  'network': 'Three destination accounts (ACC-4421, ACC-5532, ACC-7743) received the suspicious funds. ACC-4421 and ACC-7743 require review based on prior pattern analysis. These relationships are flagged as "Suspicious" — further investigation of recipient accounts is recommended.',
  'risk factors': 'The top contributing risk factors are: Velocity (20/20) and Amount Anomaly (20/20) — both maxed out. Location Anomaly (18/20), New Device (15/15), Unusual Time (12/15), and Network Risk (9/10) round out the score for a total of 94/100.',
  'summarize': 'Case A001 — CRITICAL (94/100): Account ACC-8821 (Rajesh Kumar) had 3 rapid online transfers at 02:15–02:17 AM from Mumbai using a new iPhone. Total exposure: ₹1,72,000. This is 53× the account\'s average daily spend. All major risk indicators are triggered. Immediate review and investigator decision required.',
  'next steps': 'Recommended next actions: (1) Contact account holder to verify whether these transactions were authorized. (2) Place a temporary hold on further transfers pending confirmation. (3) Review recipient accounts ACC-4421, ACC-5532, and ACC-7743 for suspicious patterns. (4) Submit escalation if holder cannot be reached within 2 hours.',
};

function sendDetailCopilotMessage() {
  const input = document.getElementById('detail-copilot-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;

  appendDetailMessage(msg, 'user');
  input.value = '';

  // Demo response matching
  setTimeout(() => {
    const msgLower = msg.toLowerCase();
    let response = 'I can answer questions about this alert. Try asking: "Why is this critical?", "What is unusual?", "Summarize this case", "What are the next steps?", or "Explain the risk factors."';

    for (const [key, val] of Object.entries(DETAIL_COPILOT_RESPONSES)) {
      if (msgLower.includes(key)) { response = val; break; }
    }

    appendDetailMessage(response, 'ai');
    addAuditLog('AI Copilot explanation reviewed by investigator', 'note');
  }, 500);
}

function appendDetailMessage(text, role) {
  const container = document.getElementById('detail-copilot-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `msg msg-${role}`;
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  div.innerHTML = `
    <div class="msg-bubble">${text}</div>
    <div class="msg-meta">${role === 'ai' ? '🤖 AI Copilot · ' : 'You · '}${time}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function useSuggestedQuestion(q) {
  const input = document.getElementById('detail-copilot-input');
  if (!input) return;
  input.value = q;
  sendDetailCopilotMessage();
}

// ─── Init Details Page ────────────────────────────────────────
function initDetailsPage() {
  buildSidebar('alerts', '../');
  buildTopbar('Alert Investigation', false);

  const alertId = getQueryParam('id') || 'A001';
  const alert = ALERTS_DATA[alertId];

  if (!alert) {
    document.getElementById('case-header').innerHTML = `
      <div class="empty-state"><p>Alert <strong>${alertId}</strong> not found. <a href="alerts.html">Back to Alerts</a></p></div>
    `;
    return;
  }

  // Render sections
  renderCaseHeader(alert);
  if (alert.suspiciousTransactions?.length) renderSuspiciousTransactions(alert.suspiciousTransactions);
  if (alert.riskFactors?.length)            renderRiskFactors(alert.riskFactors);
  if (alert.accountHistory)                 renderAccountHistory(alert.accountHistory);
  if (alert.recentTransactions?.length)     renderRecentTransactions(alert.recentTransactions);
  if (alert.networkConnections?.length)     renderNetworkMini(alert.networkConnections);

  const trail = loadAuditTrail(alertId);
  renderAuditTrail(trail);
  addAuditLog(`Alert ${alertId} details viewed by Siddharth A.`, 'system');

  // Initial AI greeting
  setTimeout(() => {
    appendDetailMessage(
      `Alert <strong>${alertId}</strong> loaded. Risk Score: <strong>${alert.risk}/100 — ${alert.level}</strong>. ${alert.summary} Ask me anything about this case.`,
      'ai'
    );
  }, 300);

  // Copilot enter key
  const input = document.getElementById('detail-copilot-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendDetailCopilotMessage();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initDetailsPage);
