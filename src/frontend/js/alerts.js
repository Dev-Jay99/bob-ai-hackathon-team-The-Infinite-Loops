/**
 * FinGuard — Alerts Queue JS
 */

(function () {
  const CITIES = [
    'Mumbai','Delhi','Bangalore','Hyderabad','Chennai','Kolkata','Pune','Ahmedabad',
    'Jaipur','Surat','Lucknow','Kanpur','Nagpur','Indore','Thane',
  ];

  let currentPage = 1;
  const LIMIT = 20;
  let debounceTimer = null;
  let lastParams = {};

  // ── Populate location filter ──────────────────────────────────
  const locSelect = document.getElementById('locationFilter');
  CITIES.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c; opt.textContent = c;
    locSelect.appendChild(opt);
  });

  // ── Read URL params on load ───────────────────────────────────
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('search'))    document.getElementById('searchInput').value    = urlParams.get('search');
  if (urlParams.get('riskLevel')) document.getElementById('riskFilter').value     = urlParams.get('riskLevel');
  if (urlParams.get('status'))    document.getElementById('statusFilter').value   = urlParams.get('status');

  // ── Fetch and render ─────────────────────────────────────────
  async function fetchAlerts(page = 1) {
    currentPage = page;
    const params = {
      page,
      limit: LIMIT,
      search:    document.getElementById('searchInput').value.trim(),
      riskLevel: document.getElementById('riskFilter').value,
      status:    document.getElementById('statusFilter').value,
      location:  document.getElementById('locationFilter').value,
    };
    lastParams = params;

    const state = document.getElementById('alerts-state');
    const wrap  = document.getElementById('alerts-table-wrap');

    state.innerHTML = '<div class="state-container"><div class="spinner"></div></div>';
    state.style.display = 'flex';
    wrap.style.display  = 'none';

    const { data, error } = await API.getAlerts(params);

    if (error) {
      state.innerHTML = `
        <div class="state-container">
          <div class="state-title">Failed to load alerts</div>
          <div class="state-sub">${error}</div>
          <button class="btn btn-secondary btn-sm" onclick="fetchAlerts(1)">Retry</button>
        </div>`;
      return;
    }

    if (!data.data || data.data.length === 0) {
      state.innerHTML = `
        <div class="state-container">
          <svg class="state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
          <div class="state-title">No alerts found</div>
          <div class="state-sub">Try adjusting your filters or search term.</div>
        </div>`;
      document.getElementById('result-count').textContent = '';
      return;
    }

    state.style.display = 'none';
    wrap.style.display  = 'block';

    renderTable(data.data);
    renderPagination(data.pagination);

    const { page: p, limit: l, total } = data.pagination;
    const from = (p - 1) * l + 1;
    const to   = Math.min(p * l, total);
    document.getElementById('result-count').textContent = `${from}–${to} of ${total} alerts`;
  }

  function renderTable(alerts) {
    const tbody = document.getElementById('alerts-body');
    tbody.innerHTML = alerts.map(a => `
      <tr class="clickable" onclick="window.location.href='alert-details.html?id=${a.id}'">
        <td class="id-cell">${a.id}</td>
        <td>${a.customer_name || a.account_id}</td>
        <td>${UI.riskBadge(a.risk_level)}</td>
        <td>
          <span style="font-variant-numeric:tabular-nums;font-weight:600;color:${riskColor(a.risk_level)};">
            ${a.risk_score}/100
          </span>
        </td>
        <td>${UI.statusBadge(a.status)}</td>
        <td class="amount-cell">₹${Number(a.amount || 0).toLocaleString('en-IN')}</td>
        <td class="text-secondary">${a.location || '—'}</td>
        <td class="text-muted text-sm">${UI.formatDate(a.created_at)}</td>
      </tr>
    `).join('');
  }

  function riskColor(level) {
    const map = { CRITICAL:'#EF4444', HIGH:'#F97316', MEDIUM:'#EAB308', LOW:'#22C55E' };
    return map[(level||'').toUpperCase()] || '#94A3B8';
  }

  function renderPagination(p) {
    document.getElementById('page-info').textContent = `Page ${p.page} of ${p.pages}`;
    document.getElementById('prevBtn').disabled = p.page <= 1;
    document.getElementById('nextBtn').disabled = p.page >= p.pages;

    const nums = document.getElementById('page-nums');
    nums.innerHTML = '';
    const range = pageRange(p.page, p.pages);
    range.forEach(n => {
      if (n === '…') {
        const sp = document.createElement('span');
        sp.textContent = '…';
        sp.style.cssText = 'padding:5px 4px;color:var(--text-muted);font-size:12px;';
        nums.appendChild(sp);
        return;
      }
      const btn = document.createElement('button');
      btn.className = `page-btn${n === p.page ? ' active' : ''}`;
      btn.textContent = n;
      btn.onclick = () => fetchAlerts(n);
      nums.appendChild(btn);
    });
  }

  function pageRange(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const pages = [1];
    if (current > 3) pages.push('…');
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2) pages.push('…');
    pages.push(total);
    return pages;
  }

  // ── Events ────────────────────────────────────────────────────
  document.getElementById('searchInput').addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => fetchAlerts(1), 300);
  });

  ['riskFilter','statusFilter','locationFilter'].forEach(id => {
    document.getElementById(id).addEventListener('change', () => fetchAlerts(1));
  });

  document.getElementById('prevBtn').addEventListener('click', () => fetchAlerts(currentPage - 1));
  document.getElementById('nextBtn').addEventListener('click', () => fetchAlerts(currentPage + 1));

  document.getElementById('resetBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value  = '';
    document.getElementById('riskFilter').value   = '';
    document.getElementById('statusFilter').value = '';
    document.getElementById('locationFilter').value = '';
    fetchAlerts(1);
  });

  document.getElementById('globalSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      document.getElementById('searchInput').value = e.target.value.trim();
      fetchAlerts(1);
    }
  });

  // ── Init ──────────────────────────────────────────────────────
  fetchAlerts(1);
})();
