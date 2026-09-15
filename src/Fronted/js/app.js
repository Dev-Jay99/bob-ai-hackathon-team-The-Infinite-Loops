/* ============================================================
   FinGuard — app.js
   Common functionality: sidebar, toast, theme, navigation
   ============================================================ */

// ─── Sidebar Active State ────────────────────────────────────
/**
 * Highlights the correct sidebar link based on current page.
 * @param {string} pageId - e.g. 'dashboard', 'alerts', 'network'
 */
function setActiveSidebar(pageId) {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });
}

// ─── Toast Notifications ─────────────────────────────────────
/**
 * Show a toast notification.
 * @param {string} message - Text to display
 * @param {'info'|'success'|'warning'|'error'} type
 * @param {number} duration - ms before auto-dismiss (default 3500)
 */
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="font-size:14px;font-weight:700;">${icons[type] || icons.info}</span>
    <span style="flex:1;">${message}</span>
    <span style="cursor:pointer;opacity:0.6;font-size:12px;padding-left:8px;" onclick="this.parentElement.remove()">✕</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ─── Theme Management ─────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('fg_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('fg_theme', next);
  showToast(`Theme switched to ${next} mode`, 'info', 2000);
}

// ─── Mobile Sidebar Toggle ────────────────────────────────────
function initMobileSidebar() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ─── Risk Utilities ───────────────────────────────────────────
/**
 * Get risk level label from a numeric score.
 * @param {number} score
 * @returns {string} 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
 */
function getRiskLevel(score) {
  if (score <= 30) return 'LOW';
  if (score <= 60) return 'MEDIUM';
  if (score <= 80) return 'HIGH';
  return 'CRITICAL';
}

/**
 * Get CSS class suffix for a risk level.
 * @param {string|number} riskOrScore
 * @returns {string}
 */
function getRiskClass(riskOrScore) {
  const level = typeof riskOrScore === 'number'
    ? getRiskLevel(riskOrScore)
    : riskOrScore.toUpperCase();
  const map = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', CRITICAL: 'critical' };
  return map[level] || 'medium';
}

/**
 * Build a risk badge HTML string.
 * @param {string} level - 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
 * @returns {string} HTML
 */
function updateRiskBadge(level) {
  const cls = getRiskClass(level);
  return `<span class="risk-badge risk-${cls}">${level}</span>`;
}

/**
 * Build a status badge HTML string.
 * @param {string} status
 * @returns {string} HTML
 */
function statusBadge(status) {
  const map = {
    'Open': 'open', 'In Review': 'review', 'Escalated': 'escalated',
    'Monitoring': 'monitoring', 'Closed': 'closed', 'Pending': 'pending'
  };
  const cls = map[status] || 'pending';
  return `<span class="status-badge status-${cls}">${status}</span>`;
}

// ─── Currency Formatter ───────────────────────────────────────
/**
 * Format a number as Indian Rupee string.
 * @param {number} amount
 * @returns {string}
 */
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// ─── Date/Time Utilities ──────────────────────────────────────
function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });
}

function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Navigate to Alert Details ────────────────────────────────
/**
 * Open the alert details page for a given alert ID.
 * @param {string} alertId
 * @param {boolean} fromPages - true if currently inside pages/ folder
 */
function openAlert(alertId, fromPages = false) {
  const path = fromPages
    ? `alert-details.html?id=${alertId}`
    : `pages/alert-details.html?id=${alertId}`;
  window.location.href = path;
}

// ─── URL Query Params ─────────────────────────────────────────
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// ─── Confirm Dialog ───────────────────────────────────────────
/**
 * Show a simple confirm overlay.
 * @param {string} title
 * @param {string} message
 * @param {function} onConfirm
 * @param {'danger'|'warning'|'info'} type
 */
