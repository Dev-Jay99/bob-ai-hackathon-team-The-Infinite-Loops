# Setup Guide

> **This file is read by the automated evaluation pipeline. Be precise and complete.**

## Prerequisites

- [ ] Node.js 18 or higher — check with `node --version`
- [ ] npm 9 or higher — check with `npm --version`
- [ ] No PostgreSQL required — the app runs with a local JSON file store by default

## Environment Variables

The app works without any `.env` file in JSON mode. To customize:

```bash
cd src
cp .env.example .env
```

| Variable | Description | Required |
|---|---|---|
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | `development` or `production` | No |
| `DATABASE_URL` | PostgreSQL connection string. Leave blank to use JSON mode | No |
| `DATA_DIR` | Path to data directory (default: `./data`) | No |

## Installation

```bash
# 1. Clone the repo
git clone https://github.com/your-org/bob-ai-hackathon-team-The-Infinite-Loops.git

# 2. Enter the source directory
cd bob-ai-hackathon-team-The-Infinite-Loops/src

# 3. Install dependencies
npm install
```

## Generate Synthetic Data

This step is required before starting the app for the first time:

```bash
npm run seed
```

Expected output:
```
FinGuard Synthetic Data Generator
══════════════════════════════════
  ✓ accounts.json  (600 records)
  ✓ transactions.json  (11200+ records)
  ✓ alerts.json  (240 records)
  ✓ risk_factors.json  (1440+ records)
  ✓ investigations.json  (N records)
  ✓ reports.json  (0 records)

✅ Done. Run "npm start" to launch FinGuard.
```

## Running the Application

```bash
npm start
```

The application will be available at: **http://localhost:3000**

You should see:
```
FinGuard running at http://localhost:3000
Database mode: JSON file store
Environment: development
```

## Verify It Works

1. Open `http://localhost:3000` — you should be redirected to the dashboard
2. The KPI cards should show numbers (Total Alerts, Critical, High Risk, Pending)
3. The Recent Critical Alerts table should show alerts
4. Navigate to **Alerts Queue** — the table should be populated

## Demo the Benchmark Case

The benchmark case demonstrates the full investigation workflow:

```
http://localhost:3000/pages/alert-details.html?id=ALT-10482
```

This opens the Alert Details workspace for:
- Customer: **Vikram Mehta (A001)**
- Risk Score: **94/100 — CRITICAL**
- Transaction: **₹75,000 from Mumbai at 02:17 AM** using an unrecognized iPhone
- Network: **A001 → A023 → A051 / A072** fraud pass-through chain

## Running Tests

```bash
# Seed data first if you haven't already
npm run seed

# Run tests
npm test
```

All 20+ tests should pass. Tests cover the health endpoint, dataset integrity, benchmark alert lookup, risk stub, network stub, copilot stub, and investigation action endpoints.

## PostgreSQL Mode (Optional)

To use PostgreSQL instead of JSON files:

1. Create a database: `createdb finguard`
2. Run the schema: `psql finguard < backend/db/schema.sql`
3. Add to `.env`: `DATABASE_URL=postgresql://user:password@localhost:5432/finguard`
4. Seed data: `npm run seed` (seeder writes JSON files; you must import them into PG separately or adapt the seeder)
5. Start: `npm start`

## Troubleshooting

| Issue | Solution |
|---|---|
| `Cannot find module '../data/accounts.json'` | Run `npm run seed` first |
| `Error: listen EADDRINUSE :::3000` | Port 3000 is in use. Set `PORT=3001` in `.env` or kill the process |
| `npm: command not found` | Install Node.js 18+ from https://nodejs.org |
| Charts not rendering | Ensure CDN access (Chart.js from jsdelivr.net). Check browser console for errors |
| vis-network graph blank | Ensure CDN access (unpkg.com). Try refreshing after the network stabilizes |
| `Cannot GET /pages/dashboard.html` | Make sure you ran `npm start` from inside the `src/` directory |
