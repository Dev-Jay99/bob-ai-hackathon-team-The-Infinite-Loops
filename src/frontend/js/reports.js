/**
 * FinGuard — Reports JS
 * Generates dynamic, auditable AML Investigation Briefs & PDF documents
 * for ANY case (e.g. ALT-00200, ALT-10482, ALT-00012) using real database records.
 */

(async function () {
  const urlParams = new URLSearchParams(window.location.search);
  let currentAlertId = normalizeAlertId(urlParams.get('alertId') || urlParams.get('id') || 'ALT-00200');

  const loadingEl    = document.getElementById('report-loading');
  const loadingTitle = document.getElementById('report-loading-title');
  const docWrap      = document.getElementById('report-doc-wrap');
  const metaEl       = document.getElementById('report-meta');
  const briefBodyEl  = document.getElementById('brief-body');
  const caseInput    = document.getElementById('report-case-input');
  const caseSelect   = document.getElementById('report-case-select');
  const copilotLink  = document.getElementById('link-copilot-investigate');

  function normalizeAlertId(raw) {
    if (!raw) return '';
    let s = String(raw).trim().toUpperCase();
    if (/^\d+$/.test(s)) {
      s = 'ALT-' + s.padStart(5, '0');
    } else if (/^ALT\d+$/i.test(s)) {
      const digits = s.replace(/^ALT/i, '');
      s = 'ALT-' + digits.padStart(5, '0');
    }
    return s;
  }

  // ── Populate Select Dropdown with Real Alerts from Database ─────────────────
  async function initCaseDropdown() {
    try {
      const { data } = await API.getAlerts({ limit: 500 });
      const list = Array.isArray(data) ? data : (data && Array.isArray(data.data) ? data.data : []);
      if (!list.length || !caseSelect) return;

      // Sort: critical/high first, then by ID
      const order = { CRITICAL: 0, HIGH: 1, MEDIUM: 2, LOW: 3 };
      list.sort((a, b) => {
        const diff = (order[a.risk_level] ?? 9) - (order[b.risk_level] ?? 9);
        return diff !== 0 ? diff : a.id.localeCompare(b.id);
      });

      caseSelect.innerHTML = list.map(a => {
        const name = a.customer_name || a.account_id;
        const amt = UI && UI.formatINR ? UI.formatINR(a.amount) : `₹${a.amount}`;
        const selected = a.id === currentAlertId ? 'selected' : '';
        return `<option value="${a.id}" ${selected}>${a.id} — ${name} · ${amt} · ${a.location || ''} [${a.risk_level}]</option>`;
      }).join('');
    } catch (err) {
      console.warn('Could not populate case dropdown:', err);
    }
  }

  // ── Sync Active States in UI ────────────────────────────────────────────────
  function syncUIState(alertId) {
    if (caseInput) caseInput.value = alertId;
    if (caseSelect && caseSelect.value !== alertId) {
      caseSelect.value = alertId;
    }

    // Highlight active quick case button
    document.querySelectorAll('.quick-case-btn').forEach(btn => {
      if (btn.dataset.id === alertId) {
        btn.classList.add('btn-primary');
        btn.classList.remove('btn-ghost');
      } else {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-ghost');
      }
    });

    if (copilotLink) {
      copilotLink.href = `copilot.html?id=${encodeURIComponent(alertId)}`;
    }
  }

  // ── Render Report Header & Body ─────────────────────────────────────────────
  function showDoc(briefText, caseContext) {
    loadingEl.style.display = 'none';
    docWrap.style.display   = '';

    const ctx = caseContext || {};
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const riskBadge = ctx.riskLevel && UI && UI.riskBadge ? UI.riskBadge(ctx.riskLevel) : `<span class="badge">${ctx.riskLevel || 'UNKNOWN'}</span>`;
    const scoreStr  = ctx.riskScore != null ? `${ctx.riskScore} / 100` : '—';
    const custStr   = ctx.customerName ? `${ctx.customerName} (${ctx.accountId || ''})` : (ctx.accountId || '—');
    const amtStr    = UI && UI.formatINR ? UI.formatINR(ctx.amount) : `₹${ctx.amount || 0}`;
    const txnStr    = `${amtStr} ${ctx.currency || 'INR'} · ${ctx.location || 'Unknown'} · ${ctx.device || 'Unknown'}`;
    const avgStr    = UI && UI.formatINR ? UI.formatINR(ctx.avgAmount) : `₹${ctx.avgAmount || 0}`;
    const maxStr    = UI && UI.formatINR ? UI.formatINR(ctx.maxAmount) : `₹${ctx.maxAmount || 0}`;

    metaEl.innerHTML = `
      <div class="report-meta-item"><span class="report-meta-label">Case Reference</span><span class="report-meta-value text-mono font-bold" style="font-size:14px;color:var(--accent-blue);">${ctx.alertId || currentAlertId}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Generated</span><span class="report-meta-value">${now} IST</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Risk Level</span><span class="report-meta-value">${riskBadge}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Risk Score</span><span class="report-meta-value font-bold" style="font-size:14px;">${scoreStr}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Customer</span><span class="report-meta-value font-bold">${custStr}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Flagged Txn</span><span class="report-meta-value" style="color:var(--risk-critical);font-weight:600;">${txnStr}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Usual Profile</span><span class="report-meta-value">City: ${ctx.usualCity || 'Unknown'} · Avg: ${avgStr} · Max: ${maxStr}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Counterparty</span><span class="report-meta-value text-mono">${ctx.receiverId || 'N/A'}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Investigator</span><span class="report-meta-value">S. Rajan (Senior AML Investigator)</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Classification</span><span class="report-meta-value font-bold" style="color:var(--risk-high);">SAR Candidate / Regulatory Review</span></div>
    `;

    briefBodyEl.textContent = briefText || 'No brief generated.';
    document.title = `FinGuard Investigation Report — ${ctx.alertId || currentAlertId} (${ctx.customerName || 'AML Case'})`;
  }

  // ── Load & Generate Dynamic Report for Any Case ─────────────────────────────
  async function loadReportForCase(rawAlertId) {
    const alertId = normalizeAlertId(rawAlertId);
    if (!alertId) return;
    currentAlertId = alertId;

    syncUIState(currentAlertId);

    loadingEl.style.display = '';
    docWrap.style.display   = 'none';
    if (loadingTitle) loadingTitle.textContent = `Generating dynamic case report for ${currentAlertId}…`;

    // Update URL query string seamlessly
    if (window.history && window.history.replaceState) {
      window.history.replaceState(null, '', `?alertId=${encodeURIComponent(currentAlertId)}`);
    }

    // 1. Fetch real alert data from database
    const { data: detail, error: detailErr } = await API.getAlertById(currentAlertId);

    if (detailErr || !detail || !detail.alert) {
      loadingEl.innerHTML = `
        <div class="state-container">
          <div class="state-title">Case Not Found</div>
          <div class="state-sub">Alert ID "<strong>${currentAlertId}</strong>" was not found in the database.</div>
          <div style="display:flex;gap:10px;justify-content:center;margin-top:16px;">
            <button class="btn btn-primary btn-sm" onclick="location.href='?alertId=ALT-00200'">Load ALT-00200</button>
            <button class="btn btn-secondary btn-sm" onclick="location.href='?alertId=ALT-10482'">Load ALT-10482</button>
            <a class="btn btn-ghost btn-sm" href="alerts.html">← Alerts Queue</a>
          </div>
        </div>`;
      return;
    }

    const { alert, transaction, account, riskAssessment } = detail;
    const riskScore = riskAssessment ? riskAssessment.totalScore : alert.risk_score;
    const riskLevel = riskAssessment ? riskAssessment.riskLevel : alert.risk_level;
    const custName  = account ? account.customer_name : alert.account_id;
    const amount    = transaction ? transaction.amount : 0;
    const loc       = transaction ? transaction.location : 'Unknown';
    const dev       = transaction ? transaction.device : 'Unknown';

    const caseContext = {
      alertId:        alert.id,
      riskLevel,
      riskScore,
      accountId:      alert.account_id,
      customerName:   custName,
      transactionId:  alert.transaction_id,
      amount,
      currency:       transaction ? (transaction.currency || 'INR') : 'INR',
      location:       loc,
      device:         dev,
      time:           transaction && transaction.timestamp ? new Date(transaction.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Unknown',
      date:           transaction && transaction.timestamp ? new Date(transaction.timestamp).toLocaleDateString('en-IN') : 'Unknown',
      receiverId:     transaction ? transaction.receiver_id : 'Unknown',
      avgAmount:      account ? account.avg_txn_amount : 0,
      maxAmount:      account ? account.max_txn_amount : 0,
      balance:        account ? account.balance : 0,
      usualCity:      account ? account.usual_city : 'Unknown',
      usualDevice:    account ? account.usual_device : 'Unknown',
      factors:        riskAssessment ? riskAssessment.factors : (detail.riskFactors || []),
    };

    // 2. Use pre-generated brief if passed from alert-details.html, or generate fresh
    let briefText = null;
    try {
      const stored = JSON.parse(sessionStorage.getItem('finguard_brief') || '{}');
      if (stored && stored.alertId === currentAlertId && stored.brief) {
        briefText = stored.brief;
      }
    } catch (e) {}

    if (!briefText) {
      const { data: briefData, error: briefErr } = await API.postCopilotBrief(caseContext);

      if (briefErr || !briefData) {
        loadingEl.innerHTML = `
          <div class="state-container">
            <div class="state-title">Failed to generate report</div>
            <div class="state-sub">${briefErr || 'Brief service unavailable'}</div>
            <button class="btn btn-secondary btn-sm" onclick="location.reload()">Retry</button>
          </div>`;
        return;
      }
      briefText = briefData.brief;
    }

    showDoc(briefText, caseContext);
  }

  // ── Events ──────────────────────────────────────────────────────────────────
  if (caseSelect) {
    caseSelect.addEventListener('change', () => {
      if (caseSelect.value) {
        loadReportForCase(caseSelect.value);
      }
    });
  }

  const btnLoad = document.getElementById('btn-load-report');
  if (btnLoad) {
    btnLoad.addEventListener('click', () => {
      loadReportForCase(caseInput.value.trim());
    });
  }

  if (caseInput) {
    caseInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        loadReportForCase(caseInput.value.trim());
      }
    });
  }

  document.querySelectorAll('.quick-case-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      loadReportForCase(btn.dataset.id);
    });
  });

  const btnRegen = document.getElementById('btn-regenerate');
  if (btnRegen) {
    btnRegen.addEventListener('click', () => {
      loadReportForCase(currentAlertId);
    });
  }

  // ── Initial Start ───────────────────────────────────────────────────────────
  await initCaseDropdown();
  loadReportForCase(currentAlertId);
})();
