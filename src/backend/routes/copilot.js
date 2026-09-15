const express = require('express');
const router  = express.Router();
const { CopilotService } = require('../ai/copilot');

const copilot = new CopilotService();

// POST /api/copilot/chat
router.post('/chat', (req, res, next) => {
  try {
    const { caseContext, message } = req.body || {};
    if (!message || !String(message).trim()) {
      return res.status(400).json({ error: 'message is required.' });
    }
    const result = copilot.chat(caseContext || {}, String(message).slice(0, 1000));
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/copilot/brief
router.post('/brief', (req, res, next) => {
  try {
    const { caseContext } = req.body || {};
    const result = copilot.generateInvestigationBrief(caseContext || {});
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
