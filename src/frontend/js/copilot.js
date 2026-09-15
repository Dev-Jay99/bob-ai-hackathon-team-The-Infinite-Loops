/**
 * FinGuard — AI Copilot JS
 * Dynamic, data-driven investigation copilot powered by real database records from src/data/*.json.
 */

(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  let activeAlertId = urlParams.get('id') || urlParams.get('alert') || 'ALT-10482';

  let allAlerts = [];
  let currentCaseData = null;
  let currentCaseContext = null;

  const SUGGESTED_PROMPTS = [
    'Why is this alert critical?',
    'Who is the customer and what is their baseline?',
    'What is unusual about this transaction?',
    'Explain the account network and receiver',
    'What should I do next?',
    'Summarize this case',
  ];

  // ── Helpers ──────────────────────────────────────────────────────────────
  function escHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function scrollChatBottom() {
    const container = document.getElementById('chat-messages-container');
    if (container) container.scrollTop = container.scrollHeight;
  }

  function appendChatBubble(role, htmlContent, senderName) {
    const container = document.getElementById('chat-messages-container');
    const row = document.createElement('div');
    row.className = `chat-msg-row ${role}`;

    const sender = document.createElement('span');
    sender.className = 'chat-sender-label';
    sender.textContent = senderName || (role === 'user' ? 'You' : 'FinGuard AI');

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble-box';
    bubble.innerHTML = htmlContent;

    row.appendChild(sender);
    row.appendChild(bubble);
    container.appendChild(row);
    scrollChatBottom();
    return bubble;
  }

  function showTypingIndicator(label) {
    removeTypingIndicator();
    const container = document.getElementById('chat-messages-container');
    const row = document.createElement('div');
    row.className = 'chat-msg-row ai';
    row.id = 'copilot-typing-indicator';

    const sender = document.createElement('span');
    sender.className = 'chat-sender-label';
    sender.textContent = 'FinGuard AI';

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble-box';
    bubble.style.color = 'var(--text-muted)';
    bubble.innerHTML = `<em>${label || 'Analyzing case context…'}</em>`;

    row.appendChild(sender);
    row.appendChild(bubble);
    container.appendChild(row);
    scrollChatBottom();
  }

  function removeTypingIndicator() {
    const el = document.getElementById('copilot-typing-indicator');
    if (el) el.remove();
  }

  // ── Load Real Alerts from Database ────────────────────────────────────────
  async function loadAlertsList() {
    const listContainer = document.getElementById('case-list-container');
    const countBadge = document.getElementById('cases-count-badge');

    // Fetch all alerts from database (up to 500)
    const { data, error } = await API.getAlerts({ limit: 500 });
    
    // Support data.data (from backend JSON store { data: [...], pagination }) or raw array
    const rawList = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : []);

    if (error || !rawList.length) {
      listContainer.innerHTML = '<div style="padding:16px;color:var(--text-muted);font-size:12px;">Failed to load alerts from database.</div>';
      countBadge.textContent = '0 cases';
      return;
    }

    allAlerts = rawList;
    countBadge.textContent = `${allAlerts.length} cases`;

    renderAlertCards(allAlerts);

    // If URL has an ID or default to benchmark ALT-10482
    const targetId = activeAlertId.toUpperCase();
    if (allAlerts.some(a => a.id.toUpperCase() === targetId)) {
      selectCase(targetId);
    } else if (allAlerts.length > 0) {
      selectCase(allAlerts[0].id);
    }
  }

  function renderAlertCards(alerts) {
    const listContainer = document.getElementById('case-list-container');
    if (!alerts.length) {
      listContainer.innerHTML = '<div style="padding:16px;color:var(--text-muted);font-size:12px;text-align:center;">No matching cases found.</div>';
      return;
    }

    listContainer.innerHTML = alerts.map(a => {
      const isBenchmark = a.id === 'ALT-10482';
      const isActive = a.id.toUpperCase() === activeAlertId.toUpperCase();
      const custName = a.customer_name || a.account_id;
      const amtStr = UI.formatINR(a.amount);
      const riskLvl = (a.risk_level || 'LOW').toUpperCase();
      const badgeCls = `badge badge-${riskLvl.toLowerCase()}`;

      return `
        <div class="case-item-card${isActive ? ' active' : ''}" data-id="${a.id}" onclick="selectCase('${a.id}')">
          <div class="case-item-top">
            <span class="case-item-id">${a.id} ${isBenchmark ? '⭐' : ''}</span>
            <span class="${badgeCls}">${a.risk_score}/100</span>
          </div>
          <div class="case-item-meta">
            <strong style="color:var(--text-primary);">${escHtml(custName)}</strong>
            <span style="color:var(--risk-critical);font-weight:600;">${amtStr}</span>
          </div>
          <div class="case-item-sub">
            ${escHtml(a.location || 'Unknown')} · ${escHtml(a.status || 'OPEN')}
          </div>
        </div>
      `;
    }).join('');
  }

  // ── Robust Search & Filter ────────────────────────────────────────────────
  const searchInput = document.getElementById('case-search-input');
  const countBadge = document.getElementById('cases-count-badge');

  async function handleSearch() {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) {
      countBadge.textContent = `${allAlerts.length} cases`;
      renderAlertCards(allAlerts);
      return;
    }

    // 1. Local filter
    let filtered = allAlerts.filter(a =>
      (a.id || '').toLowerCase().includes(q) ||
      (a.customer_name || '').toLowerCase().includes(q) ||
      (a.account_id || '').toLowerCase().includes(q) ||
      (a.location || '').toLowerCase().includes(q) ||
      (a.risk_level || '').toLowerCase().includes(q) ||
      String(a.amount || '').includes(q)
    );

    // 2. If no local match, query server API
    if (!filtered.length) {
      const { data: serverData } = await API.getAlerts({ search: q, limit: 50 });
      const serverList = Array.isArray(serverData) ? serverData : (serverData && Array.isArray(serverData.data) ? serverData.data : []);
      if (serverList.length) {
        filtered = serverList;
      }
    }

    countBadge.textContent = `${filtered.length} found`;
    renderAlertCards(filtered);

    return filtered;
  }

  searchInput.addEventListener('input', () => {
    handleSearch();
  });

  searchInput.addEventListener('keydown', async e => {
    if (e.key === 'Enter') {
      const val = searchInput.value.trim().toUpperCase();
      if (!val) return;

      // Check if exact alert ID matches in allAlerts
      const exact = allAlerts.find(a => a.id.toUpperCase() === val || a.id.toUpperCase().replace('-', '') === val.replace('-', ''));
      if (exact) {
        selectCase(exact.id);
        return;
      }

      // Check filtered list
      const matches = await handleSearch();
      if (matches && matches.length > 0) {
        selectCase(matches[0].id);
        return;
      }

      // Direct fallback lookup by ID
      const { data: byIdData } = await API.getAlertById(val);
      if (byIdData && byIdData.alert) {
        // Prepend to allAlerts if missing
        if (!allAlerts.some(a => a.id.toUpperCase() === val)) {
          allAlerts.unshift({
            id: byIdData.alert.id,
            account_id: byIdData.alert.account_id,
            customer_name: byIdData.account ? byIdData.account.customer_name : byIdData.alert.account_id,
            amount: byIdData.transaction ? byIdData.transaction.amount : 0,
            location: byIdData.transaction ? byIdData.transaction.location : 'Unknown',
            risk_score: byIdData.alert.risk_score,
            risk_level: byIdData.alert.risk_level,
            status: byIdData.alert.status,
          });
          renderAlertCards(allAlerts);
        }
        selectCase(byIdData.alert.id);
      } else {
        if (window.showToast) window.showToast(`No case matching "${val}" found in database`, 'warning');
      }
    }
  });

  // ── Select a Specific Case ────────────────────────────────────────────────
  window.selectCase = function (alertId) {
    activeAlertId = alertId;

    // Update active highlight in left list
    document.querySelectorAll('.case-item-card').forEach(c => {
      c.classList.toggle('active', c.dataset.id.toUpperCase() === alertId.toUpperCase());
    });

    loadCaseInvestigation(alertId);
  };

  async function loadCaseInvestigation(alertId) {
    const container = document.getElementById('chat-messages-container');
    container.innerHTML = '';

    document.getElementById('header-context-title').textContent = `Case ${alertId} Investigation Copilot`;

    // Clear strip
    document.getElementById('strip-alert-id').textContent = alertId;
    document.getElementById('strip-customer-name').textContent = 'Loading…';
    document.getElementById('strip-amount').textContent = '—';
    document.getElementById('strip-loc-device').textContent = '—';
    document.getElementById('strip-risk-badge').textContent = '—';

    showTypingIndicator(`Retrieving bank records & risk scores for ${alertId}…`);

    const { data, error } = await API.getAlertById(alertId);
    removeTypingIndicator();

    if (error || !data || !data.alert) {
      appendChatBubble('ai', `⚠️ Could not load data for alert <strong>${alertId}</strong> from database: ${escHtml(error || 'Not found')}`, 'FinGuard AI');
      return;
    }

    currentCaseData = data;
    const { alert, transaction, account, riskAssessment } = data;

    const riskScore = riskAssessment ? riskAssessment.totalScore : alert.risk_score;
    const riskLevel = riskAssessment ? riskAssessment.riskLevel : alert.risk_level;
    const custName = account ? account.customer_name : alert.account_id;
    const amount = transaction ? transaction.amount : 0;
    const loc = transaction ? transaction.location : 'Unknown';
    const dev = transaction ? transaction.device : 'Unknown';

    // Store context for queries
    currentCaseContext = {
      alertId: alert.id,
      riskLevel,
      riskScore,
      accountId: alert.account_id,
      customerName: custName,
      transactionId: alert.transaction_id,
      amount,
      currency: transaction ? (transaction.currency || 'INR') : 'INR',
      location: loc,
      device: dev,
      time: transaction && transaction.timestamp ? new Date(transaction.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Unknown',
      date: transaction && transaction.timestamp ? new Date(transaction.timestamp).toLocaleDateString('en-IN') : 'Unknown',
      receiverId: transaction ? transaction.receiver_id : 'Unknown',
      avgAmount: account ? account.avg_txn_amount : 0,
      maxAmount: account ? account.max_txn_amount : 0,
      balance: account ? account.balance : 0,
      usualCity: account ? account.usual_city : 'Unknown',
      usualDevice: account ? account.usual_device : 'Unknown',
      factors: riskAssessment ? riskAssessment.factors : [],
    };

    // Update top strip with ONLY selected case
    document.getElementById('strip-customer-name').textContent = custName;
    document.getElementById('strip-amount').textContent = UI.formatINR(amount);
    document.getElementById('strip-loc-device').textContent = `${loc} (${(dev || 'device').split(' ')[0]})`;
    document.getElementById('strip-risk-badge').innerHTML = UI.riskBadge(riskLevel, true) + ` <strong style="color:var(--text-primary);margin-left:4px;">${riskScore}/100</strong>`;

    document.getElementById('strip-view-alert-link').href = `alert-details.html?id=${encodeURIComponent(alert.id)}`;
    document.getElementById('strip-view-network-link').href = `network.html?account=${encodeURIComponent(alert.account_id)}`;

    const exportBtn = document.getElementById('btn-export-brief-pdf');
    if (exportBtn) {
      exportBtn.href = `reports.html?alertId=${encodeURIComponent(alert.id)}`;
    }

    // Render suggested prompts
    renderPillPrompts();

    // Auto-generate grounded AI analysis
    showTypingIndicator(`FinGuard AI is synthesizing evidence for ${alertId}…`);
    const { data: explainData, error: explainErr } = await API.postCopilotExplainAlert(alertId);
    removeTypingIndicator();

    if (explainErr || !explainData) {
      appendChatBubble(
        'ai',
        `<strong>Case ${alertId} loaded.</strong><br>` +
        `Customer: <strong>${escHtml(custName)}</strong> · Amount: <strong>${UI.formatINR(amount)}</strong> in <strong>${loc}</strong>.<br>` +
        `You can ask me questions about this transaction, customer baseline, account network, or request recommendations.`,
        'AI Copilot'
      );
    } else {
      let html = `<div style="margin-bottom:8px;">${explainData.explanation}</div>`;

      if (explainData.evidence && explainData.evidence.length) {
        html += `<div class="evidence-panel-inner">
          <div style="font-weight:700;color:var(--accent-blue-light);font-size:11.5px;text-transform:uppercase;margin-bottom:4px;">Verified Evidence Signals</div>
          <ul>${explainData.evidence.map(e => `<li>${escHtml(e)}</li>`).join('')}</ul>
        </div>`;
      }

      if (explainData.recommendations && explainData.recommendations.length) {
        html += `<div class="evidence-panel-inner" style="margin-top:8px;">
          <div style="font-weight:700;color:#38bdf8;font-size:11.5px;text-transform:uppercase;margin-bottom:4px;">Recommended Next Steps</div>
          <ul>${explainData.recommendations.map(r => `<li>${escHtml(r)}</li>`).join('')}</ul>
        </div>`;
      }

      appendChatBubble('ai', html, 'AI Copilot');
    }
  }

  function renderPillPrompts() {
    const bar = document.getElementById('suggested-queries-bar');
    bar.innerHTML = '<span style="font-size:11px;color:var(--text-muted);font-weight:600;margin-right:4px;">Prompts:</span>';
    SUGGESTED_PROMPTS.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'suggested-pill-btn';
      btn.textContent = q;
      btn.onclick = () => sendUserMessage(q);
      bar.appendChild(btn);
    });
  }

  // ── Send Dynamic Query to AI Copilot ──────────────────────────────────────
  async function sendUserMessage(text) {
    if (!text || !text.trim()) return;
    const query = text.trim();
    document.getElementById('chat-user-input').value = '';

    appendChatBubble('user', escHtml(query), 'You');
    showTypingIndicator('Analyzing bank records and answering your question…');

    const { data, error } = await API.postCopilotChat(currentCaseContext || { alertId: activeAlertId }, query);
    removeTypingIndicator();

    if (error) {
      appendChatBubble('ai', `⚠️ ${escHtml(error)}`, 'AI Copilot');
    } else {
      appendChatBubble('ai', data.response || 'No answer returned.', 'AI Copilot');
    }
  }

  document.getElementById('btn-send-message').addEventListener('click', () => {
    sendUserMessage(document.getElementById('chat-user-input').value.trim());
  });
  document.getElementById('chat-user-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendUserMessage(e.target.value.trim());
  });

  // ── Investigation Brief Modal ─────────────────────────────────────────────
  window.closeBriefModal = function () {
    document.getElementById('brief-modal').style.display = 'none';
  };

  window.copyBriefText = function () {
    const text = document.getElementById('brief-modal-content').innerText;
    navigator.clipboard.writeText(text);
    if (window.showToast) window.showToast('Investigation Brief copied to clipboard', 'success');
  };

  document.getElementById('btn-open-brief-modal').addEventListener('click', async () => {
    const modal = document.getElementById('brief-modal');
    const content = document.getElementById('brief-modal-content');
    const title = document.getElementById('brief-modal-title');

    title.textContent = `Investigation Brief — Case ${activeAlertId}`;
    content.textContent = 'Generating comprehensive SAR Investigation Brief from banking records…';
    modal.style.display = 'flex';

    const { data, error } = await API.postCopilotBrief(currentCaseContext || { alertId: activeAlertId });
    if (error || !data) {
      content.textContent = 'Error generating brief: ' + (error || 'Service unavailable');
    } else {
      content.textContent = data.brief || data.response || 'Brief generated successfully.';
    }
  });

  // ── Initial Start ─────────────────────────────────────────────────────────
  loadAlertsList();
})();
