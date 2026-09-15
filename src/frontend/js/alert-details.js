/**
 * FinGuard — Alert Details JS
 */

(async function () {
  const params   = new URLSearchParams(window.location.search);
  const alertId  = params.get('id') || 'ALT-10482';

  let caseContext = {};
  let miniNetwork = null;

  // ── Helpers ────────────────────────────────────────────────────
  function riskScoreClass(level) {
    const map = { CRITICAL:'risk-critical-score', HIGH:'risk-high-score', MEDIUM:'risk-medium-score', LOW:'risk-low-score' };
    return map[(level||'').toUpperCase()] || 'risk-low-score';
  }

  function riskFillClass(pct) {
    if (pct >= 85) return 'critical';
    if (pct >= 65) return 'high';
    if (pct >= 35) return 'medium';
    return 'low';
  }

  function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }
  function show(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }
  function text(id, val) { const el = document.getElementById(id); if (el) el.innerHTML = val; }

  // ── Load data ───────────────────────────────────────────────────
  hide('page-error');
  show('page-loading');

  const { data, error } = await API.getAlertById(alertId);

  hide('page-loading');

  if (error || !data) {
    show('page-error');
    text('error-msg', error || 'Alert not found');
    return;
  }

  show('page-content');

  const { alert, transaction, account, riskFactors, riskAssessment, recentTransactions, precedingSequence, investigation, network } = data;

  // Build case context for copilot
  caseContext = {
    alertId:       alert.id,
    riskLevel:     riskAssessment ? riskAssessment.riskLevel : alert.risk_level,
    riskScore:     riskAssessment ? riskAssessment.totalScore : alert.risk_score,
    accountId:     alert.account_id,
    customerName:  account ? account.customer_name : alert.account_id,
    transactionId: alert.transaction_id,
    amount:        transaction ? transaction.amount : 0,
    factors:       riskAssessment ? riskAssessment.factors : (riskFactors || []).map(f => ({
      name: f.factor_name, score: f.score, maxScore: f.max_score, explanation: f.explanation,
    })),
  };

  const level  = caseContext.riskLevel;
  const score  = caseContext.riskScore;

  // ── Header ──────────────────────────────────────────────────────
  text('hdr-alert-id',     alert.id);
  text('hdr-risk-badge',   UI.riskBadge(level, true));
  text('hdr-status-badge', UI.statusBadge(investigation ? investigation.status : alert.status));
  text('hdr-created',      UI.formatDate(alert.created_at));
  text('hdr-txn-ref',      alert.transaction_id ? `TXN: ${alert.transaction_id}` : '');

  const scoreEl = document.getElementById('hdr-score-num');
  scoreEl.textContent = score;
  scoreEl.className = `risk-score-number ${riskScoreClass(level)}`;

  // ── Risk Factors ─────────────────────────────────────────────────
  const factors = riskAssessment ? riskAssessment.factors : [];
  const factorsList = document.getElementById('risk-factors-list');
  factorsList.innerHTML = factors.length ? factors.map(f => {
    const pct = Math.round((f.score / f.maxScore) * 100);
    const cls = riskFillClass(pct);
    return `
      <div class="progress-wrap">
        <div class="progress-header">
          <span class="progress-label">${f.name}</span>
          <span class="progress-score">${f.score} / ${f.maxScore}</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill ${cls}" data-width="${pct}" style="width:0;"></div>
        </div>
        <div class="progress-explanation">${f.explanation}</div>
      </div>`;
  }).join('') : '<div class="text-muted text-sm">No risk factors available.</div>';

  // Animate progress bars
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('.progress-fill[data-width]').forEach(el => {
        el.style.width = el.dataset.width + '%';
      });
    }, 120);
  });

  // ── Transaction Info ──────────────────────────────────────────────
  const txnInfo = document.getElementById('txn-info');
  if (transaction) {
    txnInfo.innerHTML = `
      <div class="info-row"><span class="info-label">Transaction ID</span><span class="info-value text-mono">${transaction.id}</span></div>
      <div class="info-row"><span class="info-label">Amount</span><span class="info-value" style="color:var(--risk-critical);font-weight:700;">${UI.formatINR(transaction.amount)}</span></div>
      <div class="info-row"><span class="info-label">Currency</span><span class="info-value">${transaction.currency || 'INR'}</span></div>
      <div class="info-row"><span class="info-label">Timestamp</span><span class="info-value">${UI.formatDate(transaction.timestamp)}</span></div>
      <div class="info-row"><span class="info-label">Location</span><span class="info-value">${transaction.location || '—'}</span></div>
      <div class="info-row"><span class="info-label">Device</span><span class="info-value">${transaction.device || '—'}</span></div>
      <div class="info-row"><span class="info-label">Sender</span><span class="info-value text-mono">${transaction.sender_id || '—'}</span></div>
      <div class="info-row"><span class="info-label">Receiver</span><span class="info-value text-mono">${transaction.receiver_id || '—'}</span></div>
      <div class="info-row"><span class="info-label">Status</span><span class="info-value">${transaction.status || '—'}</span></div>
    `;
  } else {
    txnInfo.innerHTML = '<div class="text-muted text-sm">Transaction data unavailable.</div>';
  }

  // ── Baseline Comparison ───────────────────────────────────────────
  const baselineEl = document.getElementById('baseline-section');
  if (account && transaction) {
    const avg     = account.avg_txn_amount || 0;
    const curr    = transaction.amount || 0;
    const maxVal  = Math.max(avg, curr) * 1.1 || 1;
    const avgPct  = Math.round((avg  / maxVal) * 100);
    const currPct = Math.round((curr / maxVal) * 100);
    baselineEl.innerHTML = `
      <div style="margin-bottom:8px;" class="text-sm text-muted">
        Customer: <strong style="color:var(--text-secondary);">${account.customer_name}</strong> · 
        Usual City: ${account.usual_city} · 
        Usual Device: ${account.usual_device}
      </div>
      <div class="comparison-bar-wrap">
        <div class="comparison-bar-labels">
          <span>Historical Average</span>
          <span>Current Transaction</span>
        </div>
        <div class="comparison-bar-track" style="height:12px;">
          <div class="comparison-bar-avg" style="width:0;" data-width="${avgPct}" title="Avg: ${UI.formatINR(avg)}"></div>
          <div class="comparison-bar-current" style="width:0;" data-width="${currPct}" title="Current: ${UI.formatINR(curr)}"></div>
        </div>
        <div class="comparison-bar-values">
          <span class="avg-val">Avg: ${UI.formatINR(avg)}</span>
          <span class="curr-val">Current: ${UI.formatINR(curr)} (${curr > 0 && avg > 0 ? (curr/avg).toFixed(1)+'×' : '—'})</span>
        </div>
      </div>
      <div class="info-row"><span class="info-label">Historical Max</span><span class="info-value">${UI.formatINR(account.max_txn_amount)}</span></div>
      <div class="info-row"><span class="info-label">Account Balance</span><span class="info-value">${UI.formatINR(account.balance)}</span></div>
    `;
    requestAnimationFrame(() => {
      setTimeout(() => {
        document.querySelectorAll('.comparison-bar-avg[data-width]').forEach(el => { el.style.width = el.dataset.width + '%'; });
        document.querySelectorAll('.comparison-bar-current[data-width]').forEach(el => { el.style.width = el.dataset.width + '%'; });
      }, 200);
    });
  } else {
    baselineEl.innerHTML = '<div class="text-muted text-sm">Baseline data unavailable.</div>';
  }

  // ── Preceding Sequence ────────────────────────────────────────────
  const seqEl = document.getElementById('seq-section');
  const seqTxns = precedingSequence && precedingSequence.length
    ? precedingSequence
    : (recentTransactions || []).slice(0, 5);

  if (seqTxns.length) {
    seqEl.innerHTML = `
      <div class="seq-row seq-header">
        <span>Time</span><span>Amount</span><span>Sender</span><span>Receiver</span><span>Device</span>
      </div>
      ${seqTxns.map(t => {
        const isBenchmark = t.id === alert.transaction_id;
        const time = new Date(t.timestamp).toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', hour12: false });
        return `
          <div class="seq-row${isBenchmark ? ' highlight' : ''}">
            <span class="seq-time">${time}</span>
            <span class="seq-amount">₹${Number(t.amount).toLocaleString('en-IN')}</span>
            <span class="text-mono text-sm">${t.sender_id}</span>
            <span class="text-mono text-sm">${t.receiver_id}</span>
            <span class="text-muted text-sm">${(t.device||'').split(' ').slice(0,2).join(' ')}</span>
          </div>`;
      }).join('')}
    `;
  } else {
    seqEl.innerHTML = '<div class="text-muted text-sm">No preceding transactions available.</div>';
  }

  // ── Mini Network Graph ────────────────────────────────────────────
  const netData = network || {};
  document.getElementById('network-link').href = `network.html?account=${alert.account_id}`;
  document.getElementById('full-network-link').href = `network.html?account=${alert.account_id}`;

  if (netData.nodes && netData.nodes.length) {
    const container = document.getElementById('mini-network');
    const visNodes = new vis.DataSet(netData.nodes);
    const visEdges = new vis.DataSet(netData.edges || []);

    miniNetwork = new vis.Network(container, { nodes: visNodes, edges: visEdges }, {
      physics: { enabled: true, stabilization: { iterations: 80 } },
      nodes: {
        shape: 'dot', size: 18,
        font: { color: '#CBD5E1', size: 11, face: 'Inter' },
        borderWidth: 2,
      },
      edges: {
        smooth: { type: 'curvedCW', roundness: 0.2 },
        font: { color: '#94A3B8', size: 10, face: 'Inter' },
        width: 1.5,
      },
      interaction: { hover: true },
      layout: { randomSeed: 42 },
    });

    miniNetwork.on('click', function (params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        window.location.href = `network.html?account=${nodeId}`;
      }
    });
  } else {
    document.getElementById('mini-network').innerHTML =
      '<div class="state-container" style="height:100%;"><div class="state-sub">Network data not available.</div></div>';
  }

  // ── AI Copilot ────────────────────────────────────────────────────
  document.getElementById('copilot-case-tag').textContent =
    `Case: ${alert.id} · ${caseContext.riskLevel} · Score ${caseContext.riskScore}/100`;

  const SUGGESTED = [
    'Why is this alert critical?',
    'What is unusual about this transaction?',
    'Explain the account network',
    'Show the key risk factors',
    'What evidence should I review next?',
    'Summarize this case',
  ];

  const sqWrap = document.getElementById('sq-buttons');
  SUGGESTED.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'sq-btn';
    btn.textContent = q;
    btn.onclick = () => sendCopilotMessage(q);
    sqWrap.appendChild(btn);
  });

  async function addChatMessage(role, text) {
    const msgs = document.getElementById('chat-messages');
    const wrap = document.createElement('div');
    wrap.className = `chat-message ${role}`;
    wrap.innerHTML = `
      <span class="who">${role === 'user' ? 'You' : 'AI Copilot'}</span>
      <div class="bubble">${text}</div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  async function sendCopilotMessage(message) {
    if (!message.trim()) return;
    const input = document.getElementById('copilot-input');
    input.value = '';

    addChatMessage('user', message);

    // Show typing indicator
    const msgs = document.getElementById('chat-messages');
    const typing = document.createElement('div');
    typing.className = 'chat-message ai';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span class="who">AI Copilot</span><div class="bubble" style="color:var(--text-muted);">Analyzing case…</div>';
    msgs.appendChild(typing);
    msgs.scrollTop = msgs.scrollHeight;

    const { data: resp, error: err } = await API.postCopilotChat(caseContext, message);

    const typingEl = document.getElementById('typing-indicator');
    if (typingEl) typingEl.remove();

    if (err) {
      addChatMessage('ai', 'Error: ' + err);
    } else {
      addChatMessage('ai', resp.response || 'No response.');
    }
  }

  document.getElementById('copilot-send').addEventListener('click', () => {
    sendCopilotMessage(document.getElementById('copilot-input').value.trim());
  });
  document.getElementById('copilot-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') sendCopilotMessage(e.target.value.trim());
  });

  // Generate Brief
  document.getElementById('btn-brief').addEventListener('click', async () => {
    const btn = document.getElementById('btn-brief');
    btn.disabled = true;
    btn.textContent = 'Generating…';

    const { data: brief, error: err } = await API.postCopilotBrief(caseContext);
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Generate Investigation Brief`;

    if (err) {
      showToast('Failed to generate brief: ' + err, 'error');
      return;
    }

    // Open in reports page
    sessionStorage.setItem('finguard_brief', JSON.stringify({ alertId: alert.id, brief: brief.brief, context: caseContext }));
    window.open(`reports.html?alertId=${encodeURIComponent(alert.id)}`, '_blank');
  });

  // ── Investigation Decision Buttons ────────────────────────────────
  const statusBadgeEl = document.getElementById('hdr-status-badge');

  async function handleAction(action) {
    const notes = document.getElementById('inv-notes').value.trim();
    ['btn-escalate','btn-monitor','btn-legitimate'].forEach(id => {
      document.getElementById(id).disabled = true;
    });

    const { data: resp, error: err } = await API.postInvestigationAction(alert.id, action, notes);

    ['btn-escalate','btn-monitor','btn-legitimate'].forEach(id => {
      document.getElementById(id).disabled = false;
    });

    if (err) {
      showToast('Action failed: ' + err, 'error');
      return;
    }

    const newStatus = resp.investigation ? resp.investigation.status : action.toUpperCase();
    statusBadgeEl.innerHTML = UI.statusBadge(newStatus);
    showToast(`Case ${alert.id} marked as ${newStatus}`, 'success');
  }

  document.getElementById('btn-escalate').addEventListener('click',   () => handleAction('escalate'));
  document.getElementById('btn-monitor').addEventListener('click',    () => handleAction('monitor'));
  document.getElementById('btn-legitimate').addEventListener('click', () => handleAction('dismiss'));

  // Global search redirect
  document.getElementById('globalSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) window.location.href = `alerts.html?search=${encodeURIComponent(q)}`;
    }
  });

})();
