/**
 * FinGuard Account Network Graph Builder — Developer Stub
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  TODO MEMBER 3 — Replace this entire module with the real network   ║
 * ║  analysis engine. See docs/member-3-handoff.md for the contract.    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * Returns vis-network compatible { nodes, edges } for the frontend graph.
 *
 * Node shape:
 *   { id, label, title, color: { background, border }, riskLevel, accountId }
 *
 * Edge shape:
 *   { from, to, label, color: { color }, arrows: 'to' }
 */

const RISK_COLORS = {
  CRITICAL: { background: '#3D1515', border: '#EF4444' },
  HIGH:     { background: '#3D2A0A', border: '#F97316' },
  MEDIUM:   { background: '#3D330A', border: '#EAB308' },
  LOW:      { background: '#0A3D1A', border: '#22C55E' },
  UNKNOWN:  { background: '#1B2638', border: '#263244' },
};

// TODO MEMBER 3 — Replace with real graph traversal from transaction data
function buildAccountNetwork(accountId, depth = 1) {
  const id = (accountId || 'A001').toUpperCase();

  // ── Benchmark network for A023 / A001 ────────────────────────────────────
  if (id === 'A023' || id === 'A001') {
    // TODO MEMBER 3 — This hardcoded benchmark graph must be replaced with
    // a real traversal that reads from the transactions database and builds
    // the network dynamically up to `depth` hops.
    return {
      nodes: [
        {
          id: 'A001', label: 'A001\nVikram Mehta', title: 'Vikram Mehta · LOW risk · Origin account',
          color: RISK_COLORS.LOW, riskLevel: 'LOW', accountId: 'A001',
        },
        {
          id: 'A023', label: 'A023\nFarhan Qureshi', title: 'Farhan Qureshi · CRITICAL risk · Pass-through hub',
          color: RISK_COLORS.CRITICAL, riskLevel: 'CRITICAL', accountId: 'A023',
        },
        {
          id: 'A051', label: 'A051\nMeera Nair', title: 'Meera Nair · HIGH risk · Connected to A023',
          color: RISK_COLORS.HIGH, riskLevel: 'HIGH', accountId: 'A051',
        },
        {
          id: 'A072', label: 'A072\nRohan Kapoor', title: 'Rohan Kapoor · HIGH risk · Connected to A023',
          color: RISK_COLORS.HIGH, riskLevel: 'HIGH', accountId: 'A072',
        },
      ],
      edges: [
        { from: 'A001', to: 'A023', label: '₹42K / ₹75K', color: { color: '#EF4444' }, arrows: 'to' },
        { from: 'A001', to: 'A051', label: '₹55K',        color: { color: '#F97316' }, arrows: 'to' },
        { from: 'A023', to: 'A051', label: '₹38K / ₹52K', color: { color: '#F97316' }, arrows: 'to' },
        { from: 'A023', to: 'A072', label: '₹29K',        color: { color: '#F97316' }, arrows: 'to' },
        { from: 'A051', to: 'A072', label: '₹21K',        color: { color: '#EAB308' }, arrows: 'to' },
      ],
    };
  }

  // ── Generic stub for any other account ────────────────────────────────────
  // TODO MEMBER 3 — Replace with real database-driven traversal.
  // For now returns a minimal single-node graph as a safe placeholder.
  return {
    nodes: [
      {
        id,
        label: id,
        title: `${id} · Account network pending analysis`,
        color: RISK_COLORS.UNKNOWN,
        riskLevel: 'UNKNOWN',
        accountId: id,
      },
    ],
    edges: [],
  };
}

module.exports = { buildAccountNetwork };
