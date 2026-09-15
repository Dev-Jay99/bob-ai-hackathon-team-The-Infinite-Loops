/**
 * FinGuard Risk Engine
 *
 * Computes a 0–100 risk score for any alert using six evidence factors derived
 * directly from the transaction, account, and surrounding transaction history.
 *
 * Factor weights (must sum to 100):
 *   Amount Anomaly    20
 *   Location Anomaly  18
 *   Device Anomaly    15
 *   Time Anomaly      12
 *   Velocity Anomaly  20
 *   Network Anomaly   15
 *
 * Return shape (do NOT change — frontend depends on this):
 * {
 *   totalScore : number,          // 0–100 integer
 *   maxScore   : 100,
 *   riskLevel  : string,          // CRITICAL | HIGH | MEDIUM | LOW
 *   factors    : [{ name, score, maxScore, explanation }]
 * }
 */

'use strict';

const path = require('path');
const fs   = require('fs');

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(__dirname, '../../', process.env.DATA_DIR)
  : path.resolve(__dirname, '../../data');

// ── Data helpers ─────────────────────────────────────────────────────────────

let _txnCache = null;
function getTransactions() {
  if (!_txnCache) {
    const f = path.join(DATA_DIR, 'transactions.json');
    _txnCache = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
  }
  return _txnCache;
}

