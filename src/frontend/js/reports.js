/**
 * FinGuard — Reports JS
 * Loads brief from sessionStorage (set by alert-details page)
 * or generates a new one from the API.
 */

(async function () {
  const params  = new URLSearchParams(window.location.search);
  const alertId = params.get('alertId') || 'ALT-10482';

  const loadingEl   = document.getElementById('report-loading');
  const docWrap     = document.getElementById('report-doc-wrap');
  const metaEl      = document.getElementById('report-meta');
  const briefBodyEl = document.getElementById('brief-body');

  function showDoc(briefText, context) {
    loadingEl.style.display = 'none';
    docWrap.style.display   = '';

    const ctx      = context || {};
    const now      = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    metaEl.innerHTML = `
      <div class="report-meta-item"><span class="report-meta-label">Case Reference</span><span class="report-meta-value">${ctx.alertId || alertId}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Generated</span><span class="report-meta-value">${now} IST</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Risk Level</span><span class="report-meta-value">${ctx.riskLevel || '—'}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Risk Score</span><span class="report-meta-value">${ctx.riskScore != null ? ctx.riskScore + '/100' : '—'}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Customer</span><span class="report-meta-value">${ctx.customerName || ctx.accountId || '—'}</span></div>
      <div class="report-meta-item"><span class="report-meta-label">Investigator</span><span class="report-meta-value">S. Rajan</span></div>
    `;

    briefBodyEl.textContent = briefText || 'No brief content.';
  }

  async function generateBrief(caseContext) {
    loadingEl.style.display = '';
    docWrap.style.display   = 'none';

    const { data, error } = await API.postCopilotBrief(caseContext || { alertId });
    if (error) {
      loadingEl.innerHTML = `
        <div class="state-container">
          <div class="state-title">Failed to generate report</div>
          <div class="state-sub">${error}</div>
          <a href="investigations.html" class="btn btn-secondary btn-sm">← Investigations</a>
        </div>`;
      return;
    }
    showDoc(data.brief, caseContext);
    sessionStorage.setItem('finguard_brief', JSON.stringify({ alertId, brief: data.brief, context: caseContext }));
  }

  // ── Load ──────────────────────────────────────────────────────
  const stored = sessionStorage.getItem('finguard_brief');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (parsed.alertId === alertId) {
        showDoc(parsed.brief, parsed.context);
        loadingEl.style.display = 'none';
      } else {
        await generateBrief(null);
      }
    } catch (_) {
      await generateBrief(null);
    }
  } else {
    await generateBrief(null);
  }

  document.getElementById('btn-regenerate').addEventListener('click', async () => {
    const stored2 = sessionStorage.getItem('finguard_brief');
    let ctx = null;
    if (stored2) {
      try { ctx = JSON.parse(stored2).context; } catch (_) {}
    }
    await generateBrief(ctx);
  });
})();
