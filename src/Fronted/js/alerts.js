/* ============================================================
   FinGuard — alerts.js
   Alerts page: data, search, filters, sort, pagination, navigation
   ============================================================ */

// ─── Synthetic Alert Data ─────────────────────────────────────
// Future: replace with GET /api/alerts

const ALL_ALERTS = [
  { id:'A001', txId:'TX-88210001', account:'ACC-8821', name:'Rajesh K.',    amount:172000, risk:94, level:'CRITICAL', location:'Mumbai',    time:'2024-01-15 02:17', status:'Open',       priority:'P1' },
  { id:'A002', txId:'TX-33450001', account:'ACC-3345', name:'Priya M.',     amount:88500,  risk:85, level:'CRITICAL', location:'Delhi',     time:'2024-01-15 23:42', status:'In Review',  priority:'P1' },
  { id:'A003', txId:'TX-66770001', account:'ACC-6677', name:'Arjun S.',     amount:45000,  risk:82, level:'CRITICAL', location:'Pune',      time:'2024-01-16 03:05', status:'Escalated',  priority:'P1' },
  { id:'A004', txId:'TX-11290001', account:'ACC-1129', name:'Nisha P.',     amount:67300,  risk:89, level:'CRITICAL', location:'Chennai',   time:'2024-01-16 01:30', status:'Open',       priority:'P1' },
  { id:'A005', txId:'TX-55120001', account:'ACC-5512', name:'Karan V.',     amount:99900,  risk:91, level:'CRITICAL', location:'Hyderabad', time:'2024-01-16 04:20', status:'Open',       priority:'P1' },
  { id:'A006', txId:'TX-22330001', account:'ACC-2233', name:'Deepa L.',     amount:38000,  risk:76, level:'HIGH',     location:'Bengaluru', time:'2024-01-15 14:22', status:'In Review',  priority:'P2' },
  { id:'A007', txId:'TX-44550001', account:'ACC-4455', name:'Manoj T.',     amount:21500,  risk:72, level:'HIGH',     location:'Kolkata',   time:'2024-01-15 09:11', status:'Open',       priority:'P2' },
  { id:'A008', txId:'TX-77880001', account:'ACC-7788', name:'Ankur J.',     amount:55000,  risk:79, level:'HIGH',     location:'Ahmedabad', time:'2024-01-15 16:48', status:'Monitoring', priority:'P2' },
  { id:'A009', txId:'TX-99100001', account:'ACC-9910', name:'Ritu B.',      amount:12000,  risk:68, level:'HIGH',     location:'Surat',     time:'2024-01-14 11:35', status:'Closed',     priority:'P2' },
  { id:'A010', txId:'TX-11220001', account:'ACC-1122', name:'Sunita R.',    amount:29800,  risk:74, level:'HIGH',     location:'Jaipur',    time:'2024-01-14 20:05', status:'Open',       priority:'P2' },
  { id:'A011', txId:'TX-33660001', account:'ACC-3366', name:'Vivek A.',     amount:9500,   risk:55, level:'MEDIUM',   location:'Lucknow',   time:'2024-01-14 08:22', status:'Open',       priority:'P3' },
  { id:'A012', txId:'TX-55440001', account:'ACC-5544', name:'Pooja N.',     amount:14200,  risk:48, level:'MEDIUM',   location:'Nagpur',    time:'2024-01-13 15:40', status:'In Review',  priority:'P3' },
  { id:'A013', txId:'TX-66550001', account:'ACC-6655', name:'Sanjay M.',    amount:7800,   risk:42, level:'MEDIUM',   location:'Patna',     time:'2024-01-13 12:10', status:'Monitoring', priority:'P3' },
  { id:'A014', txId:'TX-88990001', account:'ACC-8899', name:'Kavita D.',    amount:18500,  risk:58, level:'MEDIUM',   location:'Indore',    time:'2024-01-13 19:55', status:'Open',       priority:'P3' },
  { id:'A015', txId:'TX-00110001', account:'ACC-0011', name:'Harish P.',    amount:32000,  risk:51, level:'MEDIUM',   location:'Bhopal',    time:'2024-01-12 22:30', status:'Closed',     priority:'P3' },
  { id:'A016', txId:'TX-22550001', account:'ACC-2255', name:'Meena S.',     amount:5200,   risk:22, level:'LOW',      location:'Vadodara',  time:'2024-01-12 10:15', status:'Closed',     priority:'P4' },
  { id:'A017', txId:'TX-44770001', account:'ACC-4477', name:'Rohit G.',     amount:4800,   risk:18, level:'LOW',      location:'Coimbatore',time:'2024-01-11 16:05', status:'Closed',     priority:'P4' },
  { id:'A018', txId:'TX-66000001', account:'ACC-6600', name:'Anita C.',     amount:6300,   risk:29, level:'LOW',      location:'Kochi',     time:'2024-01-11 09:40', status:'Closed',     priority:'P4' },
  { id:'A019', txId:'TX-77110001', account:'ACC-7711', name:'Suresh W.',    amount:3100,   risk:15, level:'LOW',      location:'Visakhapatnam', time:'2024-01-10 14:22', status:'Closed', priority:'P4' },
  { id:'A020', txId:'TX-99220001', account:'ACC-9922', name:'Divya R.',     amount:8900,   risk:27, level:'LOW',      location:'Chandigarh',time:'2024-01-10 17:55', status:'Closed',     priority:'P4' },
];

