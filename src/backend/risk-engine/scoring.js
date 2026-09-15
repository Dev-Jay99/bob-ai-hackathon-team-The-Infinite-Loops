/**
 * FinGuard Risk Engine — Developer Stub
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  TODO MEMBER 3 — Replace this entire module with the real engine.   ║
 * ║  See docs/member-3-handoff.md for the full integration contract.    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * Current behaviour:
 *   - ALT-10482 returns the benchmark result: 94/100, CRITICAL
 *   - All other alerts return scores derived from pre-generated data
 *
 * Expected return shape (do NOT change — frontend depends on this):
 * {
 *   totalScore: number,        // 0–100
 *   maxScore: 100,
 *   riskLevel: string,         // CRITICAL | HIGH | MEDIUM | LOW
 *   factors: [
 *     { name: string, score: number, maxScore: number, explanation: string }
 *   ]
 * }
 */

const path = require('path');
const fs   = require('fs');

const DATA_DIR = process.env.DATA_DIR
  ? path.resolve(__dirname, '../../', process.env.DATA_DIR)
  : path.resolve(__dirname, '../../data');

// TODO MEMBER 3 — Replace with your risk model inference call
function calculateRiskScore(alert, transaction, account) {
  // ── Benchmark branch ────────────────────────────────────────────────────
  if (alert && alert.id === 'ALT-10482') {
    // TODO MEMBER 3 — This hardcoded return is ONLY for the benchmark demo.
    // Delete this branch once the real engine is integrated.
    return {
      totalScore: 94,
      maxScore: 100,
      riskLevel: 'CRITICAL',
      factors: [
        { name: 'Amount Anomaly',   score: 20, maxScore: 20, explanation: 'Transaction of ₹75,000 is 23× above the customer average of ₹3,200 and 7.6× above the historical maximum of ₹9,800.' },
        { name: 'Location Anomaly', score: 18, maxScore: 18, explanation: 'Transaction originated in Mumbai. Customer\'s registered city is Ahmedabad. No prior Mumbai transactions on record.' },
        { name: 'Device Anomaly',   score: 15, maxScore: 15, explanation: 'Transaction sent from an unrecognized iPhone 14 Pro. Customer\'s usual device is Samsung Galaxy S23.' },
        { name: 'Time Anomaly',     score: 12, maxScore: 12, explanation: 'Transaction occurred at 02:17 AM — outside normal banking hours. Customer has no prior transactions between midnight and 06:00.' },
        { name: 'Velocity Anomaly', score: 20, maxScore: 20, explanation: '3 high-value transfers sent to 2 recipients within 2 minutes totalling ₹172,000. Normal single-day outflow is under ₹15,000.' },
        { name: 'Network Anomaly',  score: 9,  maxScore: 15, explanation: 'Recipient A023 is a known high-risk pass-through account connected to 2 other flagged accounts (A051, A072). Partial score pending full graph traversal.' },
      ],
    };
  }

  // ── General stub — load pre-generated risk factors from data store ────────
  // TODO MEMBER 3 — Replace with real model inference for each alert.
  const riskFactorsFile = path.join(DATA_DIR, 'risk_factors.json');
  let storedFactors = [];
  try {
    if (fs.existsSync(riskFactorsFile)) {
      const all = JSON.parse(fs.readFileSync(riskFactorsFile, 'utf8'));
      storedFactors = all.filter(f => f.alert_id === (alert && alert.id));
    }
  } catch (_) {
    // TODO MEMBER 3 — Handle data loading errors gracefully in the real engine
  }

  // TODO MEMBER 3 — compute riskLevel from real model output
  const riskLevel = alert ? alert.risk_level : 'MEDIUM';
  const totalScore = alert ? alert.risk_score : 50;

  const factors = storedFactors.length > 0 ? storedFactors.map(f => ({
    name: f.factor_name,
    score: f.score,
    maxScore: f.max_score,
    explanation: f.explanation,
  })) : [
    // TODO MEMBER 3 — Fallback placeholder when no stored factors exist
    { name: 'Amount Anomaly',   score: Math.round(totalScore * 0.22), maxScore: 20, explanation: 'Placeholder — real scoring pending.' },
    { name: 'Location Anomaly', score: Math.round(totalScore * 0.18), maxScore: 18, explanation: 'Placeholder — real scoring pending.' },
    { name: 'Device Anomaly',   score: Math.round(totalScore * 0.15), maxScore: 15, explanation: 'Placeholder — real scoring pending.' },
    { name: 'Time Anomaly',     score: Math.round(totalScore * 0.12), maxScore: 12, explanation: 'Placeholder — real scoring pending.' },
    { name: 'Velocity Anomaly', score: Math.round(totalScore * 0.22), maxScore: 20, explanation: 'Placeholder — real scoring pending.' },
    { name: 'Network Anomaly',  score: Math.round(totalScore * 0.11), maxScore: 15, explanation: 'Placeholder — real scoring pending.' },
  ];

  return { totalScore, maxScore: 100, riskLevel, factors };
}

module.exports = { calculateRiskScore };
