# 🚀 FinGuard: AI-Powered Bank Fraud & AML Investigation Copilot

---

## 👥 Team

| Field | Value |
|---|---|
| **Team Name** | The Infinite Loops |
| **Track** | AI |
| **Team Lead** | Bhatti Meet Shaileshbhai — 25dce010@charusat.edu.in |
| **Members** | Bhensdadiya Jay (d26dce128@charusat.edu.in), Dangar Jay (d26aiml091@charusat.edu.in), Patel Kushal (d26dce143@charusat.edu.in) |

---

## 🎯 Problem Statement

Bank fraud and AML investigators must manually correlate transaction data, customer history, device signals, account networks and risk scores across disconnected systems — a process that takes 45–90 minutes per alert. High-volume queues mean critical fraud patterns go unreviewed for hours, delaying SAR filings and exposing institutions to regulatory risk.

---

## 💡 Solution

FinGuard is an enterprise-grade, AI-powered Bank Fraud and AML Investigation Operations platform. It consolidates every evidence signal — risk score, transaction context, customer behavioral baseline, account network graph and AI-generated investigation analysis — into a single investigator workspace. Investigators open one alert, see all the evidence, consult the AI Copilot and make a documented, auditable decision in minutes rather than hours.

---

## ✨ Key Features

- **Multi-factor Risk Scoring:** 6 explainable risk factors (Amount, Location, Device, Time, Velocity, Network) with animated progress bars and plain-language explanations
- **Interactive Account Network:** vis-network graph showing transaction relationships and flagged pass-through accounts up to 3 hops deep — clickable nodes navigate to account inspection
- **Case-Aware AI Copilot:** Suggested investigation questions, chat interface and one-click Investigation Brief generation (placeholder for watsonx.ai integration)
- **Full Investigator Workflow:** Escalate, Monitor or Mark Legitimate — with real-time status updates and operational notes persisted to the backend
- **Paginated Alerts Queue:** Debounced search, risk level / status / location filters, and full pagination backed by dual-mode JSON or PostgreSQL database

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Languages** | JavaScript, HTML5, CSS3, SQL |
| **Frameworks** | Node.js, Express.js |
| **IBM Technologies** | IBM Bob AI Platform |
| **Databases** | JSON File Store (default), PostgreSQL |
| **Other** | Chart.js, vis-network, Google Fonts Inter, Jest, Supertest |

---

## 📁 Repository Structure

```
src/
├── server.js                  # Express entry point
├── package.json               # Dependencies and scripts
├── .env.example               # Environment variable template
├── data/
│   └── generate-data.js       # Synthetic data generator (npm run seed)
├── backend/
│   ├── db/                    # Dual-mode database layer (JSON + PostgreSQL)
│   ├── routes/                # REST API routes
│   ├── middleware/            # Error handler
│   ├── risk-engine/           # Risk scoring stub (Member 3)
│   ├── network/               # Graph builder stub (Member 3)
│   └── ai/                    # Copilot stub (Member 4)
├── frontend/
│   ├── index.html             # Redirect to dashboard
│   ├── css/                   # Global design system + components
│   ├── js/                    # api.js, nav.js, per-page JS
│   └── pages/                 # dashboard, alerts, alert-details, network, investigations, reports
├── tests/
│   └── api.test.js            # Jest + Supertest test suite
└── bob_sessions/              # Per-member session notes
docs/
├── api-contract.md            # API documentation
├── architecture.md            # System architecture
├── setup-guide.md             # How to run
├── member-3-handoff.md        # Risk Engine integration guide
└── member-4-handoff.md        # AI Copilot integration guide
```

---

## ⚡ How to Run

```bash
# 1. Clone the repo
git clone https://github.com/your-org/bob-ai-hackathon-team-The-Infinite-Loops.git
cd bob-ai-hackathon-team-The-Infinite-Loops/src

# 2. Install dependencies
npm install

# 3. Configure environment (optional — JSON mode works without any config)
cp .env.example .env

# 4. Generate synthetic data
npm run seed

# 5. Run the application
npm start
```

Open **http://localhost:3000** — the dashboard loads immediately.

**Demo the benchmark case:** Navigate to Alerts Queue → filter Critical → click **ALT-10482**, or go directly to `http://localhost:3000/pages/alert-details.html?id=ALT-10482`

---

## 🖥️ Demo

| Artifact | Link |
|---|---|
| 📹 Demo Video | [See demo/demo-video-link.txt](demo/demo-video-link.txt) |
| 🌐 Live Demo | [See demo/live-demo-url.txt](demo/live-demo-url.txt) |
| 🖼️ Screenshots | [See demo/screenshots/](demo/screenshots/) |
| 📊 Presentation | [See presentation/](presentation/) |

---

## ⚠️ Known Limitations

- Authentication is mocked — the user profile is a static display, not a real login system
- The AI Copilot returns placeholder responses until Member 4 integrates watsonx.ai / IBM Granite
- The Risk Engine uses pre-generated synthetic scores until Member 3 implements the real ML model
- Network graph shows full data for benchmark accounts (A001, A023, A051, A072); other accounts show stub nodes until Member 3 implements real graph traversal
- Tested on Chrome and Firefox; mobile layout not optimized

---

## 🏅 What We're Most Proud Of

The **Alert Details investigator workspace** (`pages/alert-details.html`). It is a purpose-built, evidence-driven investigation environment — not a generic dashboard. Every element on the page (6 risk factors with animated progress bars, customer behavioral baseline comparison, transaction sequence timeline, vis-network account graph, case-aware AI Copilot and decision action buttons) is designed around the investigator's real workflow. Open `ALT-10482` to see the full benchmark case in action: risk score 94/100, Vikram Mehta's ₹75,000 transaction from Mumbai, and the A001→A023→A051/A072 fraud network.