// ─── State ────────────────────────────────────────────────────
let filteredAlerts = [...ALL_ALERTS];
let currentPage = 1;
const PAGE_SIZE = 10;
let sortField = 'risk';
let sortDir = 'desc';

// ─── Filter & Search ──────────────────────────────────────────
function applyFilters() {
  const query  = (document.getElementById('alert-search')?.value || '').toLowerCase();
  const risk   = document.getElementById('filter-risk')?.value || '';
  const status = document.getElementById('filter-status')?.value || '';

  filteredAlerts = ALL_ALERTS.filter(a => {
    const matchSearch = !query ||
      a.id.toLowerCase().includes(query) ||
      a.account.toLowerCase().includes(query) ||
      a.name.toLowerCase().includes(query) ||
      a.location.toLowerCase().includes(query) ||
      a.txId.toLowerCase().includes(query);
    const matchRisk   = !risk   || a.level === risk;
    const matchStatus = !status || a.status === status;
    return matchSearch && matchRisk && matchStatus;
  });

  sortAlerts();
  currentPage = 1;
  renderAlertsTable();
  renderPagination();
  updateAlertCount();
}

// ─── Sort ─────────────────────────────────────────────────────
function sortAlerts() {
  filteredAlerts.sort((a, b) => {
    let va = a[sortField], vb = b[sortField];
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
}

function setSort(field) {
  if (sortField === field) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortField = field;
    sortDir = 'desc';
  }
  sortAlerts();
  renderAlertsTable();
  updateSortHeaders();
}

function updateSortHeaders() {
  document.querySelectorAll('.alerts-table thead th[data-sort]').forEach(th => {
    th.classList.remove('sorted');
    const icon = th.querySelector('.sort-icon');
    if (icon) icon.textContent = '↕';
    if (th.dataset.sort === sortField) {
      th.classList.add('sorted');
      if (icon) icon.textContent = sortDir === 'asc' ? '↑' : '↓';
    }
  });
}

// ─── Pagination ───────────────────────────────────────────────
function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.ceil(filteredAlerts.length / PAGE_SIZE);
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `
    <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
    <button class="page-btn" ${currentPage===1?'disabled':''} onclick="changePage(${currentPage-1})">‹</button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="changePage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<span style="color:var(--text-muted);padding:0 2px;">…</span>`;
    }
  }

  html += `<button class="page-btn" ${currentPage===totalPages?'disabled':''} onclick="changePage(${currentPage+1})">›</button>`;
  container.innerHTML = html;
}

