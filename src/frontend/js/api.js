/**
 * FinGuard — Frontend API Client
 * All HTTP calls to the backend go through this module only.
 * The frontend never connects directly to the database.
 */

const BASE_URL = window.location.origin;

async function apiFetch(path, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
      ...options,
    });
    const data = await res.json();
    if (!res.ok) {
      return { data: null, error: data.error || `HTTP ${res.status}` };
    }
    return { data, error: null };
  } catch (err) {
    return { data: null, error: 'Network error — is the server running?' };
  }
}

// ─── Alerts ──────────────────────────────────────────────────────────────────
async function getAlerts(params = {}) {
  const qs = new URLSearchParams();
  if (params.page)      qs.set('page',      params.page);
  if (params.limit)     qs.set('limit',     params.limit);
  if (params.search)    qs.set('search',    params.search);
  if (params.riskLevel) qs.set('riskLevel', params.riskLevel);
  if (params.status)    qs.set('status',    params.status);
  if (params.location)  qs.set('location',  params.location);
  return apiFetch(`/api/alerts?${qs}`);
}

async function getAlertStats() {
  return apiFetch('/api/alerts/stats');
}

async function getAlertById(id) {
  return apiFetch(`/api/alerts/${encodeURIComponent(id)}`);
}

// ─── Accounts ────────────────────────────────────────────────────────────────
async function getAccountById(id, depth = 1) {
  return apiFetch(`/api/accounts/${encodeURIComponent(id)}?depth=${depth}`);
}

async function getAccountTransactions(id, params = {}) {
  const qs = new URLSearchParams();
  if (params.page)  qs.set('page',  params.page);
  if (params.limit) qs.set('limit', params.limit);
  return apiFetch(`/api/accounts/${encodeURIComponent(id)}/transactions?${qs}`);
}

// ─── Investigations ───────────────────────────────────────────────────────────
async function getInvestigations(status = '') {
  const qs = status ? `?status=${encodeURIComponent(status)}` : '';
  return apiFetch(`/api/investigations${qs}`);
}

async function postInvestigationAction(alertId, action, notes = '') {
  return apiFetch(`/api/investigations/${encodeURIComponent(alertId)}/${action}`, {
    method: 'POST',
    body: JSON.stringify({ notes }),
  });
}

// ─── Copilot ─────────────────────────────────────────────────────────────────
async function postCopilotChat(caseContext, message) {
  return apiFetch('/api/copilot/chat', {
    method: 'POST',
    body: JSON.stringify({ caseContext, message }),
  });
}

async function postCopilotBrief(caseContext) {
  return apiFetch('/api/copilot/brief', {
    method: 'POST',
    body: JSON.stringify({ caseContext }),
  });
}

// ─── Export ───────────────────────────────────────────────────────────────────
window.API = {
  getAlerts,
  getAlertStats,
  getAlertById,
  getAccountById,
  getAccountTransactions,
  getInvestigations,
  postInvestigationAction,
  postCopilotChat,
  postCopilotBrief,
};
