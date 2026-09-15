const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    app: 'FinGuard',
    version: '1.0.0',
    mode: process.env.DATABASE_URL ? 'postgresql' : 'json',
    environment: process.env.NODE_ENV || 'development',
  });
});

module.exports = router;
