'use strict';

/**
 * FinGuard AI Reports Routes — self-contained, no Python dependency.
 * Ported from FinGuard/app/routes/reports.py
 */

const express = require('express');
const router  = express.Router();
const db      = require('../db');
const ai      = require('../ai/aiService');
const { calculateRiskScore } = require('../risk-engine/scoring');

const VALID_DECISIONS = new Set(['fraud', 'legitimate', 'further_investigation']);
const DISCLAIMER = ai.DISCLAIMER;

// POST /api/reports/investigation
router.post('/investigation', async (req, res, next) => {
  try {
    const { alertId, investigatorNotes, finalDecision } = req.body || {};
    if (!alertId) return res.status(400).json({ error: 'alertId is required.' });

    if (finalDecision != null && !VALID_DECISIONS.has(finalDecision)) {
      return res.status(400).json({
        error: `Invalid finalDecision '${finalDecision}'. Must be one of: ${[...VALID_DECISIONS].sort().join(', ')} or null.`,
      });
    }

    const detail = await db.queryAlertById(String(alertId).toUpperCase());
    if (!detail) return res.status(404).json({ error: `Alert '${alertId}' not found.` });

    // Attach real risk scores
    detail.riskAssessment = calculateRiskScore(detail.alert, detail.transaction, detail.account);

    const ctx = ai.buildCaseContext(
      alertId,
      detail.alert,
      detail.transaction,
      detail.account,
      detail.riskAssessment,
      detail
    );

    const { brief, disclaimer } = ai.generateBrief(ctx, investigatorNotes);

    res.json({
      alertId,
      aiSummary: brief,
      investigatorNotes: investigatorNotes || '',
      finalDecision:     finalDecision     || null,
      disclaimer:        disclaimer        || DISCLAIMER,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
