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

  const { alert, transaction, account, riskFactors, riskAssessment, recentTransactions, precedingSequence, investigation, timeline, network } = data;

  let currentTimeline = timeline || (investigation && investigation.timeline) || [];

  // Build case context for copilot
  caseContext = {
    alertId:                  alert.id,
    riskLevel:                riskAssessment ? riskAssessment.riskLevel : alert.risk_level,
    riskScore:                riskAssessment ? riskAssessment.totalScore : alert.risk_score,
    accountId:                alert.account_id,
    customerName:             account ? account.customer_name : alert.account_id,
    transactionId:            alert.transaction_id,
    amount:                   transaction ? transaction.amount : 0,
    customerVerification:     alert.customer_verification || 'NOT_REQUIRED',
    customerResponse:         alert.customer_response || '',
    customerVerificationTime: alert.customer_verification_timestamp || null,
    factors:       riskAssessment ? riskAssessment.factors : (riskFactors || []).map(f => ({
      name: f.factor_name, score: f.score, maxScore: f.max_score, explanation: f.explanation,
    })),
  };

  const level  = caseContext.riskLevel;
  const score  = caseContext.riskScore;

  // ── Header ──────────────────────────────────────────────────────
  text('hdr-alert-id',           alert.id);
  text('hdr-risk-badge',         UI.riskBadge(level, true));
  text('hdr-verification-badge', UI.verificationBadge(alert.customer_verification));
  text('hdr-status-badge',       UI.statusBadge(investigation ? investigation.status : alert.status));
  text('hdr-created',            UI.formatDate(alert.created_at));
  text('hdr-txn-ref',            alert.transaction_id ? `TXN: ${alert.transaction_id}` : '');

  const scoreEl = document.getElementById('hdr-score-num');
  scoreEl.textContent = score;
  scoreEl.className = `risk-score-number ${riskScoreClass(level)}`;

  // ── Customer Verification Card ──────────────────────────────────
  renderCustomerVerificationCard(alert, transaction, account);

  function renderCustomerVerificationCard(alt, txn, acc) {
    const cardEl  = document.getElementById('customer-verification-card');
    const badgeEl = document.getElementById('card-verification-badge');
    const bodyEl  = document.getElementById('customer-verification-body');
    const status  = (alt.customer_verification || 'NOT_REQUIRED').toUpperCase();

    badgeEl.innerHTML = UI.verificationBadge(status);
    cardEl.className = `verification-card status-${status.toLowerCase()}`;

    const customerName = acc ? acc.customer_name : (alt.customer_name || alt.account_id);
    const timeStr = alt.customer_verification_timestamp
      ? UI.formatDate(alt.customer_verification_timestamp)
      : (txn && txn.timestamp ? UI.formatDate(txn.timestamp) : '—');

    if (status === 'DENIED') {
      bodyEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <span class="badge badge-denied" style="font-size:12px;padding:4px 10px;">🚨 UNAUTHORIZED TRANSACTION REPORTED</span>
          <span class="text-muted text-xs">Direct Account Owner Dispute</span>
        </div>
        <div class="statement-quote-box denied">
          <div style="font-weight:600;margin-bottom:4px;color:#EF4444;">Customer Response: "No, I did not make this transaction"</div>
          <div>Account owner <strong>${customerName}</strong> (${alt.account_id}) denied authorizing transaction <code>${alt.transaction_id || ''}</code> for <strong>${UI.formatINR(alt.amount)}</strong>.</div>
        </div>
        <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;font-size:12px;">
          <div class="info-row"><span class="info-label">Verification Channel:</span> <span class="info-value">FinGuard Mobile & Web Banking Portal</span></div>
          <div class="info-row"><span class="info-label">Dispute Timestamp:</span> <span class="info-value">${timeStr}</span></div>
          <div class="info-row"><span class="info-label">Escalation Status:</span> <span class="info-value" style="color:var(--risk-critical);font-weight:600;">Priority CRITICAL → Human Investigator Queue</span></div>
          <div class="info-row"><span class="info-label">Protective Hold:</span> <span class="info-value" style="color:#F59E0B;font-weight:600;">Recommended Immediate Card/UPI Suspension</span></div>
        </div>
      `;
    } else if (status === 'CONFIRMED') {
      bodyEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <span class="badge badge-confirmed" style="font-size:12px;padding:4px 10px;">✓ CUSTOMER CONFIRMED</span>
          <span class="text-muted text-xs">Legitimate Customer Activity</span>
        </div>
        <div class="statement-quote-box confirmed">
          <div style="font-weight:600;margin-bottom:4px;color:#22C55E;">Customer Response: "Yes, this was me"</div>
          <div>Account owner <strong>${customerName}</strong> confirmed making this transaction. Case retained in logs for compliance.</div>
        </div>
        <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:10px;font-size:12px;">
          <div class="info-row"><span class="info-label">Verification Channel:</span> <span class="info-value">FinGuard Mobile Banking Portal</span></div>
          <div class="info-row"><span class="info-label">Confirmation Timestamp:</span> <span class="info-value">${timeStr}</span></div>
          <div class="info-row"><span class="info-label">System Action:</span> <span class="info-value" style="color:var(--risk-low);font-weight:600;">No Fraud Case Required · Retained in Baseline History</span></div>
        </div>
      `;
    } else if (status === 'PENDING') {
      bodyEl.innerHTML = `
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <span class="badge badge-pending" style="font-size:12px;padding:4px 10px;">⏳ VERIFICATION PENDING</span>
          <span class="text-muted text-xs">Prompt Dispatched to Account Owner</span>
        </div>
        <div class="statement-quote-box pending">
          <div style="font-weight:600;margin-bottom:4px;color:#EAB308;">Verification Prompt Active</div>
          <div>FinGuard AI Copilot prompt was delivered to <strong>${customerName}</strong>. Awaiting customer confirmation.</div>
        </div>
        <div style="margin-top:14px;padding-top:12px;border-top:1px solid rgba(255,255,255,0.06);display:flex;gap:10px;align-items:center;flex-wrap:wrap;">
          <span class="text-muted text-xs" style="margin-right:auto;">Manual Verification Action:</span>
          <button class="btn btn-sm" id="btn-card-confirm" style="background:rgba(34,197,94,0.12);color:#4ADE80;border:1px solid rgba(34,197,94,0.3);font-size:12px;padding:5px 12px;font-weight:600;cursor:pointer;">
            ✓ Confirm as Legitimate (Customer Verified)
          </button>
          <button class="btn btn-sm" id="btn-card-deny" style="background:rgba(239,68,68,0.12);color:#F87171;border:1px solid rgba(239,68,68,0.3);font-size:12px;padding:5px 12px;font-weight:600;cursor:pointer;">
            🚨 Report as Fraud (Customer Denied)
          </button>
        </div>
      `;

      // Attach handlers for card buttons
      const btnCardConfirm = document.getElementById('btn-card-confirm');
      if (btnCardConfirm) {
        btnCardConfirm.onclick = async () => {
          btnCardConfirm.disabled = true;
          showToast('Confirming cardholder authorization…', 'info');
          const txnId = alt.transaction_id || (txn ? txn.id : '');
          const { data, error } = await API.verifyTransaction(txnId, 'CONFIRMED', 'Investigator confirmed cardholder authorization.');
          if (error) {
            showToast('Failed to confirm: ' + error, 'error');
            btnCardConfirm.disabled = false;
            return;
          }
          showToast('✓ Transaction confirmed as legitimate.', 'success');
          alt.customer_verification = 'CONFIRMED';
          alt.status = 'DISMISSED';
          if (txn) txn.customer_verification = 'CONFIRMED';
          if (investigation) {
            investigation.customer_verification = 'CONFIRMED';
            investigation.status = 'DISMISSED';
          }
          document.getElementById('hdr-verification-badge').innerHTML = UI.verificationBadge('CONFIRMED');
          statusBadgeEl.innerHTML = UI.statusBadge('DISMISSED');
          renderCustomerVerificationCard(alt, txn, acc);
          renderCustomerReportReview();
        };
      }

      const btnCardDeny = document.getElementById('btn-card-deny');
      if (btnCardDeny) {
        btnCardDeny.onclick = async () => {
          btnCardDeny.disabled = true;
          showToast('Escalating customer fraud report…', 'info');
          const txnId = alt.transaction_id || (txn ? txn.id : '');
          const { data, error } = await API.verifyTransaction(txnId, 'DENIED', 'Investigator recorded cardholder denial.');
          if (error) {
            showToast('Failed to report fraud: ' + error, 'error');
            btnCardDeny.disabled = false;
            return;
          }
          showToast('🚨 Transaction marked as denied by customer. Escalated.', 'error');
          alt.customer_verification = 'DENIED';
          alt.status = 'ESCALATED';
          if (txn) txn.customer_verification = 'DENIED';
          if (investigation) {
            investigation.customer_verification = 'DENIED';
            investigation.status = 'ESCALATED';
          }
          document.getElementById('hdr-verification-badge').innerHTML = UI.verificationBadge('DENIED');
          statusBadgeEl.innerHTML = UI.statusBadge('ESCALATED');
          renderCustomerVerificationCard(alt, txn, acc);
          renderCustomerReportReview();
        };
      }
    } else {
      bodyEl.innerHTML = `
        <div style="font-size:13px;color:var(--text-muted);padding:8px 0;">
          Transaction risk score (${alt.risk_score}/100) fell within normal baseline activity. Interactive customer verification was not triggered.
        </div>
      `;
    }
  }

  // ── Investigation Audit Timeline ────────────────────────────────
  renderTimeline(currentTimeline);

  function renderTimeline(events) {
    const listEl = document.getElementById('investigation-timeline-list');
    if (!events || !events.length) {
      listEl.innerHTML = '<div class="text-muted text-sm">No timeline events recorded.</div>';
      return;
    }

    const dotMap = {
      TRANSACTION_DETECTED:     { cls: 'dot-blue',     icon: '💳' },
      RISK_ANALYSIS_COMPLETED:  { cls: 'dot-high',     icon: '⚡' },
      VERIFICATION_REQUESTED:   { cls: 'dot-medium',   icon: '🤖' },
      CUSTOMER_DENIED:          { cls: 'dot-critical', icon: '🚨' },
      CUSTOMER_CONFIRMED:       { cls: 'dot-low',      icon: '✅' },
      INVESTIGATION_ESCALATED:  { cls: 'dot-critical', icon: '🔍' },
      INVESTIGATION_STARTED:    { cls: 'dot-blue',     icon: '🛡️' },
      INVESTIGATOR_DECISION:    { cls: 'dot-blue',     icon: '⚖️' },
    };

    listEl.innerHTML = `
      <div class="timeline-wrap">
        ${events.map(evt => {
          const conf = dotMap[evt.type] || { cls: 'dot-blue', icon: '📌' };
          return `
            <div class="timeline-step">
              <div class="timeline-dot ${conf.cls}">${conf.icon}</div>
              <div class="timeline-header">
                <span class="timeline-title">${evt.title}</span>
                <span class="timeline-time">${UI.formatDate(evt.timestamp)}</span>
              </div>
              <div class="timeline-desc">${evt.description}</div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

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

  const fullCopilotLink = document.getElementById('open-full-copilot');
  if (fullCopilotLink) {
    fullCopilotLink.href = `copilot.html?id=${encodeURIComponent(alert.id)}`;
  }

  const SUGGESTED = [
    'What did the customer state about this transaction?',
    'Evaluate customer denial evidence',
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

  function addChatMessage(role, text) {
    const msgs = document.getElementById('chat-messages');
    const wrap = document.createElement('div');
    wrap.className = `chat-message ${role}`;
    wrap.innerHTML = `
      <span class="who">${role === 'user' ? 'You' : 'AI Copilot'}</span>
      <div class="bubble" style="white-space:pre-wrap;">${text}</div>`;
    msgs.appendChild(wrap);
    msgs.scrollTop = msgs.scrollHeight;
  }

  // Auto-load alert explanation on open
  (async function loadExplanation() {
    const msgs = document.getElementById('chat-messages');
    msgs.innerHTML = '';  // clear placeholder text
    const typing = document.createElement('div');
    typing.className = 'chat-message ai';
    typing.id = 'typing-indicator';
    typing.innerHTML = '<span class="who">AI Copilot</span><div class="bubble" style="color:var(--text-muted);">Analyzing alert…</div>';
    msgs.appendChild(typing);

    const { data, error } = await API.postCopilotExplainAlert(alert.id);
    const t = document.getElementById('typing-indicator');
    if (t) t.remove();

    if (error || !data) {
      addChatMessage('ai', 'AI service unavailable. Use the suggested questions to query manually.');
      return;
    }

    // Show explanation
    addChatMessage('ai', data.explanation || 'Alert analysis loaded.');

    // Show evidence and recommendations inline
    if ((data.evidence && data.evidence.length) || (data.recommendations && data.recommendations.length)) {
      let html = '';
      if (data.evidence && data.evidence.length) {
        html += '<strong>Evidence:</strong><ul style="margin:4px 0 8px 16px;">';
        data.evidence.forEach(e => { html += `<li style="margin:2px 0;">${e}</li>`; });
        html += '</ul>';
      }
      if (data.recommendations && data.recommendations.length) {
        html += '<strong>Recommended steps:</strong><ul style="margin:4px 0 0 16px;">';
        data.recommendations.forEach(r => { html += `<li style="margin:2px 0;">${r}</li>`; });
        html += '</ul>';
      }
      const wrap = document.createElement('div');
      wrap.className = 'chat-message ai';
      wrap.innerHTML = `<span class="who">AI Copilot</span><div class="bubble">${html}</div>`;
      msgs.appendChild(wrap);
      msgs.scrollTop = msgs.scrollHeight;
    }
  })();

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

  // Generate Brief — calls Python /api/reports/investigation via Node proxy
  document.getElementById('btn-brief').addEventListener('click', async () => {
    const btn = document.getElementById('btn-brief');
    btn.disabled = true;
    btn.textContent = 'Generating…';

    const notes = document.getElementById('inv-notes').value.trim();
    const { data: reportData, error: err } = await API.postAiInvestigationReport(alert.id, notes, null);
    btn.disabled = false;
    btn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:14px;height:14px;"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/></svg> Generate Investigation Brief`;

    if (err) {
      showToast('Failed to generate brief: ' + err, 'error');
      return;
    }

    // Build a formatted brief text from the AI summary
    const brief = [
      `FINGUARD AI INVESTIGATION BRIEF`,
      `${'─'.repeat(60)}`,
      `Case: ${reportData.alertId}`,
      ``,
      reportData.aiSummary,
      ``,
      `${'─'.repeat(60)}`,
      reportData.disclaimer || '',
    ].join('\n');

    sessionStorage.setItem('finguard_brief', JSON.stringify({ alertId: alert.id, brief, context: caseContext }));
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

    if (resp.investigation && Array.isArray(resp.investigation.timeline)) {
      currentTimeline = resp.investigation.timeline;
      renderTimeline(currentTimeline);
    } else {
      // Append local decision if backend didn't return complete array
      currentTimeline.push({
        id: `evt-local-${Date.now()}`,
        type: 'INVESTIGATOR_DECISION',
        title: `Investigator Action: ${newStatus}`,
        description: notes ? `Investigator noted: "${notes}"` : `Case status marked as ${newStatus}.`,
        timestamp: new Date().toISOString(),
      });
      renderTimeline(currentTimeline);
    }

    if (action === 'dismiss') {
      alert.customer_verification = 'CONFIRMED';
      if (transaction) transaction.customer_verification = 'CONFIRMED';
      if (investigation) {
        investigation.customer_verification = 'CONFIRMED';
        investigation.status = 'DISMISSED';
      }
      document.getElementById('hdr-verification-badge').innerHTML = UI.verificationBadge('CONFIRMED');
      renderCustomerVerificationCard(alert, transaction, account);
      renderCustomerReportReview();
    } else if (action === 'escalate') {
      if (investigation) investigation.status = 'ESCALATED';
      renderCustomerReportReview();
    }
  }

  document.getElementById('btn-escalate').addEventListener('click',   () => handleAction('escalate'));
  document.getElementById('btn-monitor').addEventListener('click',    () => handleAction('monitor'));
  document.getElementById('btn-legitimate').addEventListener('click', () => handleAction('dismiss'));

  // ── Customer Report Review & Start Investigation ──────────────────
  renderCustomerReportReview();

  function renderCustomerReportReview() {
    const reviewSection = document.getElementById('customer-report-review');
    const progressBanner = document.getElementById('investigation-progress-banner');
    const vStatus = (alert.customer_verification || 'NOT_REQUIRED').toUpperCase();
    const invStatus = investigation ? investigation.status : alert.status;
    const customerName = account ? account.customer_name : (alert.customer_name || alert.account_id);

    // Show the "Approve & Start Investigation" section only for ESCALATED + DENIED cases
    if (vStatus === 'DENIED' && invStatus === 'ESCALATED') {
      reviewSection.style.display = '';
      progressBanner.style.display = 'none';

      const reviewBody = document.getElementById('customer-report-body');
      const deniedAt = alert.customer_verification_timestamp
        ? UI.formatDate(alert.customer_verification_timestamp)
        : 'Recently';

      reviewBody.innerHTML = `
        <div style="background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25);border-radius:var(--radius-md);padding:16px;margin-top:12px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <span class="badge badge-denied" style="font-size:12px;padding:4px 10px;">🚨 CUSTOMER DENIED TRANSACTION</span>
            <span class="text-muted text-xs">Requires Investigator Approval</span>
          </div>
          <div style="font-size:14px;color:var(--text-secondary);line-height:1.6;">
            <strong style="color:#F87171;">${customerName}</strong> (Account ${alert.account_id}) has reported transaction
            <code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:3px;">${alert.transaction_id}</code>
            for <strong style="color:var(--risk-critical);">${UI.formatINR(transaction ? transaction.amount : alert.amount)}</strong>
            as <em style="color:#FCA5A5;">unauthorized</em>.
          </div>
          <div style="margin-top:12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;font-size:12px;">
            <div class="info-row"><span class="info-label">Customer Response:</span> <span class="info-value" style="color:#FCA5A5;font-weight:600;">"I did not make this transaction"</span></div>
            <div class="info-row"><span class="info-label">Denied At:</span> <span class="info-value">${deniedAt}</span></div>
            <div class="info-row"><span class="info-label">Priority:</span> <span class="info-value" style="color:var(--risk-critical);font-weight:700;">CRITICAL</span></div>
            <div class="info-row"><span class="info-label">Current Status:</span> <span class="info-value" style="color:#F59E0B;font-weight:600;">ESCALATED — Awaiting Investigator Approval</span></div>
          </div>
          <div style="margin-top:14px;padding:12px;background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:var(--radius-sm);font-size:13px;color:#EAB308;">
            ⚠ <strong>Action Required:</strong> Review the customer's fraud report, transaction details, and risk factors above. Click <strong>"Approve & Start Investigation"</strong> below to begin formal investigation and notify the customer.
          </div>
        </div>
      `;

      document.getElementById('review-status-badge').innerHTML =
        '<span class="badge badge-denied" style="font-size:11px;">Awaiting Approval</span>';

    } else if (vStatus === 'DENIED' && invStatus === 'UNDER_INVESTIGATION') {
      // Show investigation in progress banner
      reviewSection.style.display = 'none';
      progressBanner.style.display = '';

      const startedAt = investigation && investigation.investigation_started_at
        ? UI.formatDate(investigation.investigation_started_at)
        : 'Recently';

      const progressBody = document.getElementById('investigation-progress-body');
      progressBody.innerHTML = `
        <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:var(--radius-md);padding:16px;margin-top:12px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
            <span class="badge badge-open" style="font-size:12px;padding:4px 10px;background:rgba(59,130,246,0.15);color:#60A5FA;border-color:rgba(59,130,246,0.3);">🛡️ INVESTIGATION ACTIVE</span>
            <span class="text-muted text-xs">Customer Has Been Notified</span>
          </div>
          <div style="font-size:14px;color:var(--text-secondary);line-height:1.6;">
            Formal investigation for <strong>${customerName}</strong>'s fraud report on transaction
            <code style="background:rgba(255,255,255,0.06);padding:2px 6px;border-radius:3px;">${alert.transaction_id}</code>
            is now <strong style="color:#60A5FA;">actively underway</strong>.
          </div>
          <div style="margin-top:12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;font-size:12px;">
            <div class="info-row"><span class="info-label">Investigation Started:</span> <span class="info-value">${startedAt}</span></div>
            <div class="info-row"><span class="info-label">Assigned Investigator:</span> <span class="info-value">S. Rajan (Senior Investigator)</span></div>
            <div class="info-row"><span class="info-label">Status:</span> <span class="info-value" style="color:#60A5FA;font-weight:600;">UNDER INVESTIGATION</span></div>
          </div>
          <div style="margin-top:14px;padding:10px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2);border-radius:var(--radius-sm);font-size:13px;color:#4ADE80;">
            ✓ Customer portal has been updated with "Investigation In Progress" status. Use the Investigator Decision panel below to Escalate, Monitor, or Dismiss this case.
          </div>
        </div>
      `;
    } else {
      reviewSection.style.display = 'none';
      progressBanner.style.display = 'none';
    }
  }

  // "Approve & Start Investigation" button handler
  document.getElementById('btn-start-investigation').addEventListener('click', async () => {
    const btn = document.getElementById('btn-start-investigation');
    const notes = document.getElementById('start-inv-notes').value.trim();
    btn.disabled = true;
    btn.textContent = 'Starting Investigation…';

    const { data: resp, error: err } = await API.startInvestigation(alert.id, notes);

    btn.disabled = false;
    btn.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
      ✓ Approve &amp; Start Investigation
    `;

    if (err) {
      showToast('Failed to start investigation: ' + err, 'error');
      return;
    }

    showToast(`✓ Investigation started for ${alert.id}. Customer portal updated.`, 'success');

    // Update header badge
    const newStatus = resp.investigation ? resp.investigation.status : 'UNDER_INVESTIGATION';
    statusBadgeEl.innerHTML = UI.statusBadge(newStatus);

    // Update timeline
    if (resp.investigation && Array.isArray(resp.investigation.timeline)) {
      currentTimeline = resp.investigation.timeline;
      renderTimeline(currentTimeline);
    }

    // Update the investigation object reference
    if (resp.investigation) {
      Object.assign(investigation || {}, resp.investigation);
    }

    // Hide the approve section and show progress banner
    document.getElementById('customer-report-review').style.display = 'none';
    const progressBanner = document.getElementById('investigation-progress-banner');
    progressBanner.style.display = '';

    const startedAt = resp.investigation && resp.investigation.investigation_started_at
      ? UI.formatDate(resp.investigation.investigation_started_at)
      : UI.formatDate(new Date().toISOString());

    const customerName = account ? account.customer_name : (alert.customer_name || alert.account_id);
    document.getElementById('investigation-progress-body').innerHTML = `
      <div style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.25);border-radius:var(--radius-md);padding:16px;margin-top:12px;">
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">
          <span class="badge badge-open" style="font-size:12px;padding:4px 10px;background:rgba(59,130,246,0.15);color:#60A5FA;border-color:rgba(59,130,246,0.3);">🛡️ INVESTIGATION ACTIVE</span>
          <span class="text-muted text-xs">Customer Has Been Notified</span>
        </div>
        <div style="font-size:14px;color:var(--text-secondary);line-height:1.6;">
          Investigation for <strong>${customerName}</strong>'s fraud report is now <strong style="color:#60A5FA;">actively underway</strong>.
        </div>
        <div style="margin-top:12px;display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;font-size:12px;">
          <div class="info-row"><span class="info-label">Investigation Started:</span> <span class="info-value">${startedAt}</span></div>
          <div class="info-row"><span class="info-label">Assigned Investigator:</span> <span class="info-value">S. Rajan</span></div>
          <div class="info-row"><span class="info-label">Status:</span> <span class="info-value" style="color:#60A5FA;font-weight:600;">UNDER INVESTIGATION</span></div>
        </div>
        <div style="margin-top:14px;padding:10px;background:rgba(34,197,94,0.06);border:1px solid rgba(34,197,94,0.2);border-radius:var(--radius-sm);font-size:13px;color:#4ADE80;">
          ✓ Customer portal has been updated with "Investigation In Progress" status.
        </div>
      </div>
    `;
  });

  // Global search redirect
  document.getElementById('globalSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) window.location.href = `alerts.html?search=${encodeURIComponent(q)}`;
    }
  });

})();