function showConfirm(title, message, onConfirm, type = 'danger') {
  let overlay = document.getElementById('confirm-overlay');
  if (overlay) overlay.remove();

  const colorMap = { danger: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
  const color = colorMap[type] || colorMap.info;

  overlay = document.createElement('div');
  overlay.id = 'confirm-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9998;
    display:flex;align-items:center;justify-content:center;
  `;
  overlay.innerHTML = `
    <div style="background:#1c2230;border:1px solid #2a3347;border-radius:10px;padding:24px;max-width:380px;width:90%;">
      <div style="font-size:16px;font-weight:700;color:#e6edf3;margin-bottom:8px;">${title}</div>
      <div style="font-size:13px;color:#8b99b0;margin-bottom:20px;line-height:1.5;">${message}</div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button id="confirm-cancel" style="padding:7px 14px;border-radius:6px;border:1px solid #2a3347;background:#161b22;color:#8b99b0;cursor:pointer;font-size:13px;">Cancel</button>
        <button id="confirm-ok" style="padding:7px 14px;border-radius:6px;border:none;background:${color};color:#fff;cursor:pointer;font-size:13px;font-weight:600;">Confirm</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.getElementById('confirm-cancel').onclick = () => overlay.remove();
  document.getElementById('confirm-ok').onclick = () => { overlay.remove(); onConfirm(); };
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

// ─── Notification Button ──────────────────────────────────────
function initNotifButton() {
  const btn = document.getElementById('notif-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    showToast('3 new critical alerts require immediate review', 'warning', 4000);
  });
}

// ─── Build Sidebar HTML ───────────────────────────────────────
/**
 * Inject the sidebar into any element with id="sidebar".
 * @param {string} activePage
 * @param {string} basePath - '' for root, '../' for pages/
 */
function buildSidebar(activePage, basePath) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const navItems = [
    { id: 'dashboard',      label: 'Dashboard',      icon: dashboardIcon(),  href: basePath + 'index.html' },
    { id: 'alerts',         label: 'Alerts',          icon: alertsIcon(),    href: basePath + 'pages/alerts.html',  badge: '7' },
    { id: 'network',        label: 'Network',         icon: networkIcon(),   href: basePath + 'pages/network.html' },
    { id: 'investigations', label: 'Investigations',  icon: caseIcon(),      href: basePath + 'pages/investigations.html' },
    { id: 'copilot',        label: 'AI Copilot',      icon: aiIcon(),        href: basePath + 'pages/copilot.html' },
    { id: 'reports',        label: 'Reports',         icon: reportsIcon(),   href: basePath + 'pages/reports.html' },
    { id: 'analytics',      label: 'Analytics',       icon: analyticsIcon(), href: basePath + 'pages/analytics.html' },
    { id: 'settings',       label: 'Settings',        icon: settingsIcon(),  href: basePath + 'pages/settings.html' },
  ];

  let navHTML = navItems.map(item => {
    const activeClass = item.id === activePage ? 'active' : '';
    const badge = item.badge ? `<span class="sidebar-badge">${item.badge}</span>` : '';
    return `
      <a href="${item.href}" class="sidebar-link ${activeClass}" data-page="${item.id}">
        ${item.icon}
        <span>${item.label}</span>
        ${badge}
      </a>
    `;
  }).join('');

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <img src="${basePath}assets/logo.svg" alt="FinGuard Logo" />
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section-label">Investigation</div>
      ${navHTML}
    </nav>
    <div class="sidebar-footer">
      <div class="avatar">SA</div>
      <div class="user-info">
        <div class="user-name">Siddharth A.</div>
        <div class="user-role">Sr. Investigator</div>
      </div>
    </div>
  `;
}

// ─── Sidebar SVG Icons ────────────────────────────────────────
function dashboardIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-4a1 1 0 00-1 1v3H6a1 1 0 100 2h4a1 1 0 001-1V7a1 1 0 00-1-1z"/></svg>`;
}
function alertsIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`;
}
function networkIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="5" r="2"/><circle cx="4" cy="15" r="2"/><circle cx="16" cy="15" r="2"/><line x1="10" y1="7" x2="10" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="10" x2="4" y2="13" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="10" x2="16" y2="13" stroke="currentColor" stroke-width="1.5"/></svg>`;
}
function caseIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>`;
}
function aiIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/></svg>`;
}
function reportsIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/></svg>`;
}
function analyticsIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>`;
}
function settingsIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>`;
}

// ─── Build Topbar HTML ────────────────────────────────────────
/**
 * @param {string} title - Page title
 * @param {boolean} showSearch
 */
function buildTopbar(title, showSearch = false) {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;

  const searchHTML = showSearch ? `
    <div class="topbar-search">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
      <input type="text" placeholder="Search alerts, accounts..." id="topbar-search-input" />
    </div>
  ` : '';

  topbar.innerHTML = `
    <span class="topbar-title">${title}</span>
    <div class="topbar-spacer"></div>
    ${searchHTML}
    <div class="topbar-actions">
      <button class="icon-btn" id="notif-btn" title="Notifications">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a2 2 0 002-2H8a2 2 0 002 2z"/>
        </svg>
        <span class="notif-dot"></span>
      </button>
      <div class="topbar-profile">
        <div class="avatar">SA</div>
        <div>
          <div class="profile-name">Siddharth A.</div>
          <div class="profile-role">Sr. Investigator</div>
        </div>
      </div>
    </div>
  `;

  initNotifButton();
}

// ─── Init on DOM ready ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileSidebar();
});
