/* ============================================================
   FinGuard — dashboard.js
   Dashboard: synthetic data, charts, stat cards
   ============================================================ */

// ─── Synthetic Dashboard Data ─────────────────────────────────
// Future: replace with GET /api/alerts (summary endpoint)

const DASHBOARD_STATS = {
  total: 143,
  critical: 12,
  high: 28,
  medium: 54,
  low: 49
};

const ALERT_TREND = [
  { day: 'Mon', count: 18, critical: 2 },
  { day: 'Tue', count: 22, critical: 3 },
  { day: 'Wed', count: 15, critical: 1 },
  { day: 'Thu', count: 31, critical: 5 },
  { day: 'Fri', count: 27, critical: 4 },
  { day: 'Sat', count: 14, critical: 1 },
  { day: 'Sun', count: 16, critical: 3 },
];

const RECENT_CRITICAL_ALERTS = [
  { id: 'A001', account: 'ACC-8821', name: 'Rajesh K.', amount: 172000, risk: 94, level: 'CRITICAL', location: 'Mumbai', time: '02:17 AM', status: 'Open' },
  { id: 'A002', account: 'ACC-3345', name: 'Priya M.',  amount: 88500,  risk: 85, level: 'CRITICAL', location: 'Delhi',  time: '11:42 PM', status: 'In Review' },
  { id: 'A003', account: 'ACC-6677', name: 'Arjun S.',  amount: 45000,  risk: 82, level: 'CRITICAL', location: 'Pune',   time: '03:05 AM', status: 'Escalated' },
  { id: 'A004', account: 'ACC-1129', name: 'Nisha P.',  amount: 67300,  risk: 89, level: 'CRITICAL', location: 'Chennai',time: '01:30 AM', status: 'Open' },
  { id: 'A005', account: 'ACC-5512', name: 'Karan V.',  amount: 99900,  risk: 91, level: 'CRITICAL', location: 'Hyderabad', time: '04:20 AM', status: 'Open' },
];

const SUSPICIOUS_ACCOUNTS = [
  { id: 'ACC-8821', name: 'Rajesh K.',  initials: 'RK', risk: 'CRITICAL', alerts: 3 },
  { id: 'ACC-3345', name: 'Priya M.',   initials: 'PM', risk: 'CRITICAL', alerts: 2 },
  { id: 'ACC-9934', name: 'Mohit D.',   initials: 'MD', risk: 'HIGH',     alerts: 5 },
  { id: 'ACC-1122', name: 'Sunita R.',  initials: 'SR', risk: 'HIGH',     alerts: 4 },
  { id: 'ACC-7788', name: 'Ankur J.',   initials: 'AJ', risk: 'MEDIUM',   alerts: 2 },
];

const INVESTIGATOR_WORKLOAD = [
  { name: 'Siddharth A.', cases: 8,  max: 15 },
  { name: 'Pooja N.',     cases: 12, max: 15 },
  { name: 'Vikram S.',    cases: 5,  max: 15 },
  { name: 'Rekha T.',     cases: 10, max: 15 },
  { name: 'Ajay K.',      cases: 7,  max: 15 },
];

const RECENT_ACTIVITY = [
  { time: '02:31', text: 'Alert A001 escalated by Siddharth A.', type: 'action' },
  { time: '02:18', text: 'New CRITICAL alert A005 raised for ACC-5512', type: 'system' },
  { time: '01:45', text: 'Investigation note added on A002 by Pooja N.', type: 'note' },
  { time: '01:30', text: 'New CRITICAL alert A004 raised for ACC-1129', type: 'system' },
  { time: '00:55', text: 'Alert A009 marked as Legitimate by Vikram S.', type: 'action' },
  { time: '00:30', text: 'Network graph reviewed for ACC-8821', type: 'note' },
];

