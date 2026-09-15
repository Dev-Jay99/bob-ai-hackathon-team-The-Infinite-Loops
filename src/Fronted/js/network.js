/* ============================================================
   FinGuard — network.js
   Network visualization: SVG graph, nodes, edges, interactions
   ============================================================ */

// ─── Network Data ─────────────────────────────────────────────
// Future: replace with GET /api/accounts/{account_id}/network

const NETWORK_DATA = {
  central: {
    id: 'ACC-8821', name: 'Rajesh K.', initials: 'RK',
    risk: 'critical', label: 'Subject Account'
  },
  nodes: [
    { id: 'ACC-4421', name: 'Bharat T.',   initials: 'BT', risk: 'critical', relation: 'Requires review',        amount: 42000,  txCount: 1, distance: 1 },
    { id: 'ACC-5532', name: 'Meena P.',    initials: 'MP', risk: 'high',     relation: 'Suspicious relationship', amount: 55000,  txCount: 1, distance: 1 },
    { id: 'ACC-7743', name: 'Vikram R.',   initials: 'VR', risk: 'critical', relation: 'Requires review',         amount: 75000,  txCount: 1, distance: 1 },
    { id: 'ACC-8812', name: 'Sunita C.',   initials: 'SC', risk: 'medium',   relation: 'Transaction connection',  amount: 12000,  txCount: 3, distance: 1 },
    { id: 'ACC-3301', name: 'Employer',    initials: 'EM', risk: 'low',      relation: 'Salary credit',           amount: 38000,  txCount: 12,distance: 1 },
    { id: 'ACC-9921', name: 'Raju D.',     initials: 'RD', risk: 'high',     relation: 'Requires review',         amount: 30000,  txCount: 2, distance: 2 },
    { id: 'ACC-2211', name: 'Anita S.',    initials: 'AS', risk: 'medium',   relation: 'Transaction connection',  amount: 18000,  txCount: 2, distance: 2 },
  ]
};

// ─── Color Map ────────────────────────────────────────────────
const RISK_COLORS = {
  critical: '#ef4444',
  high:     '#f97316',
  medium:   '#f59e0b',
  low:      '#22c55e',
  center:   '#3b82f6'
};

// ─── Layout Positions (calculated for SVG canvas 800×500) ─────
function computeLayout(width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const r1 = Math.min(width, height) * 0.28;  // 1st ring
  const r2 = Math.min(width, height) * 0.44;  // 2nd ring

  const ring1 = NETWORK_DATA.nodes.filter(n => n.distance === 1);
  const ring2 = NETWORK_DATA.nodes.filter(n => n.distance === 2);

  const positions = {};
  positions['ACC-8821'] = { x: cx, y: cy };

  ring1.forEach((n, i) => {
    const angle = (2 * Math.PI * i / ring1.length) - Math.PI / 2;
    positions[n.id] = {
      x: cx + r1 * Math.cos(angle),
      y: cy + r1 * Math.sin(angle)
    };
  });

  ring2.forEach((n, i) => {
    const angle = (2 * Math.PI * i / ring2.length) - Math.PI / 4;
    positions[n.id] = {
      x: cx + r2 * Math.cos(angle),
      y: cy + r2 * Math.sin(angle)
    };
  });

  return positions;
}