let _acctCache = null;
function getAccounts() {
  if (!_acctCache) {
    const f = path.join(DATA_DIR, 'accounts.json');
    _acctCache = fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : [];
  }
  return _acctCache;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function riskLevelFromScore(score) {
  if (score >= 80) return 'CRITICAL';
  if (score >= 60) return 'HIGH';
  if (score >= 35) return 'MEDIUM';
  return 'LOW';
}

/** Clamp a score to [0, max] and round to integer. */
function clamp(val, max) {
  return Math.min(max, Math.max(0, Math.round(val)));
}

/** Hour-of-day in IST (UTC+5:30) — the timezone for this application. */
function hourOfDay(isoTimestamp) {
  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const d = new Date(new Date(isoTimestamp).getTime() + IST_OFFSET_MS);
  return d.getUTCHours();
}

// ── Factor scorers ────────────────────────────────────────────────────────────

/**
 * 1. Amount Anomaly (max 20)
 * Scores how far the transaction deviates from the customer's avg and max.
 */
function scoreAmount(txn, account) {
  const MAX = 20;
  if (!txn || !account) return { score: 0, explanation: 'Transaction or account data unavailable.' };

  const amount = txn.amount || 0;
  const avg    = account.avg_txn_amount || 1;
  const max    = account.max_txn_amount || avg;

  const vsAvg = amount / avg;   // ratio to average
  const vsMax = amount / max;   // ratio to historical maximum

  let score = 0;
  let notes = [];

  // Above-average multiplier (0–12 pts)
  if (vsAvg > 20)     { score += 12; notes.push(`${vsAvg.toFixed(0)}× above average`); }
  else if (vsAvg > 10){ score += 10; notes.push(`${vsAvg.toFixed(1)}× above average`); }
  else if (vsAvg > 5) { score += 7;  notes.push(`${vsAvg.toFixed(1)}× above average`); }
  else if (vsAvg > 2) { score += 4;  notes.push(`${vsAvg.toFixed(1)}× above average`); }
  else if (vsAvg > 1) { score += 1;  notes.push(`${vsAvg.toFixed(1)}× above average`); }

  // Exceeds historical maximum (0–8 pts)
  if (vsMax > 5)      { score += 8;  notes.push(`${vsMax.toFixed(1)}× above max`); }
  else if (vsMax > 2) { score += 5;  notes.push(`${vsMax.toFixed(1)}× above max`); }
  else if (vsMax > 1) { score += 3;  notes.push('exceeds historical max'); }

  score = clamp(score, MAX);
  const explanation = score === 0
    ? `Transaction of ₹${amount.toLocaleString('en-IN')} is within normal spend range (avg ₹${avg.toLocaleString('en-IN')}).`
    : `Transaction of ₹${amount.toLocaleString('en-IN')} is ${notes.join(', ')} (avg ₹${avg.toLocaleString('en-IN')}, max ₹${max.toLocaleString('en-IN')}).`;

  return { score, explanation };
}

/**
 * 2. Location Anomaly (max 18)
 * Compares transaction city to customer's registered usual city.
 */
function scoreLocation(txn, account) {
  const MAX = 18;
  if (!txn || !account) return { score: 0, explanation: 'Location data unavailable.' };

  const txnCity  = (txn.location || '').trim().toLowerCase();
  const usualCity = (account.usual_city || '').trim().toLowerCase();

  if (!txnCity || !usualCity) {
    return { score: 5, explanation: 'Transaction location or registered city is missing.' };
  }

  if (txnCity === usualCity) {
    return { score: 0, explanation: `Transaction in ${account.usual_city} matches customer's registered city.` };
  }

  // Different city — check if account itself is high-risk (amplifies score)
  const acctRisk = (account.risk_level || '').toUpperCase();
  const base = acctRisk === 'CRITICAL' ? 18 : acctRisk === 'HIGH' ? 15 : 12;

  return {
    score: clamp(base, MAX),
    explanation: `Transaction in ${txn.location} differs from registered city ${account.usual_city}.`,
  };
}

/**
 * 3. Device Anomaly (max 15)
 * Checks whether the transaction device matches the customer's usual device.
 */
function scoreDevice(txn, account) {
  const MAX = 15;
  if (!txn || !account) return { score: 0, explanation: 'Device data unavailable.' };

  const txnDevice    = (txn.device || '').toLowerCase();
  const usualDevice  = (account.usual_device || '').toLowerCase();

  if (!txnDevice) {
    return { score: 5, explanation: 'Transaction device information is missing.' };
  }

  // "Unrecognized" keyword is an explicit flag from the data generator
  const isUnrecognized = txnDevice.includes('unrecognized');

  // Brand-level mismatch (Samsung vs iPhone, etc.)
  const txnBrand    = txnDevice.split(' ')[0];
  const usualBrand  = usualDevice.split(' ')[0];
  const brandMismatch = txnBrand && usualBrand && txnBrand !== usualBrand;

  if (isUnrecognized && brandMismatch) {
    return {
      score: MAX,
      explanation: `Transaction from unrecognized ${txn.device}; usual device is ${account.usual_device}.`,
    };
  }
  if (isUnrecognized) {
    return {
      score: clamp(12, MAX),
      explanation: `Transaction from unrecognized device (${txn.device}).`,
    };
  }
  if (brandMismatch) {
    return {
      score: clamp(8, MAX),
      explanation: `Device brand mismatch: ${txn.device} vs usual ${account.usual_device}.`,
    };
  }
  if (txnDevice !== usualDevice) {
    return {
      score: clamp(4, MAX),
      explanation: `Transaction device (${txn.device}) differs slightly from usual device (${account.usual_device}).`,
    };
  }

  return { score: 0, explanation: `Transaction from expected device (${account.usual_device}).` };
}

/**
 * 4. Time Anomaly (max 12)
 * Flags transactions outside normal banking hours (06:00–22:00 IST).
 */
function scoreTime(txn) {
  const MAX = 12;
  if (!txn || !txn.timestamp) return { score: 0, explanation: 'Timestamp unavailable.' };

  const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000;
  const istDate = new Date(new Date(txn.timestamp).getTime() + IST_OFFSET_MS);
  const hour    = istDate.getUTCHours();
  const minute  = istDate.getUTCMinutes();
  const timeStr = `${String(hour).padStart(2,'0')}:${String(minute).padStart(2,'0')} IST`;

  if (hour >= 0 && hour < 4) {
    return {
      score: MAX,
      explanation: `Transaction at ${timeStr} — deep overnight, highest-risk window (00:00–04:00 IST).`,
    };
  }
  if (hour >= 4 && hour < 6) {
    return {
      score: clamp(8, MAX),
      explanation: `Transaction at ${timeStr} — early morning, outside normal banking hours.`,
    };
  }
  if (hour >= 22) {
    return {
      score: clamp(5, MAX),
      explanation: `Transaction at ${timeStr} — late night.`,
    };
  }

  return { score: 0, explanation: `Transaction at ${timeStr} — within normal banking hours.` };
}

/**
 * 5. Velocity Anomaly (max 20)
 * Counts how many transactions the sender made within ±5 minutes of this one.
 */
function scoreVelocity(txn, alertAccountId) {
  const MAX = 20;
  if (!txn || !txn.timestamp) return { score: 0, explanation: 'Timestamp unavailable for velocity check.' };

  const transactions = getTransactions();
  const alertTime    = new Date(txn.timestamp).getTime();
  const WINDOW_MS    = 5 * 60 * 1000; // 5 minutes

  const burst = transactions.filter(t =>
    t.sender_id === alertAccountId &&
    t.id !== txn.id &&
    Math.abs(new Date(t.timestamp).getTime() - alertTime) <= WINDOW_MS
  );

  const count = burst.length;
  const totalBurstAmount = burst.reduce((s, t) => s + (t.amount || 0), 0) + (txn.amount || 0);

  let score = 0;
  if (count >= 4)      score = MAX;
  else if (count >= 3) score = 17;
  else if (count >= 2) score = 13;
  else if (count === 1) score = 7;

  if (score === 0) {
    return { score: 0, explanation: 'No velocity burst detected in the 5-minute window.' };
  }

  return {
    score: clamp(score, MAX),
    explanation: `${count + 1} transactions totalling ₹${totalBurstAmount.toLocaleString('en-IN')} within 5 minutes (${count} additional tx alongside this one).`,
  };
}

/**
 * 6. Network Anomaly (max 15)
 * Checks whether the receiver account has a high risk_level in the accounts data.
 */
function scoreNetwork(txn) {
  const MAX = 15;
  if (!txn || !txn.receiver_id) return { score: 0, explanation: 'Receiver information unavailable.' };

  const accounts   = getAccounts();
  const receiver   = accounts.find(a => a.id === txn.receiver_id);

  if (!receiver) {
    return { score: clamp(8, MAX), explanation: `Receiver ${txn.receiver_id} not found in account registry — possible unknown entity.` };
  }

  const level = (receiver.risk_level || 'LOW').toUpperCase();
  const scoreMap = { CRITICAL: MAX, HIGH: 12, MEDIUM: 6, LOW: 0 };
  const score = scoreMap[level] !== undefined ? scoreMap[level] : 4;

  if (score === 0) {
    return { score: 0, explanation: `Receiver ${txn.receiver_id} (${receiver.customer_name}) is a low-risk account.` };
  }

  // Check second-hop: does the receiver send to other high-risk accounts?
  const transactions = getTransactions();
  const receiverOutbound = transactions.filter(t => t.sender_id === txn.receiver_id && t.receiver_id !== txn.sender_id);
  const connectedIds = [...new Set(receiverOutbound.map(t => t.receiver_id))];
  const connectedHighRisk = connectedIds
    .map(id => accounts.find(a => a.id === id))
    .filter(a => a && ['CRITICAL', 'HIGH'].includes((a.risk_level || '').toUpperCase()));

  let finalScore = score;
  let explanation = `Receiver ${txn.receiver_id} (${receiver.customer_name}) has ${level} risk level.`;

  if (connectedHighRisk.length > 0) {
    finalScore = Math.min(MAX, score + 3);
    explanation += ` Connected to ${connectedHighRisk.length} other high-risk account(s): ${connectedHighRisk.map(a => a.id).join(', ')}.`;
  }

  return { score: clamp(finalScore, MAX), explanation };
}

// ── Main export ───────────────────────────────────────────────────────────────

function calculateRiskScore(alert, transaction, account) {
  const f1 = scoreAmount(transaction, account);
  const f2 = scoreLocation(transaction, account);
  const f3 = scoreDevice(transaction, account);
  const f4 = scoreTime(transaction);
  const f5 = scoreVelocity(transaction, alert ? alert.account_id : null);
  const f6 = scoreNetwork(transaction);

  const factors = [
    { name: 'Amount Anomaly',   score: f1.score, maxScore: 20, explanation: f1.explanation },
    { name: 'Location Anomaly', score: f2.score, maxScore: 18, explanation: f2.explanation },
    { name: 'Device Anomaly',   score: f3.score, maxScore: 15, explanation: f3.explanation },
    { name: 'Time Anomaly',     score: f4.score, maxScore: 12, explanation: f4.explanation },
    { name: 'Velocity Anomaly', score: f5.score, maxScore: 20, explanation: f5.explanation },
    { name: 'Network Anomaly',  score: f6.score, maxScore: 15, explanation: f6.explanation },
  ];

  const totalScore = factors.reduce((sum, f) => sum + f.score, 0);
  const riskLevel  = riskLevelFromScore(totalScore);

  return { totalScore, maxScore: 100, riskLevel, factors };
}

module.exports = { calculateRiskScore };
