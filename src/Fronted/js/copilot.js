/* ============================================================
   FinGuard — copilot.js
   AI Copilot: chat interface, demo responses, suggested prompts
   ============================================================ */

// ─── Demo Responses Database ──────────────────────────────────
// Future: replace with POST /api/copilot/chat (LLM backend)
// NOTE: These are predefined demonstration responses only.
// Connect a backend LLM API for production use.

const COPILOT_RESPONSES = {
  'why is this transaction critical': `
    <strong>Alert A001 is classified CRITICAL (94/100)</strong> due to six compounding risk factors:<br><br>
    1. <strong>Velocity (20/20):</strong> 3 transactions in 3 minutes — never seen on this account before.<br>
    2. <strong>Amount Anomaly (20/20):</strong> ₹42K, ₹55K, ₹75K vs average ₹3,200 — up to 23× above normal.<br>
    3. <strong>Location Anomaly (18/20):</strong> Mumbai, while account is used exclusively in Ahmedabad.<br>
    4. <strong>New Device (15/15):</strong> First-ever iPhone seen on this account (usually Samsung Galaxy A52).<br>
    5. <strong>Unusual Time (12/15):</strong> 02:15 AM — outside 95% of account's normal hours.<br>
    6. <strong>Network Risk (9/10):</strong> Destination accounts have prior suspicious pattern flags.
  `,
  'unusual compared with account history': `
    <strong>Key anomalies vs account history for ACC-8821:</strong><br><br>
    • <strong>Amount:</strong> Avg ₹3,200 → suspicious txns ₹42K–₹75K (13×–23× above average)<br>
    • <strong>Max ever seen:</strong> ₹9,800 → now ₹75,000 (7.6× above max historical)<br>
    • <strong>Location:</strong> 100% Ahmedabad historically → sudden Mumbai activity<br>
    • <strong>Device:</strong> Samsung Galaxy A52 (all prior txns) → unknown iPhone<br>
    • <strong>Time:</strong> Normally 8AM–10PM → 02:15 AM transaction<br>
    • <strong>Velocity:</strong> Normally 1–2 txns/day → 3 txns in 3 minutes
  `,
  'last 10 transactions': `
    <strong>Last 10 transactions on ACC-8821:</strong><br><br>
    <table style="width:100%;font-size:12px;border-collapse:collapse;">
      <tr style="color:#8b99b0;border-bottom:1px solid #2a3347;"><th style="text-align:left;padding:3px 6px;">Date</th><th style="text-align:left;padding:3px 6px;">Description</th><th style="text-align:right;padding:3px 6px;">Amount</th><th style="text-align:left;padding:3px 6px;">Status</th></tr>
      <tr style="background:rgba(239,68,68,0.06);"><td style="padding:3px 6px;">Jan 16</td><td style="padding:3px 6px;">Online Transfer (Mumbai)</td><td style="padding:3px 6px;text-align:right;color:#ef4444;">−₹42,000</td><td style="padding:3px 6px;color:#ef4444;">⚠ Suspicious</td></tr>
      <tr style="background:rgba(239,68,68,0.06);"><td style="padding:3px 6px;">Jan 16</td><td style="padding:3px 6px;">Online Transfer (Mumbai)</td><td style="padding:3px 6px;text-align:right;color:#ef4444;">−₹55,000</td><td style="padding:3px 6px;color:#ef4444;">⚠ Suspicious</td></tr>
      <tr style="background:rgba(239,68,68,0.06);"><td style="padding:3px 6px;">Jan 16</td><td style="padding:3px 6px;">Online Transfer (Mumbai)</td><td style="padding:3px 6px;text-align:right;color:#ef4444;">−₹75,000</td><td style="padding:3px 6px;color:#ef4444;">⚠ Suspicious</td></tr>
      <tr><td style="padding:3px 6px;">Jan 14</td><td style="padding:3px 6px;">ATM Withdrawal</td><td style="padding:3px 6px;text-align:right;">−₹3,000</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 12</td><td style="padding:3px 6px;">UPI - Grocery</td><td style="padding:3px 6px;text-align:right;">−₹850</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 10</td><td style="padding:3px 6px;">Salary Credit</td><td style="padding:3px 6px;text-align:right;color:#22c55e;">+₹38,000</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 08</td><td style="padding:3px 6px;">UPI - Zomato</td><td style="padding:3px 6px;text-align:right;">−₹320</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 05</td><td style="padding:3px 6px;">Online Shopping</td><td style="padding:3px 6px;text-align:right;">−₹2,400</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 03</td><td style="padding:3px 6px;">Insurance Premium</td><td style="padding:3px 6px;text-align:right;">−₹5,500</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Dec 30</td><td style="padding:3px 6px;">ATM Withdrawal</td><td style="padding:3px 6px;text-align:right;">−₹3,200</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
    </table>
  `,
  'explain the network': `
    <strong>Account Network for ACC-8821 (Alert A001):</strong><br><br>
    The suspicious funds were transferred to 3 accounts:<br><br>
    • <strong>ACC-4421 (Bharat T.)</strong> — received ₹42,000 — flagged: <em>Requires review</em><br>
    • <strong>ACC-5532 (Meena P.)</strong> — received ₹55,000 — flagged: <em>Suspicious relationship</em><br>
    • <strong>ACC-7743 (Vikram R.)</strong> — received ₹75,000 — flagged: <em>Requires review</em><br><br>
    These accounts have been involved in prior unrelated suspicious pattern reviews. A second-hop analysis shows ACC-9921 and ACC-2211 are connected to some of these accounts.<br><br>
    <em>Note: Connection does not constitute guilt. These accounts require independent investigation.</em>
  `,
  'risk factors contributed most': `
    <strong>Top risk factors by weighted score for A001:</strong><br><br>
    1. 🔴 <strong>Velocity (20/20)</strong> — Maximum score. 3 txns in 3 minutes.<br>
    2. 🔴 <strong>Amount Anomaly (20/20)</strong> — Maximum score. 23× above average.<br>
    3. 🔴 <strong>Location Anomaly (18/20)</strong> — Near-maximum. Mumbai vs Ahmedabad.<br>
    4. 🔴 <strong>New Device (15/15)</strong> — Maximum score. First-time iPhone.<br>
    5. 🟠 <strong>Unusual Time (12/15)</strong> — High score. 02:15 AM activity.<br>
    6. 🟠 <strong>Network Risk (9/10)</strong> — High score. Connected flagged accounts.<br><br>
    <strong>Total: 94/100</strong> — CRITICAL threshold crossed (>80).
  `,
  'summarize this case': `
    <strong>Investigation Summary — Case A001</strong><br><br>
    <strong>Account:</strong> ACC-8821 | Rajesh Kumar | Savings Account since 2018<br>
    <strong>Risk Score:</strong> 94/100 — CRITICAL<br>
    <strong>Status:</strong> Open — Awaiting Investigator Decision<br><br>
    <strong>Key Facts:</strong><br>
    • 3 rapid online transfers at 02:15–02:17 AM on Jan 16, 2024<br>
    • Total exposure: ₹1,72,000 (account balance: ₹74,500)<br>
    • 23× above account's average transaction amount (₹3,200)<br>
    • Transacted from Mumbai — account always used in Ahmedabad<br>
    • Used a new iPhone — registered device is Samsung Galaxy A52<br>
    • Receiving accounts flagged for prior suspicious patterns<br><br>
    <strong>AI Assessment:</strong> High probability of unauthorized access. Immediate investigator review and account holder contact recommended. This is an AI-assisted summary — final decision rests with the human investigator.
  `,
  'what evidence should i review next': `
    <strong>Recommended evidence review checklist for A001:</strong><br><br>
    ✅ <strong>1. Contact account holder</strong> — Verify if transactions were authorized<br>
    📋 <strong>2. Review device registration logs</strong> — Check when/where the new iPhone was first registered<br>
    🌐 <strong>3. IP address & location data</strong> — Confirm geolocation of transactions<br>
    🔗 <strong>4. Investigate recipient accounts</strong> — ACC-4421, ACC-5532, ACC-7743<br>
    📞 <strong>5. Check login history</strong> — Any unusual login before 02:15 AM?<br>
    📊 <strong>6. Review velocity pattern</strong> — Any similar rapid transfers in past 90 days?<br>
    💳 <strong>7. OTP/authentication logs</strong> — Were transactions authenticated successfully?<br><br>
    <em>This is an AI-assisted suggestion. Use investigator judgment for actual evidence collection.</em>
  `
};

