# Solution Overview

## What We Built

FinGuard is an enterprise-grade, AI-powered Bank Fraud and AML Investigation Operations platform. It provides a single investigator workspace where every piece of evidence — risk score, transaction details, customer behavioral baseline, account network graph, and AI-generated analysis — is available on one screen. Investigators no longer need to navigate between systems.

## How It Works

1. **Alert fires** — The transaction monitoring backend generates an alert when suspicious activity is detected. The alert is stored with risk level (CRITICAL/HIGH/MEDIUM/LOW) and linked to the triggering transaction.

2. **Investigator opens the Alerts Queue** — A paginated, filterable table shows all open alerts sorted by recency. Risk level and status are displayed as semantic badges. Investigators can filter by risk level, status, location, and search by alert ID or customer name.

3. **Investigator opens Alert Details** — A single click opens the full investigator workspace showing:
   - **Risk Score** (e.g., 94/100) computed by the Risk Engine from 6 evidence factors
   - **Risk Assessment** — each factor shown with a score, max score, animated progress bar, and plain-language explanation
   - **Transaction Information** — ID, amount, currency, location, device, sender, receiver
   - **Customer Behavioral Baseline** — horizontal comparison bars showing historical average vs. current transaction amount, along with usual city and usual device
   - **Preceding Transaction Sequence** — the burst of transactions around the alert event, with the triggering transaction highlighted
   - **Account Network Graph** — interactive vis-network diagram showing connected accounts colored by risk level, clickable to inspect each node

4. **Investigator consults the AI Copilot** — The case-aware copilot panel shows the case reference, suggests 6 investigation questions, and responds to natural language queries with evidence-based placeholder responses (real watsonx.ai integration pending Member 4). The investigator can generate a full Investigation Brief with one click.

5. **Investigator makes a decision** — The decision section has Escalate, Monitor, and Mark Legitimate buttons with an operational notes field. Clicking any button calls the backend API, which persists the decision. The status badge updates immediately in the UI.

6. **Case appears in Investigations** — Escalated and monitored cases appear in the Investigations page for tracking and follow-up. Investigation Briefs can be printed or saved as PDF from the Reports page.

## Architecture Diagram

```
Browser (HTML/CSS/Vanilla JS)
      │
      │ HTTP fetch to /api/*
      ▼
Node.js + Express (port 3000)
├── Serves frontend/  as static files
├── GET /api/alerts              → DB query
├── GET /api/alerts/stats        → DB aggregate
├── GET /api/alerts/:id          → DB + Risk Engine stub + Network stub
├── GET /api/accounts/:id        → DB + Network stub
├── POST /api/investigations/:id → DB write
├── POST /api/copilot/chat       → Copilot stub
└── POST /api/copilot/brief      → Copilot stub
      │
      ├── JSON File Store (default, no setup required)
      └── PostgreSQL (when DATABASE_URL is set)
```

## Key Design Decisions

| Decision | Rationale |
|---|---|
| Vanilla JS, no framework | Eliminates build tooling, making the app instantly runnable with `npm start` |
| Dual-mode database | JSON store means judges can evaluate the app without PostgreSQL; PostgreSQL mode exists for production |
| Stub architecture for Member 3/4 | Clear `TODO MEMBER 3/4` annotations in dedicated files so parallel development works cleanly |
| vis-network for graph | Purpose-built for network visualization; no custom canvas code required |
| Benchmark case ALT-10482 | Provides a reproducible, fully-evidenced demo case that demonstrates the complete workflow |
| No hardcoded risk scores in general logic | Risk scores come from the engine stub, which is swappable without touching any other file |

## IBM Technologies Used

- **IBM Bob AI Platform:** FinGuard was architected and built using IBM Bob as the AI development assistant. Bob was used to reason about the multi-member team architecture, generate the full-stack codebase, write the stub integration contracts, and produce the documentation. Bob's ability to maintain context across the frontend, backend, stubs, and data layer simultaneously made the parallelized team structure possible.
