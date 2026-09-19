const express = require('express');
const router  = express.Router();
const db      = require('../db');

const VALID_RISK_LEVELS = ['CRITICAL','HIGH','MEDIUM','LOW'];
const VALID_STATUSES    = ['OPEN','ESCALATED','MONITORED','DISMISSED'];

// GET /api/alerts/stats  — must be BEFORE /:id to avoid Express route collision
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await db.queryAlertStats();
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

// GET /api/alerts
router.get('/', async (req, res, next) => {
  try {
    const page  = Math.max(1, parseInt(req.query.page,  10) || 1);
    const limit = Math.min(500, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const search    = (req.query.search    || '').trim();
    const riskLevel = (req.query.riskLevel || '').toUpperCase();
    const status    = (req.query.status    || '').toUpperCase();
    const location  = (req.query.location  || '').trim();

    if (riskLevel && !VALID_RISK_LEVELS.includes(riskLevel)) {
      return res.status(400).json({ error: `Invalid riskLevel. Must be one of: ${VALID_RISK_LEVELS.join(', ')}` });
    }
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }

    const result = await db.queryAlerts({ page, limit, search, riskLevel, status, location });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/alerts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id.toUpperCase();
    const detail = await db.queryAlertById(id);
    if (!detail) {
      return res.status(404).json({ error: `Alert ${id} not found.` });
    }

    // Attach live risk scores
    const { calculateRiskScore } = require('../risk-engine/scoring');
    const riskResult = calculateRiskScore(detail.alert, detail.transaction, detail.account);
    detail.riskAssessment = riskResult;
    detail.alert.risk_score = riskResult.totalScore;
    detail.alert.risk_level = riskResult.riskLevel;

    // Attach network graph from the stub (Member 3 will replace this)
    const { buildAccountNetwork } = require('../network/graphBuilder');
    detail.network = buildAccountNetwork(detail.alert.account_id, 1);

    res.json(detail);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
