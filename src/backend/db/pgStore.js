/**
 * PostgreSQL Store — used when DATABASE_URL is set in environment.
 * All queries are parameterized to prevent SQL injection.
 */
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function queryAlerts({ page = 1, limit = 20, search = '', riskLevel = '', status = '', location = '' } = {}) {
  const conditions = [];
  const params = [];
  let idx = 1;

  if (search) {
    conditions.push(`(a.id ILIKE $${idx} OR ac.customer_name ILIKE $${idx} OR a.account_id ILIKE $${idx})`);
    params.push(`%${search}%`);
    idx++;
  }
  if (riskLevel) { conditions.push(`a.risk_level = $${idx}`); params.push(riskLevel.toUpperCase()); idx++; }
  if (status)    { conditions.push(`a.status = $${idx}`);     params.push(status.toUpperCase());    idx++; }
  if (location)  { conditions.push(`t.location ILIKE $${idx}`); params.push(`%${location}%`);       idx++; }

  const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';
  const offset = (page - 1) * limit;

  const countSql = `
    SELECT COUNT(*) FROM alerts a
    LEFT JOIN accounts ac ON ac.id = a.account_id
    LEFT JOIN transactions t ON t.id = a.transaction_id
    ${where}
  `;
  const dataSql = `
    SELECT a.*, ac.customer_name, t.location, t.amount
    FROM alerts a
    LEFT JOIN accounts ac ON ac.id = a.account_id
    LEFT JOIN transactions t ON t.id = a.transaction_id
    ${where}
    ORDER BY a.created_at DESC
    LIMIT $${idx} OFFSET $${idx + 1}
  `;

  const [countResult, dataResult] = await Promise.all([
    pool.query(countSql, params),
    pool.query(dataSql, [...params, limit, offset]),
  ]);

  const total = parseInt(countResult.rows[0].count, 10);
  return {
    data: dataResult.rows,
    pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) },
  };
}

async function queryAlertStats() {
  const [totals, pending] = await Promise.all([
    pool.query(`SELECT risk_level, COUNT(*) as count FROM alerts GROUP BY risk_level`),
    pool.query(`SELECT COUNT(*) as count FROM investigations WHERE status IN ('OPEN','ESCALATED')`),
  ]);

  const byLevel = {};
  totals.rows.forEach(r => { byLevel[r.risk_level] = parseInt(r.count, 10); });

  return {
    totalAlerts: Object.values(byLevel).reduce((s, v) => s + v, 0),
    criticalAlerts: byLevel.CRITICAL || 0,
    highRiskAlerts: byLevel.HIGH || 0,
    pendingInvestigations: parseInt(pending.rows[0].count, 10),
    byRiskLevel: {
      CRITICAL: byLevel.CRITICAL || 0,
      HIGH: byLevel.HIGH || 0,
      MEDIUM: byLevel.MEDIUM || 0,
      LOW: byLevel.LOW || 0,
    },
    hourlyTrend: [],
  };
}

async function queryAlertById(id) {
  const alertRow = await pool.query('SELECT * FROM alerts WHERE id = $1', [id]);
  if (!alertRow.rows.length) return null;

  const alert = alertRow.rows[0];
  const [txn, acc, factors, inv] = await Promise.all([
    pool.query('SELECT * FROM transactions WHERE id = $1', [alert.transaction_id]),
    pool.query('SELECT * FROM accounts WHERE id = $1', [alert.account_id]),
    pool.query('SELECT * FROM risk_factors WHERE alert_id = $1', [id]),
    pool.query('SELECT * FROM investigations WHERE alert_id = $1', [id]),
  ]);

  const transaction = txn.rows[0] || null;
  const alertTime = transaction ? new Date(transaction.timestamp).getTime() : null;

  const [recent, seq] = await Promise.all([
    pool.query(
      `SELECT * FROM transactions WHERE sender_id=$1 OR receiver_id=$1 ORDER BY timestamp DESC LIMIT 10`,
      [alert.account_id]
    ),
    alertTime ? pool.query(
      `SELECT * FROM transactions WHERE sender_id=$1 AND ABS(EXTRACT(EPOCH FROM (timestamp - $2::timestamptz))) <= 600 ORDER BY timestamp ASC`,
      [alert.account_id, transaction.timestamp]
    ) : Promise.resolve({ rows: [] }),
  ]);

  return {
    alert,
    transaction,
    account: acc.rows[0] || null,
    riskFactors: factors.rows,
    recentTransactions: recent.rows,
    precedingSequence: seq.rows,
    investigation: inv.rows[0] || null,
  };
}

async function queryAccountById(id) {
  const result = await pool.query('SELECT * FROM accounts WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function queryAccountTransactions(id, { page = 1, limit = 20 } = {}) {
  const offset = (page - 1) * limit;
  const [count, data] = await Promise.all([
    pool.query('SELECT COUNT(*) FROM transactions WHERE sender_id=$1 OR receiver_id=$1', [id]),
    pool.query(
      'SELECT * FROM transactions WHERE sender_id=$1 OR receiver_id=$1 ORDER BY timestamp DESC LIMIT $2 OFFSET $3',
      [id, limit, offset]
    ),
  ]);
  const total = parseInt(count.rows[0].count, 10);
  return { data: data.rows, pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / limit) } };
}

async function queryInvestigations({ status = '' } = {}) {
  const where = status ? `WHERE i.status = $1` : '';
  const params = status ? [status.toUpperCase()] : [];
  const result = await pool.query(
    `SELECT i.*, a.risk_level, a.risk_score FROM investigations i
     LEFT JOIN alerts a ON a.id = i.alert_id
     ${where} ORDER BY i.updated_at DESC`,
    params
  );
  return result.rows;
}

async function updateInvestigationStatus(alertId, newStatus, notes) {
  const existing = await pool.query('SELECT * FROM investigations WHERE alert_id = $1', [alertId]);
  if (existing.rows.length === 0) {
    const result = await pool.query(
      `INSERT INTO investigations (id, alert_id, status, decision, notes, created_at, updated_at)
       VALUES ($1,$2,$3,$4,$5,NOW(),NOW()) RETURNING *`,
      [`INV-${alertId}`, alertId, newStatus, newStatus, notes || '']
    );
    return result.rows[0];
  }
  const result = await pool.query(
    `UPDATE investigations SET status=$1, decision=$2, notes=COALESCE($3,notes), updated_at=NOW()
     WHERE alert_id=$4 RETURNING *`,
    [newStatus, newStatus, notes || null, alertId]
  );
  return result.rows[0];
}

module.exports = {
  queryAlerts,
  queryAlertStats,
  queryAlertById,
  queryAccountById,
  queryAccountTransactions,
  queryInvestigations,
  updateInvestigationStatus,
};
