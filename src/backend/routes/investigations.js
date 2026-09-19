const express = require('express');
const router  = express.Router();
const db      = require('../db');

const VALID_STATUSES = ['OPEN','ESCALATED','UNDER_INVESTIGATION','MONITORED','DISMISSED'];

// GET /api/investigations
router.get('/', async (req, res, next) => {
  try {
    const status = (req.query.status || '').toUpperCase();
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({ error: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}` });
    }
    const investigations = await db.queryInvestigations({ status });
    res.json({ data: investigations });
  } catch (err) {
    next(err);
  }
});

// GET /api/investigations/customer-status/:accountId
// Customer portal polls this to check investigation progress
router.get('/customer-status/:accountId', async (req, res, next) => {
  try {
    const accountId = req.params.accountId.toUpperCase();
    const statuses = await db.getCustomerInvestigationStatus(accountId);
    res.json({ data: statuses });
  } catch (err) {
    next(err);
  }
});

// POST /api/investigations/:id/start
// Investigator approves customer fraud report and starts formal investigation
router.post('/:id/start', async (req, res, next) => {
  try {
    const alertId = req.params.id.toUpperCase();
    const notes   = (req.body && req.body.notes) ? String(req.body.notes).slice(0, 2000) : '';
    const inv = await db.startInvestigation(alertId, notes);
    res.json({ success: true, investigation: inv });
  } catch (err) {
    // Distinguish validation errors from server errors
    if (err.message && (err.message.includes('not found') || err.message.includes('Cannot start'))) {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
});

// POST /api/investigations/:id/escalate
router.post('/:id/escalate', async (req, res, next) => {
  try {
    const alertId = req.params.id.toUpperCase();
    const notes   = (req.body && req.body.notes) ? String(req.body.notes).slice(0, 2000) : '';
    const inv = await db.updateInvestigationStatus(alertId, 'ESCALATED', notes);
    res.json({ success: true, investigation: inv });
  } catch (err) {
    next(err);
  }
});

// POST /api/investigations/:id/monitor
router.post('/:id/monitor', async (req, res, next) => {
  try {
    const alertId = req.params.id.toUpperCase();
    const notes   = (req.body && req.body.notes) ? String(req.body.notes).slice(0, 2000) : '';
    const inv = await db.updateInvestigationStatus(alertId, 'MONITORED', notes);
    res.json({ success: true, investigation: inv });
  } catch (err) {
    next(err);
  }
});

// POST /api/investigations/:id/dismiss
router.post('/:id/dismiss', async (req, res, next) => {
  try {
    const alertId = req.params.id.toUpperCase();
    const notes   = (req.body && req.body.notes) ? String(req.body.notes).slice(0, 2000) : '';
    const inv = await db.updateInvestigationStatus(alertId, 'DISMISSED', notes);
    res.json({ success: true, investigation: inv });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