// ─── Render Stat Cards ─────────────────────────────────────────
function renderStatCards() {
  const container = document.getElementById('stat-cards');
  if (!container) return;

  const cards = [
    { type: 'total',    label: 'Total Alerts',    value: DASHBOARD_STATS.total,    change: '+12%', dir: 'up' },
    { type: 'critical', label: 'Critical Alerts',  value: DASHBOARD_STATS.critical, change: '+4',   dir: 'up' },
    { type: 'high',     label: 'High Alerts',      value: DASHBOARD_STATS.high,     change: '+2',   dir: 'up' },
    { type: 'medium',   label: 'Medium Alerts',    value: DASHBOARD_STATS.medium,   change: '-3',   dir: 'down' },
    { type: 'low',      label: 'Low Alerts',       value: DASHBOARD_STATS.low,      change: '+6',   dir: 'up' },
  ];

  container.innerHTML = cards.map(card => `
    <div class="stat-card ${card.type}">
      <div class="stat-label">${card.label}</div>
      <div class="stat-value">${card.value}</div>
      <div class="stat-change ${card.dir}">
        ${card.dir === 'up' ? '▲' : '▼'} ${card.change} vs last week
      </div>
    </div>
  `).join('');
}

// ─── Alert Trend Bar Chart ─────────────────────────────────────
function renderAlertTrendChart() {
  const container = document.getElementById('alert-trend-chart');
  if (!container) return;

  const maxCount = Math.max(...ALERT_TREND.map(d => d.count));
  const chartHeight = 140;

  let html = ALERT_TREND.map(d => {
    const totalPct = Math.round((d.count / maxCount) * chartHeight);
    const critPct  = Math.round((d.critical / maxCount) * chartHeight);
    const normalH  = totalPct - critPct;
    return `
      <div class="bar-group" title="${d.day}: ${d.count} total, ${d.critical} critical">
        <div class="bar-value">${d.count}</div>
        <div style="display:flex;flex-direction:column;width:100%;height:${totalPct}px;">
          <div style="flex:${normalH};background:var(--accent);border-radius:3px 3px 0 0;opacity:0.7;min-height:${normalH>0?2:0}px;"></div>
          <div style="height:${critPct}px;background:var(--risk-critical);min-height:${critPct>0?2:0}px;"></div>
        </div>
        <div class="bar-label">${d.day}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="bar-chart">${html}</div>
    <div style="display:flex;gap:14px;margin-top:8px;">
      <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-muted);">
        <span style="width:10px;height:10px;background:var(--accent);border-radius:2px;opacity:0.7;display:inline-block;"></span>
        Total Alerts
      </span>
      <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-muted);">
        <span style="width:10px;height:10px;background:var(--risk-critical);border-radius:2px;display:inline-block;"></span>
        Critical
      </span>
    </div>
  `;
}

// ─── Risk Distribution Donut Chart (SVG) ──────────────────────
function renderRiskDistributionChart() {
  const container = document.getElementById('risk-distribution-chart');
  if (!container) return;

  const data = [
    { label: 'Critical', count: DASHBOARD_STATS.critical, color: '#ef4444' },
    { label: 'High',     count: DASHBOARD_STATS.high,     color: '#f97316' },
    { label: 'Medium',   count: DASHBOARD_STATS.medium,   color: '#f59e0b' },
    { label: 'Low',      count: DASHBOARD_STATS.low,      color: '#22c55e' },
  ];

  const total = data.reduce((s, d) => s + d.count, 0);
  const cx = 65, cy = 65, r = 50, innerR = 30;
  const circumference = 2 * Math.PI * r;

  let currentAngle = -Math.PI / 2;
  let arcs = '';

  data.forEach(d => {
    const fraction = d.count / total;
    const angle = fraction * 2 * Math.PI;
    const x1 = cx + r * Math.cos(currentAngle);
    const y1 = cy + r * Math.sin(currentAngle);
    const x2 = cx + r * Math.cos(currentAngle + angle);
    const y2 = cy + r * Math.sin(currentAngle + angle);
    const xi1 = cx + innerR * Math.cos(currentAngle);
    const yi1 = cy + innerR * Math.sin(currentAngle);
    const xi2 = cx + innerR * Math.cos(currentAngle + angle);
    const yi2 = cy + innerR * Math.sin(currentAngle + angle);
    const largeArc = angle > Math.PI ? 1 : 0;

    arcs += `
      <path d="M ${x1} ${y1}
               A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
               L ${xi2} ${yi2}
               A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi1} ${yi1} Z"
            fill="${d.color}" opacity="0.9"/>
    `;
    currentAngle += angle;
  });

  const legendHTML = data.map(d => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${d.color};"></span>
      <span>${d.label}</span>
      <span class="legend-count">${d.count}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="donut-wrapper">
      <svg class="donut-svg" width="130" height="130" viewBox="0 0 130 130">
        ${arcs}
        <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
              font-size="18" font-weight="800" fill="#e6edf3">${total}</text>
        <text x="${cx}" y="${cy + 16}" text-anchor="middle"
              font-size="9" fill="#57687e" letter-spacing="0.5">ALERTS</text>
      </svg>
      <div class="donut-legend">${legendHTML}</div>
    </div>
  `;
}

// ─── Recent Critical Alerts Table ────────────────────────────
function renderRecentCriticalAlerts() {
  const tbody = document.getElementById('recent-alerts-body');
  if (!tbody) return;

  tbody.innerHTML = RECENT_CRITICAL_ALERTS.map(a => `
    <tr class="alert-row-link" onclick="openAlert('${a.id}', false)">
      <td class="alert-id-cell">${a.id}</td>
      <td>
        <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${a.name}</div>
        <div style="font-size:11px;color:var(--text-muted);">${a.account}</div>
      </td>
      <td class="amount-cell">${formatINR(a.amount)}</td>
      <td>
        <span style="font-size:14px;font-weight:800;color:var(--risk-${getRiskClass(a.level)});">${a.risk}</span>
        <span style="font-size:11px;color:var(--text-muted);">/100</span>
      </td>
      <td>${updateRiskBadge(a.level)}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${a.location}</td>
      <td style="font-size:12px;color:var(--text-muted);">${a.time}</td>
      <td>${statusBadge(a.status)}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();openAlert('${a.id}',false)">Review</button>
      </td>
    </tr>
  `).join('');
}

// ─── Suspicious Accounts List ──────────────────────────────────
function renderSuspiciousAccounts() {
  const container = document.getElementById('suspicious-accounts');
  if (!container) return;

  container.innerHTML = SUSPICIOUS_ACCOUNTS.map(acc => `
    <div class="account-item">
      <div class="account-avatar">${acc.initials}</div>
      <div>
        <div class="account-name">${acc.name}</div>
        <div class="account-id">${acc.id} · ${acc.alerts} alert${acc.alerts>1?'s':''}</div>
      </div>
      <div class="account-risk">${updateRiskBadge(acc.risk)}</div>
    </div>
  `).join('');
}

// ─── Investigator Workload ─────────────────────────────────────
function renderWorkload() {
  const container = document.getElementById('investigator-workload');
  if (!container) return;

  container.innerHTML = INVESTIGATOR_WORKLOAD.map(inv => {
    const pct = Math.round((inv.cases / inv.max) * 100);
    const color = pct > 80 ? 'var(--risk-high)' : pct > 60 ? 'var(--risk-medium)' : 'var(--accent)';
    return `
      <div class="workload-item">
        <div class="workload-name">${inv.name}</div>
        <div class="workload-bar-wrap">
          <div class="workload-bar-fill" style="width:${pct}%;background:${color};"></div>
        </div>
        <div class="workload-count">${inv.cases}</div>
      </div>
    `;
  }).join('');
}

// ─── Recent Activity Feed ──────────────────────────────────────
function renderActivityFeed() {
  const container = document.getElementById('activity-feed');
  if (!container) return;

  const dotColors = { action: 'var(--risk-critical)', note: 'var(--accent)', system: 'var(--text-muted)' };

  container.innerHTML = RECENT_ACTIVITY.map(a => `
    <div class="activity-item">
      <div class="activity-time">${a.time}</div>
      <div class="activity-dot" style="background:${dotColors[a.type]};"></div>
      <div class="activity-text">${a.text}</div>
    </div>
  `).join('');
}

// ─── Init Dashboard ───────────────────────────────────────────
function initDashboard() {
  buildSidebar('dashboard', '');
  buildTopbar('Investigation Dashboard', true);

  renderStatCards();
  renderAlertTrendChart();
  renderRiskDistributionChart();
  renderRecentCriticalAlerts();
  renderSuspiciousAccounts();
  renderWorkload();
  renderActivityFeed();
}

document.addEventListener('DOMContentLoaded', initDashboard);