// ─── Render SVG Network ───────────────────────────────────────
function renderNetwork() {
  const container = document.getElementById('network-svg-container');
  if (!container) return;

  const W = container.clientWidth || 780;
  const H = 480;
  const positions = computeLayout(W, H);

  let edgeSVG = '';
  let nodeSVG = '';
  let labelSVG = '';

  // Draw edges from center
  NETWORK_DATA.nodes.forEach(node => {
    const from = positions['ACC-8821'];
    const to   = positions[node.id];
    if (!from || !to) return;

    // Arrow direction
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    const ux = dx / len, uy = dy / len;
    const r = 22;

    const x1 = from.x + ux * r;
    const y1 = from.y + uy * r;
    const x2 = to.x - ux * r;
    const y2 = to.y - uy * r;

    // Shade by risk
    const col = RISK_COLORS[node.risk] || '#3b82f6';
    const opacity = node.distance === 1 ? 0.5 : 0.25;

    // Draw only money-flow edges (distance 1 critical/high = suspicious)
    if (node.risk === 'critical' || node.risk === 'high') {
      // Dashed line for suspicious
      edgeSVG += `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="${col}" stroke-width="1.5" stroke-dasharray="5,4" opacity="${opacity}"
              marker-end="url(#arrow-${node.risk})"/>
      `;
    } else {
      edgeSVG += `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="#2a3347" stroke-width="1" opacity="0.6"/>
      `;
    }

    // Amount label on edge (only distance 1)
    if (node.distance === 1 && node.amount > 0) {
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      edgeSVG += `
        <text x="${mx}" y="${my - 6}" text-anchor="middle"
              font-size="10" fill="${col}" font-family="-apple-system,sans-serif" opacity="0.9">
          ₹${(node.amount/1000).toFixed(0)}K
        </text>
      `;
    }
  });

  // Also draw ring2 to their nearest ring1 neighbor (simplified)
  const ring2Edges = [
    { from: 'ACC-9921', to: 'ACC-4421' },
    { from: 'ACC-2211', to: 'ACC-5532' },
  ];

  ring2Edges.forEach(e => {
    const from = positions[e.from];
    const to   = positions[e.to];
    if (!from || !to) return;
    edgeSVG += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#2a3347" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>`;
  });

  // Draw nodes
  const allNodes = [
    { ...NETWORK_DATA.central, distance: 0, isCenter: true },
    ...NETWORK_DATA.nodes
  ];

  allNodes.forEach(node => {
    const pos = positions[node.id];
    if (!pos) return;

    const color = node.isCenter ? RISK_COLORS.center : RISK_COLORS[node.risk];
    const r = node.isCenter ? 26 : 20;
    const strokeW = node.isCenter ? 2.5 : 1.5;

    nodeSVG += `
      <g class="network-node" data-id="${node.id}" onclick="selectNetworkNode('${node.id}')"
         style="cursor:pointer;">
        <circle cx="${pos.x}" cy="${pos.y}" r="${r + 6}" fill="${color}" opacity="0.06"/>
        <circle cx="${pos.x}" cy="${pos.y}" r="${r}"
                fill="${color}" fill-opacity="0.18"
                stroke="${color}" stroke-width="${strokeW}"/>
        <text x="${pos.x}" y="${pos.y + 1}" text-anchor="middle" dominant-baseline="middle"
              font-size="${node.isCenter ? 11 : 9}" font-weight="700"
              fill="#e6edf3" font-family="-apple-system,sans-serif">${node.initials}</text>
      </g>
    `;

    // Label below node
    const labelY = pos.y + r + 14;
    labelSVG += `
      <text x="${pos.x}" y="${labelY}" text-anchor="middle"
            font-size="10" fill="#8b99b0" font-family="-apple-system,sans-serif"
            pointer-events="none">${node.name}</text>
    `;
    if (node.isCenter) {
      labelSVG += `
        <text x="${pos.x}" y="${labelY + 12}" text-anchor="middle"
              font-size="9" fill="#3b82f6" font-family="-apple-system,sans-serif"
              pointer-events="none">Subject</text>
      `;
    }
  });

  // Arrow markers
  const markerDefs = ['critical','high','medium'].map(risk => `
    <marker id="arrow-${risk}" markerWidth="8" markerHeight="8"
            refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 Z" fill="${RISK_COLORS[risk]}" opacity="0.7"/>
    </marker>
  `).join('');

  container.innerHTML = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" id="network-svg"
         style="display:block;background:var(--bg-surface);border-radius:var(--radius);">
      <defs>${markerDefs}</defs>
      ${edgeSVG}
      ${nodeSVG}
      ${labelSVG}
    </svg>
  `;
}

// ─── Node Selection ───────────────────────────────────────────
let selectedNode = null;

function selectNetworkNode(nodeId) {
  selectedNode = nodeId;

  const node = nodeId === 'ACC-8821'
    ? { ...NETWORK_DATA.central, relation: 'Subject Account', amount: 172000, txCount: 3 }
    : NETWORK_DATA.nodes.find(n => n.id === nodeId);

  if (!node) return;

  const panel = document.getElementById('node-detail-panel');
  if (!panel) return;

  const riskBadge = updateRiskBadge(node.risk?.toUpperCase() || 'MEDIUM');

  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
      <div style="width:44px;height:44px;border-radius:50%;background:${RISK_COLORS[node.risk||'low']};
                  opacity:0.8;display:flex;align-items:center;justify-content:center;
                  font-size:14px;font-weight:800;color:#fff;">${node.initials}</div>
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--text-primary);">${node.name}</div>
        <div style="font-size:11px;color:var(--text-muted);">${node.id}</div>
      </div>
      <div style="margin-left:auto;">${riskBadge}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;">
      <div style="display:flex;justify-content:space-between;">
        <span style="color:var(--text-muted);">Relationship</span>
        <span style="color:var(--text-primary);font-weight:600;">${node.relation || '—'}</span>
      </div>
      ${node.amount ? `
      <div style="display:flex;justify-content:space-between;">
        <span style="color:var(--text-muted);">Amount Transferred</span>
        <span style="color:var(--risk-critical);font-weight:700;">${formatINR(node.amount)}</span>
      </div>` : ''}
      ${node.txCount ? `
      <div style="display:flex;justify-content:space-between;">
        <span style="color:var(--text-muted);">Connected Transactions</span>
        <span style="font-weight:600;">${node.txCount}</span>
      </div>` : ''}
      <div style="display:flex;justify-content:space-between;">
        <span style="color:var(--text-muted);">Risk Level</span>
        <span>${riskBadge}</span>
      </div>
    </div>
    <div style="margin-top:10px;padding:8px 10px;background:var(--bg-surface);border-radius:6px;
                border-left:3px solid ${RISK_COLORS[node.risk||'low']};font-size:12px;color:var(--text-secondary);">
      ⚠ This is a transaction connection. Investigator review required before any conclusion.
    </div>
    <button class="btn btn-primary btn-sm" style="margin-top:10px;width:100%;"
            onclick="showToast('Opening investigation for ${node.id}', 'info')">
      Investigate Account
    </button>
  `;

  // Highlight selected node in SVG
  document.querySelectorAll('.network-node circle').forEach(c => {
    c.style.filter = '';
  });

  const svgNode = document.querySelector(`.network-node[data-id="${nodeId}"] circle:nth-of-type(2)`);
  if (svgNode) svgNode.style.filter = 'brightness(1.4)';
}

