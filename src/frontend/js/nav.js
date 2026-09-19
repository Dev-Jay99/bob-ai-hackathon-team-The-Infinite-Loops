/**
 * FinGuard — Navigation helper
 * Marks the active sidebar item based on the current page.
 * Also provides shared toast notification utility.
 */

(function () {
  // ── Active nav item ──────────────────────────────────────────
  const path = window.location.pathname;

  document.querySelectorAll('.nav-item').forEach(link => {
    const href = link.getAttribute('href') || '';
    // Strip query string before comparing so alert-details.html?id=X still matches
    const page = href.split('/').pop().split('?')[0].replace('.html', '');
    const currentPage = path.split('/').pop().split('?')[0].replace('.html', '');

    if (
      (page === currentPage) ||
      (page === 'dashboard' && (currentPage === '' || currentPage === 'index'))
    ) {
      link.classList.add('active');
    }
  });

  // ── Toast system ──────────────────────────────────────────────
  function showToast(message, type = 'info', duration = 3500) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  window.showToast = showToast;

  // ── Risk badge helper ─────────────────────────────────────────
  function riskBadge(level, large = false) {
    const cls = `badge badge-${(level || 'low').toLowerCase()}${large ? ' badge-lg' : ''}`;
    return `<span class="${cls}">${(level || 'LOW').toUpperCase()}</span>`;
  }

  function statusBadge(status) {
    const s = (status || 'open').toLowerCase().replace(/[\s-]/g, '_');
    const label = (status || 'OPEN').replace(/_/g, ' ').toUpperCase();
    return `<span class="badge badge-${s}">${label}</span>`;
  }

  function verificationBadge(status) {
    const s = (status || 'not_required').toLowerCase();
    const map = {
      confirmed: 'CONFIRMED',
      denied: 'DENIED',
      pending: 'PENDING',
      not_required: 'NOT REQUIRED',
    };
    const label = map[s] || (status || 'NOT REQUIRED').toUpperCase();
    return `<span class="badge badge-${s}">${label}</span>`;
  }

  function formatINR(amount) {
    if (amount == null) return '—';
    return '₹' + Number(amount).toLocaleString('en-IN');
  }

  function formatDate(ts) {
    if (!ts) return '—';
    return new Date(ts).toLocaleString('en-IN', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: false,
    });
  }

  window.UI = { riskBadge, statusBadge, verificationBadge, formatINR, formatDate };
})();
