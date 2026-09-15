/**
 * FinGuard — Investigations JS
 */

(async function () {
  async function loadInvestigations() {
    const status = document.getElementById('status-filter').value;
    const state = document.getElementById('inv-state');
    const wrap  = document.getElementById('inv-table-wrap');

    state.innerHTML = '<div class="state-container"><div class="spinner"></div></div>';
    state.style.display = '';
    wrap.style.display  = 'none';

    const { data, error } = await API.getInvestigations(status);

    if (error) {
      state.innerHTML = `
        <div class="state-container">
          <div class="state-title">Failed to load investigations</div>
          <div class="state-sub">${error}</div>
          <button class="btn btn-secondary btn-sm" onclick="loadInvestigations()">Retry</button>
        </div>`;
      return;
    }

    const items = data.data || [];
    if (items.length === 0) {
      state.innerHTML = `
        <div class="state-container">
          <svg class="state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/></svg>
          <div class="state-title">No investigations found</div>
          <div class="state-sub">Escalate or monitor alerts from the Alerts Queue to see them here.</div>
        </div>`;
      return;
    }

    state.style.display = 'none';
    wrap.style.display  = 'block';

    document.getElementById('inv-body').innerHTML = items.map(inv => `
      <tr class="clickable" onclick="window.location.href='alert-details.html?id=${inv.alert_id}'">
        <td class="id-cell">${inv.id}</td>
        <td class="id-cell">${inv.alert_id}</td>
        <td>${UI.riskBadge(inv.risk_level || '—')}</td>
        <td>${UI.statusBadge(inv.status)}</td>
        <td class="text-muted text-sm">${inv.notes ? inv.notes.slice(0, 60) + (inv.notes.length > 60 ? '…' : '') : '—'}</td>
        <td class="text-muted text-sm">${UI.formatDate(inv.updated_at)}</td>
        <td onclick="event.stopPropagation()">
          <a href="alert-details.html?id=${inv.alert_id}" class="btn btn-ghost btn-sm">Open →</a>
        </td>
      </tr>
    `).join('');
  }

  document.getElementById('status-filter').addEventListener('change', loadInvestigations);
  document.getElementById('globalSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) window.location.href = `alerts.html?search=${encodeURIComponent(q)}`;
    }
  });

  await loadInvestigations();
})();
