/**
 * FinGuard Account Network Graph Builder
 *
 * Builds a vis-network compatible { nodes, edges } graph by traversing
 * the real transaction data up to `depth` hops from the given account.
 *
 * Node shape:
 *   { id, label, title, color: { background, border }, riskLevel, accountId }
 *
 * Edge shape:
 *   { from, to, label, color: { color }, arrows: 'to' }
 */

'use strict';

const fs   = require('fs');
const path = require('path');

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(__dirname, '../../', process.env.DATA_DIR)
  : path.resolve(__dirname, '../../data');

// ── Risk colour palette (keep in sync with frontend CSS) ─────────────────────
const RISK_COLORS = {
  CRITICAL: { background: '#3D1515', border: '#EF4444' },
  HIGH:     { background: '#3D2A0A', border: '#F97316' },
  MEDIUM:   { background: '#3D330A', border: '#EAB308' },
  LOW:      { background: '#0A3D1A', border: '#22C55E' },
  UNKNOWN:  { background: '#1B2638', border: '#263244' },
};

// ── Data helpers ──────────────────────────────────────────────────────────────

let _txnCache  = null;
let _acctCache = null;

function getTransactions() {
  if (!_txnCache) {
    const f = path.join(DATA_DIR, 'transactions.json');
    _txnCache = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
  }
  return _txnCache;
}

function getAccounts() {
  if (!_acctCache) {
    const f = path.join(DATA_DIR, 'accounts.json');
    _acctCache = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
  }
  return _acctCache;
}

// ── Node builder ──────────────────────────────────────────────────────────────

function makeNode(accountId, accountsMap) {
  const acc       = accountsMap.get(accountId);
  const riskLevel = acc ? (acc.risk_level || 'UNKNOWN').toUpperCase() : 'UNKNOWN';
  const name      = acc ? acc.customer_name : accountId;
  const city      = acc ? ` · ${acc.usual_city}` : '';
  const balance   = acc ? ` · Bal ₹${Number(acc.balance || 0).toLocaleString('en-IN')}` : '';

  return {
    id:        accountId,
    label:     `${accountId}\n${name}`,
    title:     `${name}${city}${balance} · ${riskLevel} risk`,
    color:     RISK_COLORS[riskLevel] || RISK_COLORS.UNKNOWN,
    riskLevel,
    accountId,
  };
}

// ── Edge aggregation ──────────────────────────────────────────────────────────

/**
 * Given all transactions that connect fromId → toId, build one representative
 * edge showing total volume and number of transfers.
 */
function makeEdge(fromId, toId, txns) {
  const total   = txns.reduce((s, t) => s + (t.amount || 0), 0);
  const count   = txns.length;

  // Colour the edge based on whether any transaction is suspicious
  const hasSuspicious = txns.some(t => t.is_suspicious);
  const edgeColor = hasSuspicious ? '#EF4444' : '#F97316';

  const label = count > 1
    ? `₹${formatK(total)} (${count}×)`
    : `₹${formatK(total)}`;

  return {
    from:   fromId,
    to:     toId,
    label,
    color:  { color: edgeColor },
    arrows: 'to',
  };
}

function formatK(amount) {
  if (amount >= 100000) return `${(amount / 100000).toFixed(1)}L`;
  if (amount >= 1000)   return `${(amount / 1000).toFixed(0)}K`;
  return String(amount);
}

// ── BFS traversal ─────────────────────────────────────────────────────────────

/**
 * BFS up to `maxDepth` hops. Collects all account IDs reachable from
 * `rootId` via outbound or inbound transactions.
 *
 * Returns a Map<edgeKey, aggregatedEdge> and Set<accountId> of visited nodes.
 */
function traverse(rootId, maxDepth, transactions, maxNodes = 30) {
  const visited   = new Set([rootId]);
  const edgeMap   = new Map(); // "FROM→TO" → [txn, ...]
  const queue     = [{ id: rootId, depth: 0 }];

  while (queue.length > 0 && visited.size < maxNodes) {
    const { id, depth } = queue.shift();
    if (depth >= maxDepth) continue;

    // Find all transactions where this account is sender or receiver
    const related = transactions.filter(t => t.sender_id === id || t.receiver_id === id);

    for (const txn of related) {
      const fromId = txn.sender_id;
      const toId   = txn.receiver_id;
      const peerId = fromId === id ? toId : fromId;

      // Accumulate edge data (directed: always sender→receiver)
      const edgeKey = `${fromId}→${toId}`;
      if (!edgeMap.has(edgeKey)) edgeMap.set(edgeKey, []);
      edgeMap.get(edgeKey).push(txn);

      if (!visited.has(peerId) && visited.size < maxNodes) {
        visited.add(peerId);
        queue.push({ id: peerId, depth: depth + 1 });
      }
    }
  }

  return { visited, edgeMap };
}

// ── Main export ───────────────────────────────────────────────────────────────

function buildAccountNetwork(accountId, depth = 1) {
  const id           = (accountId || 'UNKNOWN').toUpperCase();
  const transactions = getTransactions();
  const accountsArr  = getAccounts();

  // Build a fast lookup map
  const accountsMap  = new Map(accountsArr.map(a => [a.id, a]));

  // BFS traversal
  const { visited, edgeMap } = traverse(id, Math.min(depth, 3), transactions);

  // Build nodes
  const nodes = [...visited].map(aid => makeNode(aid, accountsMap));

  // Build edges — only include edges where both endpoints are in our visited set
  const edges = [];
  for (const [key, txns] of edgeMap.entries()) {
    const [fromId, toId] = key.split('→');
    if (visited.has(fromId) && visited.has(toId)) {
      edges.push(makeEdge(fromId, toId, txns));
    }
  }

  // Ensure at minimum the root node exists even if no transactions found
  if (nodes.length === 0) {
    nodes.push(makeNode(id, accountsMap));
  }

  return { nodes, edges };
}

module.exports = { buildAccountNetwork };
