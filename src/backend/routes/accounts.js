const express = require('express');
const router  = express.Router();
const db      = require('../db');
const { buildAccountNetwork } = require('../network/graphBuilder');

// GET /api/accounts/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id.toUpperCase();
    const account = await db.queryAccountById(id);
    if (!account) {
      return res.status(404).json({ error: `Account ${id} not found.` });
    }

    // Attach network graph
    const depth = Math.min(3, Math.max(1, parseInt(req.query.depth, 10) || 1));
    account.network = buildAccountNetwork(id, depth);

    res.json(account);
  } catch (err) {
    next(err);
  }
});

// GET /api/accounts/:id/transactions
router.get('/:id/transactions', async (req, res, next) => {
  try {
    const id    = req.params.id.toUpperCase();
    const page  = Math.max(1, parseInt(req.query.page,  10) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit, 10) || 20));

    const account = await db.queryAccountById(id);
    if (!account) {
      return res.status(404).json({ error: `Account ${id} not found.` });
    }

    const result = await db.queryAccountTransactions(id, { page, limit });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
