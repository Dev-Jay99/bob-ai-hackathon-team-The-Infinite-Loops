'use strict';

const express = require('express');
const router  = express.Router();
const db      = require('../db');

// GET /api/transactions
router.get('/', async (req, res, next) => {
  try {
    const page         = Math.max(1, parseInt(req.query.page,  10) || 1);
    const limit        = Math.min(500, Math.max(1, parseInt(req.query.limit, 10) || 20));
    const accountId    = (req.query.accountId || req.query.sender_id || '').trim();
    const verification = (req.query.verification || req.query.customerVerification || '').trim();
    const status       = (req.query.status || '').trim();
    const search       = (req.query.search || '').trim();

    const result = await db.queryTransactions({ page, limit, accountId, verification, status, search });
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/transactions/reset-benchmark
router.post('/reset-benchmark', async (req, res, next) => {
  try {
    const result = await db.resetBenchmarkTransaction();
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// POST /api/transactions/simulate
router.post('/simulate', async (req, res, next) => {
  try {
    const { sender_id, receiver_id, amount, location, device } = req.body || {};
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      return res.status(400).json({ error: 'Valid transaction amount is required.' });
    }

    const result = await db.simulateTransaction({
      sender_id: sender_id || 'A001',
      receiver_id: receiver_id || 'A023',
      amount: Number(amount),
      location: location || 'Ahmedabad',
      device: device || 'Samsung Galaxy S23',
    });

    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/transactions/:id
router.get('/:id', async (req, res, next) => {
  try {
    const id = String(req.params.id).toUpperCase();
    const result = await db.queryTransactionById(id);
    if (!result) {
      return res.status(404).json({ error: `Transaction ${id} not found.` });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET /api/transactions/:id/verification
router.get('/:id/verification', async (req, res, next) => {
  try {
    const id = String(req.params.id).toUpperCase();
    const result = await db.queryTransactionById(id);
    if (!result) {
      return res.status(404).json({ error: `Transaction ${id} not found.` });
    }
    res.json({
      transactionId: id,
      customerVerification: result.transaction.customer_verification,
      customerResponse: result.transaction.customer_verification_response,
      timestamp: result.transaction.customer_verification_timestamp,
      status: result.transaction.transaction_status,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/transactions/:id/verify
router.post('/:id/verify', async (req, res, next) => {
  try {
    const id = String(req.params.id).toUpperCase();
    const { response, notes } = req.body || {};

    if (!response || !['CONFIRMED', 'DENIED'].includes(String(response).toUpperCase())) {
      return res.status(400).json({
        error: 'Invalid verification response. Must be "CONFIRMED" or "DENIED".',
      });
    }

    const result = await db.verifyTransaction(id, String(response).toUpperCase(), notes || '');
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
