'use strict';

const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { CopilotService } = require('../ai/copilot');

const copilot = new CopilotService();

// POST /api/copilot/chat
router.post('/chat', async (req, res, next) => {
  try {
    const { caseContext, message } = req.body || {};
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'message is required.' });
    }
    const alertId = (caseContext || {}).alertId;
    let detail = alertId ? await db.queryAlertById(String(alertId).toUpperCase()) : null;
    if (detail) {
      const { calculateRiskScore } = require('../risk-engine/scoring');
      detail.riskAssessment = calculateRiskScore(detail.alert, detail.transaction, detail.account);
    }
    const result = await copilot.chat(caseContext || {}, String(message).slice(0, 1000), detail);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/copilot/brief
router.post('/brief', async (req, res, next) => {
  try {
    const { caseContext } = req.body || {};
    const alertId = (caseContext || {}).alertId;
    const detail  = alertId ? await db.queryAlertById(alertId.toUpperCase()) : null;
    if (detail) {
      // Attach live risk assessment so the brief has real scores
      const { calculateRiskScore } = require('../risk-engine/scoring');
      detail.riskAssessment = calculateRiskScore(detail.alert, detail.transaction, detail.account);
    }
    const result = await copilot.generateInvestigationBrief(caseContext || {}, detail);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/copilot/explain-alert
router.post('/explain-alert', async (req, res, next) => {
  try {
    const { alertId } = req.body || {};
    if (!alertId) return res.status(400).json({ error: 'alertId is required.' });

    const detail = await db.queryAlertById(String(alertId).toUpperCase());
    if (!detail) return res.status(404).json({ error: `Alert ${alertId} not found.` });

    // Attach live risk assessment
    const { calculateRiskScore } = require('../risk-engine/scoring');
    detail.riskAssessment = calculateRiskScore(detail.alert, detail.transaction, detail.account);

    const result = await copilot.explainAlert(alertId, detail);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