// ─── Suggested Questions ──────────────────────────────────────
const SUGGESTED_QUESTIONS = [
  { label: 'Why is this critical?',          key: 'why is this transaction critical' },
  { label: 'Unusual vs history?',             key: 'unusual compared with account history' },
  { label: 'Last 10 transactions',           key: 'last 10 transactions' },
  { label: 'Explain the network',            key: 'explain the network' },
  { label: 'Top risk factors?',              key: 'risk factors contributed most' },
  { label: 'Summarize this case',            key: 'summarize this case' },
  { label: 'What to review next?',           key: 'what evidence should i review next' },
];

// ─── Chat State ───────────────────────────────────────────────
let messageCount = 0;

// ─── Append Message ───────────────────────────────────────────
function appendMessage(text, role) {
  const container = document.getElementById('copilot-messages');
  if (!container) return;

  messageCount++;
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  const div = document.createElement('div');
  div.className = `msg msg-${role}`;
  div.id = `msg-${messageCount}`;

  div.innerHTML = `
    <div class="msg-bubble">${text}</div>
    <div class="msg-meta">${role === 'ai' ? '🤖 AI Copilot · ' : 'Investigator · '}${time}
      ${role === 'ai' ? '<em style="font-size:10px;color:var(--text-muted);margin-left:6px;">Demo AI response — connect backend/LLM API for production.</em>' : ''}
    </div>
  `;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ─── Send Message ─────────────────────────────────────────────
function sendCopilotMessage() {
  const input = document.getElementById('copilot-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage(msg, 'user');
  input.value = '';

  // Show typing indicator
  const typingId = showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator(typingId);

    const msgLower = msg.toLowerCase();
    let response = `I understand you're asking about: "<em>${msg}</em>".<br><br>
      For this demo, I have predefined responses for the suggested questions. Try clicking one of the quick prompts below, or ask about:<br><br>
      • Why is this transaction critical?<br>
      • What is unusual compared with account history?<br>
      • Summarize this case<br>
      • Explain the network<br>
      • What evidence should I review next?`;

    for (const [key, val] of Object.entries(COPILOT_RESPONSES)) {
      if (msgLower.includes(key.toLowerCase()) ||
          key.toLowerCase().split(' ').some(word => word.length > 4 && msgLower.includes(word))) {
        response = val;
        break;
      }
    }

    appendMessage(response, 'ai');
  }, 800 + Math.random() * 400);
}

