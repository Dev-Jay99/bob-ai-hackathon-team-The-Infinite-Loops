/**
 * FinGuard — Dashboard JS
 */

(async function () {
  let distChart  = null;

  // ── KPI counter animation ────────────────────────────────────
  function animateCount(el, target, duration = 800) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString();
    }
    requestAnimationFrame(step);
  }

  // ── Load stats ───────────────────────────────────────────────
  async function loadStats() {
    const { data, error } = await API.getAlertStats();
    if (error) {
      document.getElementById('kpi-total').textContent    = 'ERR';
      document.getElementById('kpi-critical').textContent = 'ERR';
      document.getElementById('kpi-high').textContent     = 'ERR';
      document.getElementById('kpi-pending').textContent  = 'ERR';
      showToast('Failed to load dashboard stats: ' + error, 'error');
      return null;
    }

    animateCount(document.getElementById('kpi-total'),    data.totalAlerts);
    animateCount(document.getElementById('kpi-critical'), data.criticalAlerts);
    animateCount(document.getElementById('kpi-high'),     data.highRiskAlerts);
    animateCount(document.getElementById('kpi-pending'),  data.pendingInvestigations);

    document.getElementById('last-updated').textContent =
      'Updated ' + new Date().toLocaleTimeString('en-IN');

    return data;
  }

  // ── Distribution Chart ───────────────────────────────────────
  function buildDistChart(byRiskLevel) {
    document.getElementById('dist-state').style.display = 'none';
    const wrap = document.getElementById('distChartWrap');
    wrap.style.display = 'block';

    if (distChart) distChart.destroy();

    distChart = new Chart(document.getElementById('distChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['Critical', 'High', 'Medium', 'Low'],
        datasets: [{
          data: [
            byRiskLevel.CRITICAL || 0,
            byRiskLevel.HIGH     || 0,
            byRiskLevel.MEDIUM   || 0,
            byRiskLevel.LOW      || 0,
          ],
          backgroundColor: ['#EF4444','#F97316','#EAB308','#22C55E'],
          borderColor: '#151F2E',
          borderWidth: 3,
          hoverOffset: 6,
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#CBD5E1', font: { size: 12 }, padding: 14, boxWidth: 12 },
          },
          tooltip: {
            backgroundColor: '#1B2638',
            borderColor: '#263244',
            borderWidth: 1,
            titleColor: '#CBD5E1',
            bodyColor: '#94A3B8',
          },
        },
      },
    });
  }

  // ── Critical Alerts Table ─────────────────────────────────────
  async function loadCriticalAlerts() {
    const { data, error } = await API.getAlerts({ riskLevel: 'CRITICAL', limit: 5, page: 1 });

    const state = document.getElementById('critical-state');
    const wrap  = document.getElementById('critical-table-wrap');
    const tbody = document.getElementById('critical-alerts-body');

    if (error) {
      state.innerHTML = `
        <div class="state-container">
          <div class="state-title">Failed to load alerts</div>
          <div class="state-sub">${error}</div>
          <button class="btn btn-secondary btn-sm" onclick="loadCriticalAlerts()">Retry</button>
        </div>`;
      return;
    }

    if (!data.data || data.data.length === 0) {
      state.innerHTML = `
        <div class="state-container">
          <div class="state-title">No critical alerts</div>
          <div class="state-sub">No critical-level alerts at this time.</div>
        </div>`;
      return;
    }

    state.style.display = 'none';
    wrap.style.display  = 'block';

    tbody.innerHTML = data.data.map(alert => `
      <tr class="clickable" onclick="window.location.href='alert-details.html?id=${alert.id}'">
        <td class="id-cell">${alert.id}</td>
        <td>${alert.customer_name || alert.account_id}</td>
        <td class="amount-cell">₹${Number(alert.amount || 0).toLocaleString('en-IN')}</td>
        <td>${UI.riskBadge(alert.risk_level)}</td>
        <td>${UI.statusBadge(alert.status)}</td>
        <td class="text-secondary">${alert.location || '—'}</td>
        <td class="text-muted text-sm">${UI.formatDate(alert.created_at)}</td>
      </tr>
    `).join('');
  }

  // ── Init ─────────────────────────────────────────────────────
  const stats = await loadStats();
  if (stats) {
    buildDistChart(stats.byRiskLevel || {});
  } else {
    document.getElementById('dist-state').innerHTML =
      '<div class="state-container"><div class="state-title">Chart unavailable</div></div>';
  }

  await loadCriticalAlerts();

  // Global search redirect
  document.getElementById('globalSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) window.location.href = `alerts.html?search=${encodeURIComponent(q)}`;
    }
  });
})();
