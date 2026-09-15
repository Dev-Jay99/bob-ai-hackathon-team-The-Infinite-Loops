/**
 * FinGuard — Account Network JS
 */

(function () {
  const urlParams = new URLSearchParams(window.location.search);
  let currentAccount = urlParams.get('account') || 'A023';
  let currentDepth   = 1;
  let network        = null;

  document.getElementById('account-search-input').value = currentAccount;

  // ── Build vis network ──────────────────────────────────────────
  function buildNetwork(netData) {
    const container = document.getElementById('full-network');
    if (network) { network.destroy(); network = null; }

    if (!netData || !netData.nodes || netData.nodes.length === 0) {
      container.innerHTML = '<div class="state-container"><div class="state-sub">No network data for this account.</div></div>';
      return;
    }

    const nodes = new vis.DataSet(netData.nodes);
    const edges = new vis.DataSet(netData.edges || []);

    network = new vis.Network(container, { nodes, edges }, {
      physics: {
        enabled: true,
        solver: 'forceAtlas2Based',
        stabilization: { iterations: 150, updateInterval: 25 },
        forceAtlas2Based: { gravitationalConstant: -50, springLength: 120 },
      },
      nodes: {
        shape: 'dot', size: 22,
        font: { color: '#CBD5E1', size: 12, face: 'Inter', multi: true },
        borderWidth: 2,
        shadow: { enabled: true, color: 'rgba(0,0,0,0.4)', size: 6 },
      },
      edges: {
        smooth: { type: 'curvedCW', roundness: 0.25 },
        font: { color: '#94A3B8', size: 10, face: 'Inter', align: 'middle' },
        width: 2,
        selectionWidth: 3,
        hoverWidth: 3,
      },
      interaction: { hover: true, tooltipDelay: 200, zoomView: true, dragView: true },
      layout: { randomSeed: 42 },
    });

    network.on('click', function (params) {
      if (params.nodes.length > 0) {
        const nodeId = params.nodes[0];
        loadInspector(nodeId);
      }
    });
  }

  // ── Load network data ──────────────────────────────────────────
  async function loadNetwork(accountId, depth) {
    const container = document.getElementById('full-network');
    container.innerHTML = '<div class="state-container"><div class="spinner"></div><div class="state-sub">Building network…</div></div>';

    const { data, error } = await API.getAccountById(accountId, depth);
    if (error) {
      container.innerHTML = `<div class="state-container"><div class="state-title">Error</div><div class="state-sub">${error}</div></div>`;
      showToast(error, 'error');
      return;
    }

    buildNetwork(data.network || {});
  }

  // ── Inspector ──────────────────────────────────────────────────
  async function loadInspector(accountId) {
    const el = document.getElementById('inspector-content');
    el.innerHTML = '<div class="spinner" style="margin:12px auto;"></div>';

    const { data, error } = await API.getAccountById(accountId);
    if (error) {
      el.innerHTML = `<div class="text-muted text-sm">${error}</div>`;
      return;
    }

    const net = data.network || {};
    const connectedIds = [];
    (net.edges || []).forEach(e => {
      if (e.from === accountId && !connectedIds.includes(e.to)) connectedIds.push(e.to);
      if (e.to === accountId && !connectedIds.includes(e.from)) connectedIds.push(e.from);
    });

    el.innerHTML = `
      <div class="info-row"><span class="info-label">Account ID</span><span class="info-value text-mono">${data.id}</span></div>
      <div class="info-row"><span class="info-label">Customer</span><span class="info-value">${data.customer_name || '—'}</span></div>
      <div class="info-row"><span class="info-label">Risk Level</span><span class="info-value">${UI.riskBadge(data.risk_level)}</span></div>
      <div class="info-row"><span class="info-label">Balance</span><span class="info-value">${UI.formatINR(data.balance)}</span></div>
      <div class="info-row"><span class="info-label">Usual City</span><span class="info-value">${data.usual_city || '—'}</span></div>
      <div class="info-row"><span class="info-label">Usual Device</span><span class="info-value">${data.usual_device || '—'}</span></div>
      <div style="margin-top:12px;">
        <div class="label-sm" style="margin-bottom:6px;">Connected Accounts</div>
        <div id="connected-btns">
          ${connectedIds.length
            ? connectedIds.map(id => `<button class="inspector-account-btn" onclick="inspectConnected('${id}')">${id}</button>`).join('')
            : '<span class="text-muted text-sm">No connections shown</span>'}
        </div>
      </div>
      <div style="margin-top:12px;">
        <a href="alerts.html?search=${accountId}" class="btn btn-secondary btn-sm" style="width:100%;justify-content:center;">View Related Alerts</a>
      </div>
    `;
  }

  window.inspectConnected = function (accountId) {
    currentAccount = accountId;
    document.getElementById('account-search-input').value = accountId;
    loadNetwork(accountId, currentDepth);
    loadInspector(accountId);
  };

  // ── Controls ────────────────────────────────────────────────────
  document.getElementById('account-search-btn').addEventListener('click', () => {
    const val = document.getElementById('account-search-input').value.trim().toUpperCase();
    if (val) {
      currentAccount = val;
      loadNetwork(val, currentDepth);
    }
  });

  document.getElementById('account-search-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('account-search-btn').click();
  });

  document.querySelectorAll('.depth-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.depth-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      currentDepth = parseInt(this.dataset.depth, 10);
      loadNetwork(currentAccount, currentDepth);
    });
  });

  document.getElementById('globalSearch').addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const q = e.target.value.trim();
      if (q) window.location.href = `alerts.html?search=${encodeURIComponent(q)}`;
    }
  });

  // ── Init ────────────────────────────────────────────────────────
  loadNetwork(currentAccount, currentDepth);
})();
