require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve frontend static files
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
const healthRouter = require('./backend/routes/health');
const alertsRouter = require('./backend/routes/alerts');
const accountsRouter = require('./backend/routes/accounts');
const investigationsRouter = require('./backend/routes/investigations');
const copilotRouter = require('./backend/routes/copilot');

app.use('/api/health', healthRouter);
app.use('/api/alerts', alertsRouter);
app.use('/api/accounts', accountsRouter);
app.use('/api/investigations', investigationsRouter);
app.use('/api/copilot', copilotRouter);

// Global error handler — must be before SPA fallback so API errors return JSON
app.use(require('./backend/middleware/errorHandler'));

// SPA fallback — serve index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

// Only start listening when this file is run directly (not when required by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    const dbMode = process.env.DATABASE_URL ? 'PostgreSQL' : 'JSON file store';
    console.log(`FinGuard running at http://localhost:${PORT}`);
    console.log(`Database mode: ${dbMode}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

module.exports = app;