function changePage(page) {
  const totalPages = Math.ceil(filteredAlerts.length / PAGE_SIZE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderAlertsTable();
  renderPagination();
}

// ─── Count Label ──────────────────────────────────────────────
function updateAlertCount() {
  const el = document.getElementById('alert-count');
  if (el) el.textContent = `Showing ${filteredAlerts.length} of ${ALL_ALERTS.length} alerts`;
}

// ─── Render Alerts Table ──────────────────────────────────────
function renderAlertsTable() {
  const tbody = document.getElementById('alerts-tbody');
  if (!tbody) return;

  const start = (currentPage - 1) * PAGE_SIZE;
  const page  = filteredAlerts.slice(start, start + PAGE_SIZE);

  if (page.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="10">
        <div class="empty-state">
          <svg width="36" height="36" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
          <p>No alerts match your filters.</p>
        </div>
      </td></tr>
    `;
    return;
  }

  const priorityDots = { P1: 'priority-p1', P2: 'priority-p2', P3: 'priority-p3', P4: 'priority-p4' };

  tbody.innerHTML = page.map(a => {
    const riskCls = getRiskClass(a.level);
    const timeStr = new Date(a.time).toLocaleString('en-IN', {
      day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit', hour12:true
    });
    return `
      <tr onclick="openAlert('${a.id}', true)">
        <td class="alert-id-cell">${a.id}</td>
        <td class="td-mono">${a.txId}</td>
        <td>
          <div style="font-weight:600;color:var(--text-primary);font-size:13px;">${a.name}</div>
          <div style="font-size:11px;color:var(--text-muted);">${a.account}</div>
        </td>
        <td class="amount-cell">${formatINR(a.amount)}</td>
        <td class="risk-score-cell" style="color:var(--risk-${riskCls});">${a.risk}<span style="font-size:11px;color:var(--text-muted);font-weight:400;">/100</span></td>
        <td>${updateRiskBadge(a.level)}</td>
        <td style="font-size:13px;color:var(--text-secondary);">${a.location}</td>
        <td class="time-cell">${timeStr}</td>
        <td>${statusBadge(a.status)}</td>
        <td>
          <span class="priority-dot ${priorityDots[a.priority]}"></span>
          <span style="font-size:12px;color:var(--text-muted);">${a.priority}</span>
        </td>
      </tr>
    `;
  }).join('');
}

// ─── Quick Stats ──────────────────────────────────────────────
function renderQuickStats() {
  const container = document.getElementById('alerts-quick-stats');
  if (!container) return;

  const critical = ALL_ALERTS.filter(a => a.level === 'CRITICAL').length;
  const open     = ALL_ALERTS.filter(a => a.status === 'Open').length;
  const today    = ALL_ALERTS.filter(a => a.time.startsWith('2024-01-16')).length;
  const avg      = Math.round(ALL_ALERTS.reduce((s,a) => s+a.risk, 0) / ALL_ALERTS.length);

  container.innerHTML = `
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:var(--risk-critical-bg);">🔴</div>
      <div>
        <div class="quick-stat-val" style="color:var(--risk-critical);">${critical}</div>
        <div class="quick-stat-lbl">Critical Alerts</div>
      </div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(59,130,246,0.12);">📋</div>
      <div>
        <div class="quick-stat-val">${open}</div>
        <div class="quick-stat-lbl">Open Alerts</div>
      </div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(245,158,11,0.12);">📅</div>
      <div>
        <div class="quick-stat-val" style="color:var(--risk-medium);">${today}</div>
        <div class="quick-stat-lbl">Today's Alerts</div>
      </div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(34,197,94,0.12);">📊</div>
      <div>
        <div class="quick-stat-val">${avg}</div>
        <div class="quick-stat-lbl">Avg Risk Score</div>
      </div>
    </div>
  `;
}

// ─── Init Alerts Page ─────────────────────────────────────────
function initAlertsPage() {
  buildSidebar('alerts', '../');
  buildTopbar('Suspicious Alerts', false);

  renderQuickStats();
  applyFilters();

  // Search input
  const searchEl = document.getElementById('alert-search');
  if (searchEl) {
    searchEl.addEventListener('input', applyFilters);
  }

  // Filter selects
  ['filter-risk', 'filter-status'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });

  // Sort headers
  document.querySelectorAll('.alerts-table thead th[data-sort]').forEach(th => {
    th.addEventListener('click', () => setSort(th.dataset.sort));
  });

  updateSortHeaders();
}

document.addEventListener('DOMContentLoaded', initAlertsPage);