// ─── Filter Network by Risk ───────────────────────────────────
function filterNetwork(risk) {
  const buttons = document.querySelectorAll('.network-filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.network-filter-btn[data-risk="${risk}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (risk === 'all') {
    renderNetworkNodeList(NETWORK_DATA.nodes);
  } else {
    renderNetworkNodeList(NETWORK_DATA.nodes.filter(n => n.risk === risk));
  }
}

function renderNetworkNodeList(nodes) {
  const list = document.getElementById('network-node-list');
  if (!list) return;

  list.innerHTML = [
    { ...NETWORK_DATA.central, relation: 'Subject Account (Center)', distance: 0 },
    ...nodes
  ].map(node => `
    <div class="network-node-row" onclick="selectNetworkNode('${node.id}')"
         style="${node.id === selectedNode ? 'border-color:var(--accent);background:rgba(59,130,246,0.06);' : ''}">
      <span class="node-dot ${node.risk || 'center'}"></span>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${node.name}</div>
        <div style="font-size:11px;color:var(--text-muted);">${node.id}</div>
      </div>
      <span style="font-size:11px;color:var(--text-muted);">${node.relation || 'Subject'}</span>
      <span class="node-arrow">›</span>
    </div>
  `).join('');
}

// ─── Init Network Page ────────────────────────────────────────
function initNetworkPage() {
  buildSidebar('network', '../');
  buildTopbar('Account Network', false);

  renderNetwork();
  renderNetworkNodeList(NETWORK_DATA.nodes);

  // Select central node by default
  setTimeout(() => selectNetworkNode('ACC-8821'), 100);

  // Filter buttons
  document.querySelectorAll('.network-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterNetwork(btn.dataset.risk));
  });

  // Resize
  window.addEventListener('resize', () => {
    renderNetwork();
  });
}

document.addEventListener('DOMContentLoaded', initNetworkPage);