function showTypingIndicator() {
  const container = document.getElementById('copilot-messages');
  if (!container) return null;

  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.id = id;
  div.className = 'msg msg-ai';
  div.innerHTML = `
    <div class="msg-bubble" style="display:flex;gap:4px;align-items:center;padding:10px 14px;">
      <span style="width:7px;height:7px;background:var(--text-muted);border-radius:50%;animation:pulse 1.2s infinite;"></span>
      <span style="width:7px;height:7px;background:var(--text-muted);border-radius:50%;animation:pulse 1.2s 0.2s infinite;"></span>
      <span style="width:7px;height:7px;background:var(--text-muted);border-radius:50%;animation:pulse 1.2s 0.4s infinite;"></span>
    </div>
    <div class="msg-meta">AI Copilot is thinking…</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// ─── Suggested Question Click ─────────────────────────────────
function askSuggested(key) {
  const input = document.getElementById('copilot-input');
  if (input) input.value = key;
  sendCopilotMessage();
}

// ─── Clear Chat ───────────────────────────────────────────────
function clearChat() {
  const container = document.getElementById('copilot-messages');
  if (container) {
    container.innerHTML = '';
    messageCount = 0;
  }
  showInitialGreeting();
}

// ─── Initial AI Greeting ──────────────────────────────────────
function showInitialGreeting() {
  setTimeout(() => {
    appendMessage(
      `Hello, <strong>Siddharth</strong>! I'm your AI Investigation Copilot.<br><br>
      I'm currently loaded with context for <strong>Alert A001</strong> — ACC-8821, CRITICAL risk score 94/100.<br><br>
      I can help you:<br>
      • Understand why transactions are suspicious<br>
      • Compare with account history<br>
      • Analyze network connections<br>
      • Generate investigation summaries<br>
      • Suggest next investigation steps<br><br>
      Use the quick prompts below, or ask me anything about this case.<br><br>
      <em style="font-size:11px;color:var(--text-muted);">⚠ Demo mode: AI responses are predefined. Connect a backend LLM for production intelligence.</em>`,
      'ai'
    );
  }, 400);
}

// ─── Export AI Summary ─────────────────────────────────────────
// Future: POST /api/copilot/explain-alert
function exportAISummary() {
  showToast('AI summary exported to Investigation Report.', 'success');
  setTimeout(() => {
    showToast('Navigate to Reports page to view the complete report.', 'info', 4000);
  }, 1000);
}

// ─── Render Suggested Questions ───────────────────────────────
function renderSuggestedQuestions() {
  const container = document.getElementById('suggested-questions');
  if (!container) return;

  container.innerHTML = SUGGESTED_QUESTIONS.map(q => `
    <button class="suggested-q" onclick="askSuggested('${q.key}')">${q.label}</button>
  `).join('');
}

// ─── Add pulse animation style ────────────────────────────────
function addPulseStyle() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Init Copilot Page ────────────────────────────────────────
function initCopilotPage() {
  buildSidebar('copilot', '../');
  buildTopbar('AI Investigation Copilot', false);

  addPulseStyle();
  renderSuggestedQuestions();
  showInitialGreeting();

  // Enter key
  const input = document.getElementById('copilot-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendCopilotMessage();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initCopilotPage);
