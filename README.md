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

bob-ai-hackathon-team-The-Infinite-Loops/
├── .github/
├── demo/
├── docs/
│   ├── api-contract.md
│   ├── architecture.md           # [Updated] Documenting full system architecture
│   ├── setup-guide.md
│   └── solution-overview.md      # [Updated] Documenting 2-way investigation workflow
├── presentation/
│   ├── README.md
│   └── slides.pptx
├── src/
│   ├── server.js                 # [Updated] Registered transactions route
│   ├── package.json
│   ├── .env.example
│   ├── data/
│   │   ├── accounts.json
│   │   ├── alerts.json
│   │   ├── investigations.json
│   │   └── transactions.json
│   ├── backend/
│   │   ├── ai/aiService.js       # [Updated] AI reporting & Copilot sync
│   │   ├── db/
│   │   │   ├── index.js
│   │   │   ├── jsonStore.js      # [Updated] 2-way status workflow & CONFIRMED fixes
│   │   │   └── pgStore.js        # [Updated] DB sync
│   │   ├── risk-engine/
│   │   │   └── scoring.js        # [Updated] Score-to-alert alignment
│   │   └── routes/
│   │       ├── alerts.js         # [Updated] Alert endpoints
│   │       ├── investigations.js # [Updated] /start & /customer-status endpoints
│   │       └── transactions.js   # [New] Customer verification & simulation routes
│   └── frontend/
│       ├── css/components.css    # [Updated] Badges & responsive styles
│       ├── js/
│       │   ├── alert-details.js  # [Updated] Approve & Start workflow, manual overrides
│       │   ├── alerts.js         # [Updated] Queue filters
│       │   ├── api.js            # [Updated] Investigation & verification API calls
│       │   ├── customer-portal.js# [New] Dynamic customer verification & live polling
│       │   ├── dashboard.js      # [Updated] Dashboard metrics
│       │   └── nav.js            # [Updated] Status badges & toast utilities
│       └── pages/
│           ├── alert-details.html# [Updated] Customer fraud report review section
│           ├── alerts.html       # [Updated] Under Investigation filter
│           ├── customer-portal.html # [New] Customer verification interface
│           ├── dashboard.html    # [Updated]
│           └── investigations.html# [Updated]
├── .gitignore                    # Prevents node_modules/ and logs from uploading
├── CONTRIBUTING.md
├── README.md                     # [Updated] Clean repository tree & demo instructions
└── submission.yaml
# 1. Stage all tracked changes and new files
git add .

# 2. Verify everything is staged cleanly
git status

# 3. Create the final commit
git commit -m "feat: complete two-way customer verification and investigator workflow"

# 4. Push to your GitHub repository
git push origin main


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
