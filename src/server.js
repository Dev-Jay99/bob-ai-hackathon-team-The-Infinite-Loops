require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');

const app  = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve frontend static files (includes chat.html)
app.use(express.static(path.join(__dirname, 'frontend')));

// API Routes
const healthRouter         = require('./backend/routes/health');
const alertsRouter         = require('./backend/routes/alerts');
const accountsRouter       = require('./backend/routes/accounts');
const investigationsRouter = require('./backend/routes/investigations');
const copilotRouter        = require('./backend/routes/copilot');
const aiReportsRouter      = require('./backend/routes/ai-reports');

app.use('/api/health',         healthRouter);
app.use('/api/alerts',         alertsRouter);
app.use('/api/accounts',       accountsRouter);
app.use('/api/investigations', investigationsRouter);
app.use('/api/copilot',        copilotRouter);
app.use('/api/reports',        aiReportsRouter);

// AI Copilot workspace
app.get('/copilot', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'pages', 'copilot.html'));
});

// Global error handler
app.use(require('./backend/middleware/errorHandler'));

// SPA fallback — serve index.html for any non-API route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

if (require.main === module) {
  const server = app.listen(PORT, () => {
    const dbMode = process.env.DATABASE_URL ? 'PostgreSQL' : 'JSON file store';
    console.log('');
    console.log('  ✅ FinGuard is running!');
    console.log(`  🌐 Dashboard  : http://localhost:${PORT}/pages/dashboard.html`);
    console.log(`  🤖 AI Copilot : http://localhost:${PORT}/pages/copilot.html`);
    console.log(`  🗄️  DB mode    : ${dbMode}`);
    console.log('');
  });



  server.on('error', err => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n  ❌ Port ${PORT} is already in use.`);
      console.error(`     Stop the existing process and run again, or set PORT=<other> in .env\n`);
    } else {
      console.error('Server error:', err.message);
    }
    process.exit(1);
  });
}

module.exports = app;
