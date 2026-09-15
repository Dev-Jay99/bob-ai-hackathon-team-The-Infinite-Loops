# You are my coding copilot for an IBM Hackathon project.

I have an EMPTY folder named:

Hackathon IBM

Inside it, create the complete project from scratch.

IMPORTANT:
- Do not ask me unnecessary questions.
- Create the folders and files yourself.
- Do not give me only instructions.
- Actually create/write the files in the workspace.
- Use simple beginner-friendly HTML, CSS and JavaScript.
- Do NOT use React, TypeScript, Vite, Tailwind, Bootstrap or other frameworks.
- Use only HTML + CSS + vanilla JavaScript.
- Keep the code readable and easy for a 2nd-year Computer Engineering student to understand.
- The final website must look professional enough for an IBM hackathon.
- Do not over-engineer it.
- Use synthetic/demo data only.
- Do not use real banking/customer information.
- Do not claim that a person is criminal or guilty.
- Use terms such as "Suspicious pattern", "Requires review", "Risk score", "AI-assisted summary", and "Investigator decision".

==================================================
PROJECT NAME
==================================================

FinGuard — Bank Fraud & AML Investigation Copilot

FinGuard is an investigator-focused fraud and AML investigation dashboard.

Banks already generate suspicious/fraud alerts. FinGuard adds an intelligent investigation layer that helps investigators:

1. Prioritize suspicious alerts.
2. Analyze transaction context.
3. Understand why a transaction is risky.
4. Compare transactions with account history.
5. Understand account relationships/network.
6. Ask an AI Investigation Copilot questions.
7. Generate an investigation brief.
8. Take a human investigator decision.
9. Maintain investigation notes/audit trail.

FinGuard is NOT:
- A core banking system.
- A real payment-processing system.
- A real customer database.
- A replacement for a bank's fraud detection engine.
- An autonomous legal/regulatory decision maker.

Use synthetic data for the complete MVP.

==================================================
EXACT FOLDER STRUCTURE
==================================================

Create exactly this structure:

Hackathon IBM/
│
└── FinGuard/
    │
    ├── index.html
    │
    ├── pages/
    │   ├── alerts.html
    │   ├── alert-details.html
    │   ├── network.html
    │   ├── investigations.html
    │   ├── copilot.html
    │   ├── reports.html
    │   ├── analytics.html
    │   └── settings.html
    │
    ├── css/
    │   ├── style.css
    │   ├── dashboard.css
    │   ├── alerts.css
    │   └── details.css
    │
    ├── js/
    │   ├── app.js
    │   ├── dashboard.js
    │   ├── alerts.js
    │   ├── details.js
    │   ├── network.js
    │   └── copilot.js
    │
    └── assets/
        └── logo.svg

Do not add unnecessary files.

==================================================
DESIGN STYLE
==================================================

Create a dark-first enterprise banking investigation interface.

Style:
- Very dark navy/charcoal background.
- Slightly lighter cards.
- Subtle gray-blue borders.
- Cool blue primary accent.
- White/off-white main text.
- Muted gray secondary text.
- Professional banking/security operations center appearance.
- Dense but clean tables.
- Desktop-first but responsive.
- 10–14px card radius.
- Avoid huge rounded cards.
- Avoid excessive animations.
- Avoid neon colors.
- Avoid rainbow gradients.
- Avoid gaming-style design.
- Avoid excessive glassmorphism.

Risk colors should be semantic:
- LOW = green
- MEDIUM = amber
- HIGH = orange
- CRITICAL = red

Typography:
- Use system/Inter-like font stack.
- Page title approximately 24–28px.
- Section title 16–20px.
- Normal text 14px.
- Table text 13–14px.
- Metadata 12px.

==================================================
MAIN SIDEBAR
==================================================

Create a reusable-looking sidebar on every page.

Sidebar items:

Dashboard
Alerts
Network
Investigations
AI Copilot
Reports
Analytics
Settings

The current page should have an active sidebar item.

Top bar should contain:
- Page title
- Search field where useful
- Notification icon/button
- Investigator profile area

==================================================
LOGO
==================================================

Create:

FinGuard/assets/logo.svg

The logo should be a simple professional shield + checkmark + FinGuard text.

Use SVG.

Logo text:
FinGuard

Subtitle:
INVESTIGATION COPILOT

The SVG must work when used as:

For index.html:
assets/logo.svg

For files inside pages/:
../assets/logo.svg

==================================================
RISK SCORE
==================================================

Use this exact scale:

0–30 = LOW
31–60 = MEDIUM
61–80 = HIGH
81–100 = CRITICAL

Every suspicious alert should show:
- Risk score
- Risk level
- Reason/risk factors

Example:

94 / 100
CRITICAL

Risk factors:
- Amount anomaly
- Location anomaly
- New device
- Unusual time
- High transaction velocity
- Network risk

Example weighted score:

Amount anomaly = 20
Location anomaly = 18
New device = 15
Unusual time = 12
Velocity = 20
Network risk = 9

Total = 94

==================================================
REQUIRED DEMO CASE
==================================================

Create synthetic alert:

Alert ID: A001

Account history:
Average transaction = ₹3,200
Maximum historical transaction = ₹9,800
Usual location = Ahmedabad
Usual device = Samsung

Suspicious transactions:

02:15 AM → ₹42,000 → Mumbai → New iPhone
02:16 AM → ₹55,000 → Mumbai → New iPhone
02:17 AM → ₹75,000 → Mumbai → New iPhone

Risk score:

94 / 100

Risk level:

CRITICAL

The Alert Details page must make this story understandable within approximately 30 seconds.

==================================================
DASHBOARD
==================================================

index.html must be the main Dashboard.

Include:

1. Total Alerts
2. Critical Alerts
3. High Alerts
4. Medium Alerts
5. Low Alerts

Include:
- Alert trend chart
- Risk distribution
- Recent critical alerts
- Suspicious accounts
- Investigator workload

Use simple HTML/CSS/JavaScript charts.

Do not depend on external chart libraries.

Use synthetic data.

Dashboard should look like a real fraud/AML operations center.

==================================================
ALERTS PAGE
==================================================

pages/alerts.html

Create a professional alert table.

Columns:

Alert ID
Transaction ID
Account
Amount
Risk Score
Risk Level
Location
Time
Status
Priority

Add:
- Search
- Risk filter
- Status filter
- Sorting where practical
- Pagination-looking controls

Clicking an alert should open:

alert-details.html

Use query parameter such as:

alert-details.html?id=A001

==================================================
ALERT DETAILS PAGE
==================================================

pages/alert-details.html

Create the most important investigation screen.

Show:

Case header:
A001
Critical Alert
Risk Score 94/100

Transaction details.

Risk factor cards.

Customer/account history.

Recent transactions.

Network section.

AI Investigation Copilot.

Investigator notes.

Investigator actions.

Actions:

Escalate
Monitor
Mark Legitimate
Add Notes

Important:
These are DEMO actions only.

Show an audit trail after an action.

Example:
15:02 — Alert opened
15:04 — AI explanation reviewed
15:07 — Investigator added note
15:09 — Investigator selected Escalate

==================================================
NETWORK PAGE
==================================================

pages/network.html

Create an account transaction/network visualization using HTML/SVG/CSS/JavaScript.

Show:
- Central account
- Connected accounts
- Transaction relationships
- Money flow direction
- Risk indicators

Do NOT say that connected accounts are criminals.

Use wording:
"Suspicious relationship"
"Requires review"
"Transaction connection"

Provide a clean professional network visualization.

==================================================
INVESTIGATIONS PAGE
==================================================

pages/investigations.html

Show investigation cases.

Columns:
Case ID
Alert ID
Risk
Assigned Investigator
Status
Last Updated
Action

Statuses:
Open
In Review
Escalated
Monitoring
Closed

Use synthetic data.

==================================================
AI COPILOT PAGE
==================================================

pages/copilot.html

Create a professional AI Investigation Copilot chat interface.

It should look like an internal bank investigation assistant.

Include example suggested questions:

"Why is this transaction critical?"

"What is unusual compared with account history?"

"Show the last 10 transactions."

"Explain the network."

"Which risk factors contributed most?"

"Summarize this case."

"What evidence should I review next?"

The frontend can use predefined/demo JavaScript responses.

Do not pretend that a real AI backend exists.

Clearly indicate:

"Demo AI response — connect backend/LLM API for production."

The UI should still be ready for future API integration.

==================================================
REPORTS PAGE
==================================================

pages/reports.html

Create investigation report page.

Show:

Investigation Brief

Case Summary
Risk Assessment
Key Evidence
Transaction Pattern
Network Observations
AI-assisted Summary
Investigator Decision
Next Recommended Review Steps

Add:

Generate Investigation Brief

button.

For the demo, generate/populate the report using JavaScript.

==================================================
ANALYTICS PAGE
==================================================

pages/analytics.html

Show:
- Risk trends
- Alert volume
- Critical alerts
- Investigation workload
- Risk-level distribution
- Transaction anomaly statistics

Use simple CSS/HTML/JS visualizations.

==================================================
SETTINGS PAGE
==================================================

pages/settings.html

Include simple settings:

Investigator Profile
Notification Preferences
Risk Thresholds
Theme
Demo Data Mode

Do not implement complicated authentication.

==================================================
JAVASCRIPT BEHAVIOR
==================================================

Use vanilla JavaScript.

Create reusable simple functions where useful.

Examples:

showToast()
setActiveSidebar()
openAlert()
updateRiskBadge()
addAuditLog()
sendCopilotMessage()

Use localStorage where useful for:
- Theme
- Demo investigator decisions
- Notes
- Simple settings

Do not use a backend.

Keep the code easy to modify later.

==================================================
API-READY STRUCTURE
==================================================

Although this MVP has no backend, organize JavaScript so that a backend can later replace demo data.

Future APIs:

GET /api/alerts

GET /api/alerts/{alert_id}

GET /api/accounts/{account_id}/transactions

GET /api/accounts/{account_id}/network

POST /api/copilot/chat

POST /api/copilot/explain-alert

POST /api/reports/investigation

POST /api/investigations/{id}/escalate

POST /api/investigations/{id}/monitor

POST /api/investigations/{id}/dismiss

Do not actually call these APIs now.

==================================================
REUSABLE UI COMPONENTS
==================================================

Implement reusable styles/functions for:

RiskBadge
RiskScore
StatCard
AlertTable
AlertFilters
TransactionTable
RiskFactorCard
NetworkGraph
CopilotPanel
InvestigationActions
EmptyState
LoadingState
ErrorState
ConfirmDialog
Toast

Because this is vanilla HTML/CSS/JS, implement these using reusable CSS classes and JavaScript functions rather than React components.

==================================================
IMPORTANT USER EXPERIENCE
==================================================

The website should communicate this story:

Alert appears
↓
FinGuard prioritizes it
↓
Investigator sees risk score
↓
Investigator sees evidence
↓
Investigator sees transaction history
↓
Investigator understands network
↓
AI Copilot explains the case
↓
Investigator reviews evidence
↓
Investigator makes final decision
↓
Decision is recorded in audit trail

The AI must assist the investigator.

The AI must NOT make the final legal decision.

==================================================
NAVIGATION
==================================================

All pages must correctly link to each other.

From Dashboard:
Dashboard → Alerts
Dashboard → Alert Details
Dashboard → Network
Dashboard → Investigations
Dashboard → AI Copilot
Dashboard → Reports
Dashboard → Analytics
Dashboard → Settings

The sidebar must work on every page.

Use correct relative paths.

IMPORTANT PATHS:

From index.html:
pages/alerts.html
pages/alert-details.html
pages/network.html
pages/investigations.html
pages/copilot.html
pages/reports.html
pages/analytics.html
pages/settings.html

From pages/*.html:
../index.html
../css/style.css
../js/app.js
../assets/logo.svg

==================================================
CSS ORGANIZATION
==================================================

style.css:
- Global styles
- Variables
- Sidebar
- Topbar
- Layout
- Buttons
- Cards
- Tables
- Badges
- Toast
- Responsive base

dashboard.css:
- Dashboard-specific styles
- Dashboard cards
- Charts
- Dashboard tables

alerts.css:
- Alert table
- Filters
- Alert page layout

details.css:
- Alert details
- Risk factors
- Transactions
- Copilot
- Network section
- Investigation actions
- Audit trail

Do not duplicate large amounts of CSS unnecessarily.

==================================================
JAVASCRIPT ORGANIZATION
==================================================

app.js:
- Sidebar
- Navigation helpers
- Mobile menu
- Toast
- Theme
- Common functionality

dashboard.js:
- Dashboard synthetic data
- Charts
- Dashboard statistics

alerts.js:
- Alert data
- Search
- Filters
- Sorting
- Pagination
- Alert navigation

details.js:
- A001 data
- Risk factors
- Transactions
- Investigation actions
- Notes
- Audit trail

network.js:
- Network visualization
- Network interactions

copilot.js:
- Copilot UI
- Demo responses
- Suggested prompts
- Chat functionality

==================================================
CODE QUALITY
==================================================

Important:

- No broken links.
- No missing CSS files.
- No missing JS files.
- No incorrect relative paths.
- No console errors.
- No undefined JavaScript functions.
- No missing elements referenced by JavaScript.
- All buttons should either work or show a demo toast.
- Logo must display correctly.
- Website must work by opening index.html.
- Do not require npm.
- Do not require a build process.
- Do not require internet access.
- Do not use external dependencies.

==================================================
IBM HACKATHON PRESENTATION QUALITY
==================================================

The final result should feel like:

"An enterprise fraud and AML investigation operations dashboard."

It should NOT look like:
- A college basic HTML project.
- A gaming dashboard.
- A generic admin template.
- A colorful portfolio.

Prioritize:
1. Professional UI
2. Clear investigation workflow
3. Strong A001 demo case
4. Risk explanation
5. Human-in-the-loop decision
6. AI Copilot
7. Network investigation
8. Audit trail
9. Future backend readiness
10. Easy code maintenance

==================================================
FINAL TASK
==================================================

Now create the entire:

Hackathon IBM/FinGuard/

project.

Create every folder and every file listed above.

Write the complete working code into the files.

After creating everything:
1. Check all relative paths.
2. Check that logo.svg loads correctly.
3. Check that CSS and JS files are correctly connected.
4. Check all navigation links.
5. Check JavaScript for undefined functions/errors.
6. Check that A001 works.
7. Check that demo buttons work.
8. Make sure index.html is the starting page.

Do not just explain the code.

BUILD THE PROJECT DIRECTLY IN THE WORKSPACE.

---

**Status:** active  **Date:** 2026-09-14

---

### 👤 User

You are my coding copilot for an IBM Hackathon project.

I have an EMPTY folder named:

Hackathon IBM

Inside it, create the complete project from scratch.

IMPORTANT:
- Do not ask me unnecessary questions.
- Create the folders and files yourself.
- Do not give me only instructions.
- Actually create/write the files in the workspace.
- Use simple beginner-friendly HTML, CSS and JavaScript.
- Do NOT use React, TypeScript, Vite, Tailwind, Bootstrap or other frameworks.
- Use only HTML + CSS + vanilla JavaScript.
- Keep the code readable and easy for a 2nd-year Computer Engineering student to understand.
- The final website must look professional enough for an IBM hackathon.
- Do not over-engineer it.
- Use synthetic/demo data only.
- Do not use real banking/customer information.
- Do not claim that a person is criminal or guilty.
- Use terms such as "Suspicious pattern", "Requires review", "Risk score", "AI-assisted summary", and "Investigator decision".

==================================================
PROJECT NAME
==================================================

FinGuard — Bank Fraud & AML Investigation Copilot

FinGuard is an investigator-focused fraud and AML investigation dashboard.

Banks already generate suspicious/fraud alerts. FinGuard adds an intelligent investigation layer that helps investigators:

1. Prioritize suspicious alerts.
2. Analyze transaction context.
3. Understand why a transaction is risky.
4. Compare transactions with account history.
5. Understand account relationships/network.
6. Ask an AI Investigation Copilot questions.
7. Generate an investigation brief.
8. Take a human investigator decision.
9. Maintain investigation notes/audit trail.

FinGuard is NOT:
- A core banking system.
- A real payment-processing system.
- A real customer database.
- A replacement for a bank's fraud detection engine.
- An autonomous legal/regulatory decision maker.

Use synthetic data for the complete MVP.

==================================================
EXACT FOLDER STRUCTURE
==================================================

Create exactly this structure:

Hackathon IBM/
│
└── FinGuard/
    │
    ├── index.html
    │
    ├── pages/
    │   ├── alerts.html
    │   ├── alert-details.html
    │   ├── network.html
    │   ├── investigations.html
    │   ├── copilot.html
    │   ├── reports.html
    │   ├── analytics.html
    │   └── settings.html
    │
    ├── css/
    │   ├── style.css
    │   ├── dashboard.css
    │   ├── alerts.css
    │   └── details.css
    │
    ├── js/
    │   ├── app.js
    │   ├── dashboard.js
    │   ├── alerts.js
    │   ├── details.js
    │   ├── network.js
    │   └── copilot.js
    │
    └── assets/
        └── logo.svg

Do not add unnecessary files.

==================================================
DESIGN STYLE
==================================================

Create a dark-first enterprise banking investigation interface.

Style:
- Very dark navy/charcoal background.
- Slightly lighter cards.
- Subtle gray-blue borders.
- Cool blue primary accent.
- White/off-white main text.
- Muted gray secondary text.
- Professional banking/security operations center appearance.
- Dense but clean tables.
- Desktop-first but responsive.
- 10–14px card radius.
- Avoid huge rounded cards.
- Avoid excessive animations.
- Avoid neon colors.
- Avoid rainbow gradients.
- Avoid gaming-style design.
- Avoid excessive glassmorphism.

Risk colors should be semantic:
- LOW = green
- MEDIUM = amber
- HIGH = orange
- CRITICAL = red

Typography:
- Use system/Inter-like font stack.
- Page title approximately 24–28px.
- Section title 16–20px.
- Normal text 14px.
- Table text 13–14px.
- Metadata 12px.

==================================================
MAIN SIDEBAR
==================================================

Create a reusable-looking sidebar on every page.

Sidebar items:

Dashboard
Alerts
Network
Investigations
AI Copilot
Reports
Analytics
Settings

The current page should have an active sidebar item.

Top bar should contain:
- Page title
- Search field where useful
- Notification icon/button
- Investigator profile area

==================================================
LOGO
==================================================

Create:

FinGuard/assets/logo.svg

The logo should be a simple professional shield + checkmark + FinGuard text.

Use SVG.

Logo text:
FinGuard

Subtitle:
INVESTIGATION COPILOT

The SVG must work when used as:

For index.html:
assets/logo.svg

For files inside pages/:
../assets/logo.svg

==================================================
RISK SCORE
==================================================

Use this exact scale:

0–30 = LOW
31–60 = MEDIUM
61–80 = HIGH
81–100 = CRITICAL

Every suspicious alert should show:
- Risk score
- Risk level
- Reason/risk factors

Example:

94 / 100
CRITICAL

Risk factors:
- Amount anomaly
- Location anomaly
- New device
- Unusual time
- High transaction velocity
- Network risk

Example weighted score:

Amount anomaly = 20
Location anomaly = 18
New device = 15
Unusual time = 12
Velocity = 20
Network risk = 9

Total = 94

==================================================
REQUIRED DEMO CASE
==================================================

Create synthetic alert:

Alert ID: A001

Account history:
Average transaction = ₹3,200
Maximum historical transaction = ₹9,800
Usual location = Ahmedabad
Usual device = Samsung

Suspicious transactions:

02:15 AM → ₹42,000 → Mumbai → New iPhone
02:16 AM → ₹55,000 → Mumbai → New iPhone
02:17 AM → ₹75,000 → Mumbai → New iPhone

Risk score:

94 / 100

Risk level:

CRITICAL

The Alert Details page must make this story understandable within approximately 30 seconds.

==================================================
DASHBOARD
==================================================

index.html must be the main Dashboard.

Include:

1. Total Alerts
2. Critical Alerts
3. High Alerts
4. Medium Alerts
5. Low Alerts

Include:
- Alert trend chart
- Risk distribution
- Recent critical alerts
- Suspicious accounts
- Investigator workload

Use simple HTML/CSS/JavaScript charts.

Do not depend on external chart libraries.

Use synthetic data.

Dashboard should look like a real fraud/AML operations center.

==================================================
ALERTS PAGE
==================================================

pages/alerts.html

Create a professional alert table.

Columns:

Alert ID
Transaction ID
Account
Amount
Risk Score
Risk Level
Location
Time
Status
Priority

Add:
- Search
- Risk filter
- Status filter
- Sorting where practical
- Pagination-looking controls

Clicking an alert should open:

alert-details.html

Use query parameter such as:

alert-details.html?id=A001

==================================================
ALERT DETAILS PAGE
==================================================

pages/alert-details.html

Create the most important investigation screen.

Show:

Case header:
A001
Critical Alert
Risk Score 94/100

Transaction details.

Risk factor cards.

Customer/account history.

Recent transactions.

Network section.

AI Investigation Copilot.

Investigator notes.

Investigator actions.

Actions:

Escalate
Monitor
Mark Legitimate
Add Notes

Important:
These are DEMO actions only.

Show an audit trail after an action.

Example:
15:02 — Alert opened
15:04 — AI explanation reviewed
15:07 — Investigator added note
15:09 — Investigator selected Escalate

==================================================
NETWORK PAGE
==================================================

pages/network.html

Create an account transaction/network visualization using HTML/SVG/CSS/JavaScript.

Show:
- Central account
- Connected accounts
- Transaction relationships
- Money flow direction
- Risk indicators

Do NOT say that connected accounts are criminals.

Use wording:
"Suspicious relationship"
"Requires review"
"Transaction connection"

Provide a clean professional network visualization.

==================================================
INVESTIGATIONS PAGE
==================================================

pages/investigations.html

Show investigation cases.

Columns:
Case ID
Alert ID
Risk
Assigned Investigator
Status
Last Updated
Action

Statuses:
Open
In Review
Escalated
Monitoring
Closed

Use synthetic data.

==================================================
AI COPILOT PAGE
==================================================

pages/copilot.html

Create a professional AI Investigation Copilot chat interface.

It should look like an internal bank investigation assistant.

Include example suggested questions:

"Why is this transaction critical?"

"What is unusual compared with account history?"

"Show the last 10 transactions."

"Explain the network."

"Which risk factors contributed most?"

"Summarize this case."

"What evidence should I review next?"

The frontend can use predefined/demo JavaScript responses.

Do not pretend that a real AI backend exists.

Clearly indicate:

"Demo AI response — connect backend/LLM API for production."

The UI should still be ready for future API integration.

==================================================
REPORTS PAGE
==================================================

pages/reports.html

Create investigation report page.

Show:

Investigation Brief

Case Summary
Risk Assessment
Key Evidence
Transaction Pattern
Network Observations
AI-assisted Summary
Investigator Decision
Next Recommended Review Steps

Add:

Generate Investigation Brief

button.

For the demo, generate/populate the report using JavaScript.

==================================================
ANALYTICS PAGE
==================================================

pages/analytics.html

Show:
- Risk trends
- Alert volume
- Critical alerts
- Investigation workload
- Risk-level distribution
- Transaction anomaly statistics

Use simple CSS/HTML/JS visualizations.

==================================================
SETTINGS PAGE
==================================================

pages/settings.html

Include simple settings:

Investigator Profile
Notification Preferences
Risk Thresholds
Theme
Demo Data Mode

Do not implement complicated authentication.

==================================================
JAVASCRIPT BEHAVIOR
==================================================

Use vanilla JavaScript.

Create reusable simple functions where useful.

Examples:

showToast()
setActiveSidebar()
openAlert()
updateRiskBadge()
addAuditLog()
sendCopilotMessage()

Use localStorage where useful for:
- Theme
- Demo investigator decisions
- Notes
- Simple settings

Do not use a backend.

Keep the code easy to modify later.

==================================================
API-READY STRUCTURE
==================================================

Although this MVP has no backend, organize JavaScript so that a backend can later replace demo data.

Future APIs:

GET /api/alerts

GET /api/alerts/{alert_id}

GET /api/accounts/{account_id}/transactions

GET /api/accounts/{account_id}/network

POST /api/copilot/chat

POST /api/copilot/explain-alert

POST /api/reports/investigation

POST /api/investigations/{id}/escalate

POST /api/investigations/{id}/monitor

POST /api/investigations/{id}/dismiss

Do not actually call these APIs now.

==================================================
REUSABLE UI COMPONENTS
==================================================

Implement reusable styles/functions for:

RiskBadge
RiskScore
StatCard
AlertTable
AlertFilters
TransactionTable
RiskFactorCard
NetworkGraph
CopilotPanel
InvestigationActions
EmptyState
LoadingState
ErrorState
ConfirmDialog
Toast

Because this is vanilla HTML/CSS/JS, implement these using reusable CSS classes and JavaScript functions rather than React components.

==================================================
IMPORTANT USER EXPERIENCE
==================================================

The website should communicate this story:

Alert appears
↓
FinGuard prioritizes it
↓
Investigator sees risk score
↓
Investigator sees evidence
↓
Investigator sees transaction history
↓
Investigator understands network
↓
AI Copilot explains the case
↓
Investigator reviews evidence
↓
Investigator makes final decision
↓
Decision is recorded in audit trail

The AI must assist the investigator.

The AI must NOT make the final legal decision.

==================================================
NAVIGATION
==================================================

All pages must correctly link to each other.

From Dashboard:
Dashboard → Alerts
Dashboard → Alert Details
Dashboard → Network
Dashboard → Investigations
Dashboard → AI Copilot
Dashboard → Reports
Dashboard → Analytics
Dashboard → Settings

The sidebar must work on every page.

Use correct relative paths.

IMPORTANT PATHS:

From index.html:
pages/alerts.html
pages/alert-details.html
pages/network.html
pages/investigations.html
pages/copilot.html
pages/reports.html
pages/analytics.html
pages/settings.html

From pages/*.html:
../index.html
../css/style.css
../js/app.js
../assets/logo.svg

==================================================
CSS ORGANIZATION
==================================================

style.css:
- Global styles
- Variables
- Sidebar
- Topbar
- Layout
- Buttons
- Cards
- Tables
- Badges
- Toast
- Responsive base

dashboard.css:
- Dashboard-specific styles
- Dashboard cards
- Charts
- Dashboard tables

alerts.css:
- Alert table
- Filters
- Alert page layout

details.css:
- Alert details
- Risk factors
- Transactions
- Copilot
- Network section
- Investigation actions
- Audit trail

Do not duplicate large amounts of CSS unnecessarily.

==================================================
JAVASCRIPT ORGANIZATION
==================================================

app.js:
- Sidebar
- Navigation helpers
- Mobile menu
- Toast
- Theme
- Common functionality

dashboard.js:
- Dashboard synthetic data
- Charts
- Dashboard statistics

alerts.js:
- Alert data
- Search
- Filters
- Sorting
- Pagination
- Alert navigation

details.js:
- A001 data
- Risk factors
- Transactions
- Investigation actions
- Notes
- Audit trail

network.js:
- Network visualization
- Network interactions

copilot.js:
- Copilot UI
- Demo responses
- Suggested prompts
- Chat functionality

==================================================
CODE QUALITY
==================================================

Important:

- No broken links.
- No missing CSS files.
- No missing JS files.
- No incorrect relative paths.
- No console errors.
- No undefined JavaScript functions.
- No missing elements referenced by JavaScript.
- All buttons should either work or show a demo toast.
- Logo must display correctly.
- Website must work by opening index.html.
- Do not require npm.
- Do not require a build process.
- Do not require internet access.
- Do not use external dependencies.

==================================================
IBM HACKATHON PRESENTATION QUALITY
==================================================

The final result should feel like:

"An enterprise fraud and AML investigation operations dashboard."

It should NOT look like:
- A college basic HTML project.
- A gaming dashboard.
- A generic admin template.
- A colorful portfolio.

Prioritize:
1. Professional UI
2. Clear investigation workflow
3. Strong A001 demo case
4. Risk explanation
5. Human-in-the-loop decision
6. AI Copilot
7. Network investigation
8. Audit trail
9. Future backend readiness
10. Easy code maintenance

==================================================
FINAL TASK
==================================================

Now create the entire:

Hackathon IBM/FinGuard/

project.

Create every folder and every file listed above.

Write the complete working code into the files.

After creating everything:
1. Check all relative paths.
2. Check that logo.svg loads correctly.
3. Check that CSS and JS files are correctly connected.
4. Check all navigation links.
5. Check JavaScript for undefined functions/errors.
6. Check that A001 works.
7. Check that demo buttons work.
8. Make sure index.html is the starting page.

Do not just explain the code.

BUILD THE PROJECT DIRECTLY IN THE WORKSPACE.

---

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[ ] Create folder structure and assets (logo.svg)
[ ] Create CSS files (style.css, dashboard.css, alerts.css, details.css)
[ ] Create JS files (app.js, dashboard.js, alerts.js, details.js, network.js, copilot.js)
[ ] Create index.html (Dashboard)
[ ] Create pages/alerts.html
[ ] Create pages/alert-details.html
[ ] Create pages/network.html
[ ] Create pages/investigations.html
[ ] Create pages/copilot.html
[ ] Create pages/reports.html
[ ] Create pages/analytics.html
[ ] Create pages/settings.html
[ ] Verify all paths, links, and files


### 🤖 Assistant

> 🔧 called: write_file

Let me build the entire project. I'll start with the foundation files in parallel.

> 🔧 **write_file** — FinGuard/assets/logo.svg

### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Create folder structure and assets (logo.svg)
[-] Create CSS files (style.css, dashboard.css, alerts.css, details.css)
[ ] Create JS files (app.js, dashboard.js, alerts.js, details.js, network.js, copilot.js)
[ ] Create index.html (Dashboard)
[ ] Create pages/alerts.html
[ ] Create pages/alert-details.html
[ ] Create pages/network.html
[ ] Create pages/investigations.html
[ ] Create pages/copilot.html
[ ] Create pages/reports.html
[ ] Create pages/analytics.html
[ ] Create pages/settings.html
[ ] Verify all paths, links, and files


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — FinGuard/css/style.css

### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /* ============================================================
   FinGuard — Dashboard Styles
   dashboard.css: Stat cards, charts, dashboard layout
   ============================================================ */

/* --- Stat Cards --- */
.stat-cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 14px;
  margin-bottom: 24px;
}

.stat-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px 18px;
  position: relative;
  overflow: hidden;
  cursor: default;
  transition: border-color 0.15s;
}

.stat-card:hover { border-color: rgba(59,130,246,0.35); }

.stat-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
}

.stat-card.total::before    { background: var(--accent); }
.stat-card.critical::before { background: var(--risk-critical); }
.stat-card.high::before     { background: var(--risk-high); }
.stat-card.medium::before   { background: var(--risk-medium); }
.stat-card.low::before      { background: var(--risk-low); }

.stat-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: var(--text-muted);
  margin-bottom: 8px;
}

.stat-value {
  font-size: 30px;
  font-weight: 800;
  color: var(--text-primary);
  line-height: 1;
  margin-bottom: 6px;
}

.stat-card.critical .stat-value { color: var(--risk-critical); }
.stat-card.high .stat-value     { color: var(--risk-high); }
.stat-card.medium .stat-value   { color: var(--risk-medium); }
.stat-card.low .stat-value      { color: var(--risk-low); }

.stat-change {
  font-size: 11px;
  color: var(--text-muted);
  display: flex; align-items: center; gap: 4px;
}

.stat-change.up   { color: var(--risk-critical); }
.stat-change.down { color: var(--risk-low); }

/* --- Dashboard Grid --- */
.dashboard-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.dashboard-grid-3 {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
}

/* --- Chart Container --- */
.chart-container {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px;
}

.chart-title {
  font-size: 13px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 4px;
}

.chart-subtitle {
  font-size: 11px;
  color: var(--text-muted);
  margin-bottom: 16px;
}

/* --- Bar Chart (CSS) --- */
.bar-chart {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  height: 140px;
  padding-top: 8px;
}

.bar-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 100%;
  justify-content: flex-end;
}

.bar {
  width: 100%;
  background: var(--accent);
  border-radius: 3px 3px 0 0;
  transition: opacity 0.15s;
  min-height: 2px;
  opacity: 0.8;
}

.bar:hover { opacity: 1; }
.bar.critical-bar { background: var(--risk-critical); }
.bar.high-bar     { background: var(--risk-high); }
.bar.medium-bar   { background: var(--risk-medium); }
.bar.low-bar      { background: var(--risk-low); }
.bar.alert-bar    { background: var(--accent); }

.bar-label {
  font-size: 10px;
  color: var(--text-muted);
  text-align: center;
  white-space: nowrap;
}

.bar-value {
  font-size: 10px;
  color: var(--text-secondary);
  text-align: center;
}

/* --- Donut / Pie (SVG-based) --- */
.donut-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
}

.donut-svg {
  flex-shrink: 0;
}

.donut-legend {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 12px; color: var(--text-secondary);
}

.legend-dot {
  width: 10px; height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.legend-count {
  margin-left: auto;
  font-weight: 700;
  color: var(--text-primary);
  font-size: 13px;
  min-width: 28px;
  text-align: right;
}

/* --- Recent Alerts Table on Dashboard --- */
.dashboard-alerts-table table { font-size: 13px; }

.alert-row-link { cursor: pointer; }
.alert-row-link:hover td { background: rgba(59,130,246,0.05); }

/* --- Suspicious Accounts List --- */
.account-list { display: flex; flex-direction: column; gap: 0; }

.account-item {
  display: flex; align-items: center; gap: 12px;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-light);
}

.account-item:last-child { border-bottom: none; }

.account-avatar {
  width: 34px; height: 34px;
  border-radius: 50%;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700;
  color: var(--text-secondary);
  flex-shrink: 0;
}

.account-name { font-size: 13px; font-weight: 600; color: var(--text-primary); }
.account-id   { font-size: 11px; color: var(--text-muted); font-family: monospace; }
.account-risk { margin-left: auto; }

/* --- Investigator Workload --- */
.workload-list { display: flex; flex-direction: column; gap: 10px; }

.workload-item {
  display: flex; align-items: center; gap: 10px;
}

.workload-name { font-size: 12.5px; color: var(--text-primary); min-width: 110px; }
.workload-bar-wrap { flex: 1; background: var(--bg-surface); border-radius: 3px; height: 6px; overflow: hidden; }
.workload-bar-fill { height: 100%; background: var(--accent); border-radius: 3px; transition: width 0.4s ease; }
.workload-count { font-size: 12px; color: var(--text-muted); min-width: 24px; text-align: right; }

/* --- Activity Feed --- */
.activity-feed { display: flex; flex-direction: column; gap: 0; }

.activity-item {
  display: flex; gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid var(--border-light);
  font-size: 12.5px;
}

.activity-item:last-child { border-bottom: none; }

.activity-time { color: var(--text-muted); min-width: 52px; font-size: 11px; padding-top: 2px; }
.activity-dot  { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); margin-top: 5px; flex-shrink: 0; }
.activity-text { color: var(--text-secondary); flex: 1; }

/* Responsive dashboard */
@media (max-width: 1200px) {
  .stat-cards { grid-template-columns: repeat(3, 1fr); }
}

@media (max-width: 900px) {
  .dashboard-grid, .dashboard-grid-3 { grid-template-columns: 1fr; }
  .stat-cards { grid-template-columns: repeat(2, 1fr); }
}


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /* ============================================================
   FinGuard — Alerts Page Styles
   alerts.css: Table, filters, pagination, alert list
   ============================================================ */

/* --- Alerts Page Layout --- */
.alerts-toolbar {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.alerts-toolbar .search-wrap {
  display: flex; align-items: center;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 6px 10px;
  gap: 6px;
  min-width: 220px;
  flex: 1;
  max-width: 320px;
}

.alerts-toolbar .search-wrap input {
  background: none; border: none; outline: none;
  color: var(--text-primary); font-size: 13px;
  width: 100%; font-family: var(--font);
}

.alerts-toolbar .search-wrap input::placeholder { color: var(--text-muted); }

.filter-group {
  display: flex; align-items: center; gap: 6px;
  flex-wrap: wrap;
}

.filter-select {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  font-size: 12.5px;
  padding: 6px 10px;
  font-family: var(--font);
  outline: none;
  cursor: pointer;
  transition: border-color 0.15s;
}

.filter-select:focus { border-color: var(--accent); }

.filter-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.6px;
}

.alerts-count {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-muted);
  white-space: nowrap;
}

/* --- Alert Table --- */
.alerts-table-wrapper {
  border-radius: var(--radius);
  border: 1px solid var(--border);
  overflow: hidden;
  margin-bottom: 16px;
}

.alerts-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.alerts-table thead th {
  background: var(--bg-surface);
  color: var(--text-muted);
  font-size: 10.5px;
  font-weight: 600;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
  user-select: none;
  transition: color 0.15s;
}

.alerts-table thead th:hover { color: var(--text-secondary); }

.alerts-table thead th .sort-icon {
  display: inline-block;
  margin-left: 3px;
  opacity: 0.4;
  font-size: 9px;
}

.alerts-table thead th.sorted .sort-icon { opacity: 1; color: var(--accent); }

.alerts-table tbody tr {
  border-bottom: 1px solid var(--border-light);
  cursor: pointer;
  transition: background 0.1s;
}

.alerts-table tbody tr:last-child { border-bottom: none; }
.alerts-table tbody tr:hover { background: rgba(59,130,246,0.04); }

.alerts-table tbody td {
  padding: 10px 14px;
  vertical-align: middle;
}

/* Alert ID cell */
.alert-id-cell {
  font-family: "SF Mono", "Consolas", monospace;
  font-size: 12.5px;
  font-weight: 700;
  color: var(--accent-hover);
}

/* Amount cell */
.amount-cell {
  font-weight: 700;
  font-size: 13.5px;
  color: var(--text-primary);
  font-family: "SF Mono", "Consolas", monospace;
}

/* Risk score cell */
.risk-score-cell {
  font-weight: 800;
  font-size: 14px;
}

/* Time cell */
.time-cell {
  font-size: 12px;
  color: var(--text-secondary);
}

/* Action cell */
.action-cell {
  display: flex; align-items: center; gap: 6px;
}

/* --- Priority Indicator --- */
.priority-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 4px;
}

.priority-p1 { background: var(--risk-critical); box-shadow: 0 0 4px var(--risk-critical); }
.priority-p2 { background: var(--risk-high); }
.priority-p3 { background: var(--risk-medium); }
.priority-p4 { background: var(--risk-low); }

/* --- Pagination --- */
.pagination {
  display: flex; align-items: center; gap: 4px;
  justify-content: flex-end;
}

.page-btn {
  min-width: 30px; height: 30px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  background: var(--bg-card);
  color: var(--text-secondary);
  font-size: 12px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.page-btn:hover { background: var(--bg-card-hover); color: var(--text-primary); border-color: var(--accent); }
.page-btn.active { background: var(--accent); color: #fff; border-color: var(--accent); }
.page-btn:disabled { opacity: 0.35; cursor: not-allowed; }

.pagination-info {
  font-size: 12px;
  color: var(--text-muted);
  margin-right: 12px;
}

/* --- Quick Stats Row --- */
.alerts-quick-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.quick-stat {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex; align-items: center; gap: 10px;
}

.quick-stat-icon {
  width: 32px; height: 32px;
  border-radius: var(--radius-sm);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px;
  flex-shrink: 0;
}

.quick-stat-val  { font-size: 18px; font-weight: 800; color: var(--text-primary); line-height: 1; }
.quick-stat-lbl  { font-size: 11px; color: var(--text-muted); margin-top: 2px; }

@media (max-width: 900px) {
  .alerts-quick-stats { grid-template-columns: repeat(2, 1fr); }
  .filter-group { gap: 4px; }
}


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /* ============================================================
   FinGuard — Alert Details & Investigation Styles
   details.css: Risk factors, transactions, copilot, audit trail
   ============================================================ */

/* --- Case Header --- */
.case-header {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 20px 24px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.case-id-block { flex-shrink: 0; }

.case-id {
  font-size: 28px;
  font-weight: 800;
  color: var(--text-primary);
  font-family: "SF Mono","Consolas", monospace;
  letter-spacing: 0.5px;
  line-height: 1;
}

.case-label {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 4px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
}

.case-risk-block {
  display: flex; align-items: center; gap: 14px;
}

.risk-score-large {
  text-align: center;
  background: var(--risk-critical-bg);
  border: 1px solid rgba(239,68,68,0.3);
  border-radius: var(--radius);
  padding: 10px 18px;
}

.risk-score-large.score-high {
  background: var(--risk-high-bg);
  border-color: rgba(249,115,22,0.3);
}

.risk-score-large.score-medium {
  background: var(--risk-medium-bg);
  border-color: rgba(245,158,11,0.3);
}

.risk-score-large.score-low {
  background: var(--risk-low-bg);
  border-color: rgba(34,197,94,0.3);
}

.risk-score-num {
  font-size: 32px;
  font-weight: 900;
  color: var(--risk-critical);
  line-height: 1;
}

.risk-score-large.score-high .risk-score-num  { color: var(--risk-high); }
.risk-score-large.score-medium .risk-score-num{ color: var(--risk-medium); }
.risk-score-large.score-low .risk-score-num   { color: var(--risk-low); }

.risk-score-label {
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: var(--text-muted);
  margin-top: 2px;
}

.case-meta {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 10px 20px;
}

.case-meta-item { display: flex; flex-direction: column; gap: 2px; }
.case-meta-key  { font-size: 10px; text-transform: uppercase; letter-spacing: 0.7px; color: var(--text-muted); font-weight: 600; }
.case-meta-val  { font-size: 13.5px; color: var(--text-primary); font-weight: 600; }

.case-actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: flex-start; }

/* --- Details Layout --- */
.details-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;
  align-items: start;
}

.details-main { display: flex; flex-direction: column; gap: 20px; }
.details-side { display: flex; flex-direction: column; gap: 20px; }

/* --- Risk Factor Cards --- */
.risk-factors-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.risk-factor-card {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex; flex-direction: column; gap: 6px;
  position: relative;
  overflow: hidden;
}

.risk-factor-card::before {
  content: '';
  position: absolute; left: 0; top: 0; bottom: 0;
  width: 3px;
}

.rfc-critical::before { background: var(--risk-critical); }
.rfc-high::before     { background: var(--risk-high); }
.rfc-medium::before   { background: var(--risk-medium); }
.rfc-low::before      { background: var(--risk-low); }

.rfc-name  { font-size: 12px; font-weight: 600; color: var(--text-primary); }
.rfc-score {
  font-size: 20px; font-weight: 800; line-height: 1;
  color: var(--risk-critical);
}

.rfc-critical .rfc-score { color: var(--risk-critical); }
.rfc-high .rfc-score     { color: var(--risk-high); }
.rfc-medium .rfc-score   { color: var(--risk-medium); }

.rfc-bar-wrap { background: var(--bg-card); border-radius: 2px; height: 4px; }
.rfc-bar      { height: 100%; border-radius: 2px; }
.rfc-critical .rfc-bar { background: var(--risk-critical); }
.rfc-high     .rfc-bar { background: var(--risk-high); }
.rfc-medium   .rfc-bar { background: var(--risk-medium); }

.rfc-desc { font-size: 11px; color: var(--text-muted); line-height: 1.4; }

.rfc-total-card {
  background: var(--risk-critical-bg);
  border: 1px solid rgba(239,68,68,0.3);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: flex; align-items: center; justify-content: space-between;
  grid-column: 1 / -1;
}

.rfc-total-label { font-size: 13px; font-weight: 700; color: var(--text-primary); }
.rfc-total-score { font-size: 24px; font-weight: 900; color: var(--risk-critical); }
.rfc-total-max   { font-size: 14px; color: var(--text-muted); font-weight: 400; }

/* --- Suspicious Transactions --- */
.sus-tx-list { display: flex; flex-direction: column; gap: 8px; }

.sus-tx-item {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-left: 3px solid var(--risk-critical);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 8px 16px;
  align-items: center;
}

.sus-tx-time  { font-family: "SF Mono","Consolas",monospace; font-size: 13px; font-weight: 700; color: var(--risk-critical); white-space: nowrap; }
.sus-tx-info  { display: flex; flex-direction: column; gap: 2px; }
.sus-tx-desc  { font-size: 13px; color: var(--text-primary); font-weight: 600; }
.sus-tx-meta  { font-size: 11px; color: var(--text-muted); }
.sus-tx-amount{ font-size: 16px; font-weight: 800; color: var(--risk-critical); font-family: "SF Mono","Consolas",monospace; white-space: nowrap; }
.sus-tx-badge { }

/* --- Account History Widget --- */
.history-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}

.history-stat-row {
  display: flex; justify-content: space-between; gap: 8px;
  margin-bottom: 14px;
}

.history-stat {
  flex: 1;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 10px 12px;
  text-align: center;
}

.history-stat-val { font-size: 15px; font-weight: 800; color: var(--text-primary); }
.history-stat-lbl { font-size: 10px; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.6px; margin-top: 2px; }

/* Comparison bar */
.compare-bar-wrap {
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  padding: 12px 14px;
  margin-bottom: 12px;
}

.compare-bar-label { font-size: 11px; color: var(--text-secondary); margin-bottom: 6px; }

.compare-bar-track {
  background: var(--bg-card);
  border-radius: 4px;
  height: 8px;
  position: relative;
  overflow: visible;
}

.compare-bar-fill {
  height: 100%;
  border-radius: 4px;
  background: var(--risk-critical);
  position: relative;
}

.compare-bar-marker {
  position: absolute;
  height: 16px; width: 2px;
  background: var(--risk-low);
  top: -4px;
  border-radius: 1px;
}

.compare-bar-meta {
  display: flex; justify-content: space-between;
  margin-top: 5px;
  font-size: 10px; color: var(--text-muted);
}

/* --- Network Mini Section --- */
.network-mini {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}

.network-mini-nodes {
  display: flex; flex-direction: column; gap: 6px;
  margin-top: 10px;
}

.network-node-row {
  display: flex; align-items: center; gap: 8px;
  padding: 8px 10px;
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  font-size: 12px;
  cursor: pointer;
  transition: border-color 0.15s;
}

.network-node-row:hover { border-color: var(--accent); }

.node-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
.node-dot.critical { background: var(--risk-critical); }
.node-dot.high     { background: var(--risk-high); }
.node-dot.medium   { background: var(--risk-medium); }
.node-dot.center   { background: var(--accent); }

.node-name { flex: 1; font-weight: 600; color: var(--text-primary); }
.node-rel  { color: var(--text-muted); font-size: 11px; }
.node-arrow { color: var(--text-muted); font-size: 14px; }

/* --- AI Copilot Panel --- */
.copilot-panel {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  display: flex; flex-direction: column;
  height: 420px;
  overflow: hidden;
}

.copilot-header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--border);
  display: flex; align-items: center; gap: 8px;
}

.copilot-indicator {
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--risk-low);
  box-shadow: 0 0 6px var(--risk-low);
}

.copilot-title { font-size: 13px; font-weight: 700; color: var(--text-primary); }
.copilot-subtitle { font-size: 11px; color: var(--text-muted); margin-left: auto; }

.copilot-messages {
  flex: 1;
  overflow-y: auto;
  padding: 12px 16px;
  display: flex; flex-direction: column; gap: 10px;
}

.msg { display: flex; flex-direction: column; gap: 3px; max-width: 90%; }
.msg-user { align-self: flex-end; align-items: flex-end; }
.msg-ai   { align-self: flex-start; }

.msg-bubble {
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 13px;
  line-height: 1.5;
}

.msg-user .msg-bubble {
  background: var(--accent-dark);
  color: #fff;
  border-bottom-right-radius: 3px;
}

.msg-ai .msg-bubble {
  background: var(--bg-surface);
  color: var(--text-primary);
  border: 1px solid var(--border);
  border-bottom-left-radius: 3px;
}

.msg-meta { font-size: 10px; color: var(--text-muted); }

.demo-label {
  font-size: 10px;
  color: var(--text-muted);
  font-style: italic;
  text-align: center;
  padding: 4px;
  border-top: 1px solid var(--border-light);
}

.copilot-input-area {
  border-top: 1px solid var(--border);
  padding: 10px 12px;
  display: flex; gap: 8px; align-items: flex-end;
}

.copilot-input {
  flex: 1;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  padding: 7px 10px;
  font-size: 13px;
  font-family: var(--font);
  outline: none;
  resize: none;
  min-height: 36px; max-height: 80px;
  line-height: 1.5;
}

.copilot-input:focus { border-color: var(--accent); }

.copilot-send {
  width: 34px; height: 34px;
  border-radius: var(--radius-sm);
  background: var(--accent);
  border: none;
  color: #fff;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  transition: background 0.15s;
}

.copilot-send:hover { background: var(--accent-dark); }

/* Suggested questions */
.suggested-qs {
  display: flex; flex-wrap: wrap; gap: 5px;
  padding: 8px 12px;
  border-top: 1px solid var(--border-light);
}

.suggested-q {
  font-size: 11px;
  color: var(--text-secondary);
  background: var(--bg-surface);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 3px 8px;
  cursor: pointer;
  transition: border-color 0.15s, color 0.15s;
}

.suggested-q:hover { border-color: var(--accent); color: var(--accent); }

/* --- Investigation Notes & Actions --- */
.investigation-actions {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}

.action-buttons-row {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-bottom: 14px;
}

.action-btn {
  display: flex; flex-direction: column; gap: 2px;
  padding: 10px 12px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  cursor: pointer;
  font-family: var(--font);
  text-align: left;
  transition: background 0.15s, border-color 0.15s;
}

.action-btn .action-btn-title { font-size: 13px; font-weight: 700; }
.action-btn .action-btn-desc  { font-size: 10px; line-height: 1.3; }

.action-escalate { background: rgba(239,68,68,0.08); border-color: rgba(239,68,68,0.25); color: var(--risk-critical); }
.action-escalate:hover { background: rgba(239,68,68,0.15); }

.action-monitor { background: rgba(168,85,247,0.08); border-color: rgba(168,85,247,0.25); color: #c084fc; }
.action-monitor:hover { background: rgba(168,85,247,0.15); }

.action-legitimate { background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.25); color: var(--risk-low); }
.action-legitimate:hover { background: rgba(34,197,94,0.15); }

.action-notes { background: rgba(59,130,246,0.08); border-color: rgba(59,130,246,0.25); color: var(--accent-hover); }
.action-notes:hover { background: rgba(59,130,246,0.15); }

.action-btn .action-btn-desc { color: inherit; opacity: 0.7; }

/* --- Audit Trail --- */
.audit-trail {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 16px;
}

.audit-list { display: flex; flex-direction: column; gap: 0; position: relative; }

.audit-list::before {
  content: '';
  position: absolute;
  left: 12px; top: 8px; bottom: 8px;
  width: 1px;
  background: var(--border);
}

.audit-entry {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 8px 0 8px 0;
  position: relative;
}

.audit-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  margin-top: 5px;
  flex-shrink: 0;
  z-index: 1;
  border: 1px solid var(--bg-card);
}

.audit-dot.action-dot  { background: var(--risk-critical); }
.audit-dot.note-dot    { background: var(--accent); }
.audit-dot.system-dot  { background: var(--text-muted); }

.audit-content { flex: 1; }
.audit-time    { font-size: 11px; color: var(--text-muted); margin-bottom: 1px; }
.audit-text    { font-size: 12.5px; color: var(--text-primary); line-height: 1.4; }
.audit-by      { font-size: 11px; color: var(--text-muted); }

/* --- Notes Input --- */
.notes-area {
  width: 100%; margin-bottom: 8px;
  background: var(--bg-input);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-primary);
  padding: 8px 10px;
  font-size: 13px;
  font-family: var(--font);
  resize: vertical; min-height: 70px;
  outline: none;
}

.notes-area:focus { border-color: var(--accent); }

/* --- Responsive Details --- */
@media (max-width: 1100px) {
  .details-grid { grid-template-columns: 1fr; }
  .risk-factors-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .case-header { flex-direction: column; align-items: flex-start; }
  .risk-factors-grid { grid-template-columns: 1fr 1fr; }
  .sus-tx-item { grid-template-columns: auto 1fr; }
  .sus-tx-amount { grid-column: 2; }
  .sus-tx-badge  { grid-column: 2; }
}


### 🤖 Assistant

> 🔧 called: write_file

Now let's create the JavaScript files:

> 🔧 **write_file** — /* ============================================================
   FinGuard — app.js
   Common functionality: sidebar, toast, theme, navigation
   ============================================================ */

// ─── Sidebar Active State ────────────────────────────────────
/**
 * Highlights the correct sidebar link based on current page.
 * @param {string} pageId - e.g. 'dashboard', 'alerts', 'network'
 */
function setActiveSidebar(pageId) {
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.classList.remove('active');
    if (link.dataset.page === pageId) {
      link.classList.add('active');
    }
  });
}

// ─── Toast Notifications ─────────────────────────────────────
/**
 * Show a toast notification.
 * @param {string} message - Text to display
 * @param {'info'|'success'|'warning'|'error'} type
 * @param {number} duration - ms before auto-dismiss (default 3500)
 */
function showToast(message, type = 'info', duration = 3500) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="font-size:14px;font-weight:700;">${icons[type] || icons.info}</span>
    <span style="flex:1;">${message}</span>
    <span style="cursor:pointer;opacity:0.6;font-size:12px;padding-left:8px;" onclick="this.parentElement.remove()">✕</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, duration);
}

// ─── Theme Management ─────────────────────────────────────────
function initTheme() {
  const saved = localStorage.getItem('fg_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('fg_theme', next);
  showToast(`Theme switched to ${next} mode`, 'info', 2000);
}

// ─── Mobile Sidebar Toggle ────────────────────────────────────
function initMobileSidebar() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const sidebar = document.getElementById('sidebar');
  if (!menuBtn || !sidebar) return;

  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside
  document.addEventListener('click', (e) => {
    if (sidebar && !sidebar.contains(e.target) && !menuBtn.contains(e.target)) {
      sidebar.classList.remove('open');
    }
  });
}

// ─── Risk Utilities ───────────────────────────────────────────
/**
 * Get risk level label from a numeric score.
 * @param {number} score
 * @returns {string} 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
 */
function getRiskLevel(score) {
  if (score <= 30) return 'LOW';
  if (score <= 60) return 'MEDIUM';
  if (score <= 80) return 'HIGH';
  return 'CRITICAL';
}

/**
 * Get CSS class suffix for a risk level.
 * @param {string|number} riskOrScore
 * @returns {string}
 */
function getRiskClass(riskOrScore) {
  const level = typeof riskOrScore === 'number'
    ? getRiskLevel(riskOrScore)
    : riskOrScore.toUpperCase();
  const map = { LOW: 'low', MEDIUM: 'medium', HIGH: 'high', CRITICAL: 'critical' };
  return map[level] || 'medium';
}

/**
 * Build a risk badge HTML string.
 * @param {string} level - 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
 * @returns {string} HTML
 */
function updateRiskBadge(level) {
  const cls = getRiskClass(level);
  return `<span class="risk-badge risk-${cls}">${level}</span>`;
}

/**
 * Build a status badge HTML string.
 * @param {string} status
 * @returns {string} HTML
 */
function statusBadge(status) {
  const map = {
    'Open': 'open', 'In Review': 'review', 'Escalated': 'escalated',
    'Monitoring': 'monitoring', 'Closed': 'closed', 'Pending': 'pending'
  };
  const cls = map[status] || 'pending';
  return `<span class="status-badge status-${cls}">${status}</span>`;
}

// ─── Currency Formatter ───────────────────────────────────────
/**
 * Format a number as Indian Rupee string.
 * @param {number} amount
 * @returns {string}
 */
function formatINR(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN');
}

// ─── Date/Time Utilities ──────────────────────────────────────
function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true
  });
}

function timeAgo(dateStr) {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now - then) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

// ─── Navigate to Alert Details ────────────────────────────────
/**
 * Open the alert details page for a given alert ID.
 * @param {string} alertId
 * @param {boolean} fromPages - true if currently inside pages/ folder
 */
function openAlert(alertId, fromPages = false) {
  const path = fromPages
    ? `alert-details.html?id=${alertId}`
    : `pages/alert-details.html?id=${alertId}`;
  window.location.href = path;
}

// ─── URL Query Params ─────────────────────────────────────────
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

// ─── Confirm Dialog ───────────────────────────────────────────
/**
 * Show a simple confirm overlay.
 * @param {string} title
 * @param {string} message
 * @param {function} onConfirm
 * @param {'danger'|'warning'|'info'} type
 */
function showConfirm(title, message, onConfirm, type = 'danger') {
  let overlay = document.getElementById('confirm-overlay');
  if (overlay) overlay.remove();

  const colorMap = { danger: '#ef4444', warning: '#f59e0b', info: '#3b82f6' };
  const color = colorMap[type] || colorMap.info;

  overlay = document.createElement('div');
  overlay.id = 'confirm-overlay';
  overlay.style.cssText = `
    position:fixed;inset:0;background:rgba(0,0,0,0.7);z-index:9998;
    display:flex;align-items:center;justify-content:center;
  `;
  overlay.innerHTML = `
    <div style="background:#1c2230;border:1px solid #2a3347;border-radius:10px;padding:24px;max-width:380px;width:90%;">
      <div style="font-size:16px;font-weight:700;color:#e6edf3;margin-bottom:8px;">${title}</div>
      <div style="font-size:13px;color:#8b99b0;margin-bottom:20px;line-height:1.5;">${message}</div>
      <div style="display:flex;gap:8px;justify-content:flex-end;">
        <button id="confirm-cancel" style="padding:7px 14px;border-radius:6px;border:1px solid #2a3347;background:#161b22;color:#8b99b0;cursor:pointer;font-size:13px;">Cancel</button>
        <button id="confirm-ok" style="padding:7px 14px;border-radius:6px;border:none;background:${color};color:#fff;cursor:pointer;font-size:13px;font-weight:600;">Confirm</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);
  document.getElementById('confirm-cancel').onclick = () => overlay.remove();
  document.getElementById('confirm-ok').onclick = () => { overlay.remove(); onConfirm(); };
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}

// ─── Notification Button ──────────────────────────────────────
function initNotifButton() {
  const btn = document.getElementById('notif-btn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    showToast('3 new critical alerts require immediate review', 'warning', 4000);
  });
}

// ─── Build Sidebar HTML ───────────────────────────────────────
/**
 * Inject the sidebar into any element with id="sidebar".
 * @param {string} activePage
 * @param {string} basePath - '' for root, '../' for pages/
 */
function buildSidebar(activePage, basePath) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const navItems = [
    { id: 'dashboard',      label: 'Dashboard',      icon: dashboardIcon(),  href: basePath + 'index.html' },
    { id: 'alerts',         label: 'Alerts',          icon: alertsIcon(),    href: basePath + 'pages/alerts.html',  badge: '7' },
    { id: 'network',        label: 'Network',         icon: networkIcon(),   href: basePath + 'pages/network.html' },
    { id: 'investigations', label: 'Investigations',  icon: caseIcon(),      href: basePath + 'pages/investigations.html' },
    { id: 'copilot',        label: 'AI Copilot',      icon: aiIcon(),        href: basePath + 'pages/copilot.html' },
    { id: 'reports',        label: 'Reports',         icon: reportsIcon(),   href: basePath + 'pages/reports.html' },
    { id: 'analytics',      label: 'Analytics',       icon: analyticsIcon(), href: basePath + 'pages/analytics.html' },
    { id: 'settings',       label: 'Settings',        icon: settingsIcon(),  href: basePath + 'pages/settings.html' },
  ];

  let navHTML = navItems.map(item => {
    const activeClass = item.id === activePage ? 'active' : '';
    const badge = item.badge ? `<span class="sidebar-badge">${item.badge}</span>` : '';
    return `
      <a href="${item.href}" class="sidebar-link ${activeClass}" data-page="${item.id}">
        ${item.icon}
        <span>${item.label}</span>
        ${badge}
      </a>
    `;
  }).join('');

  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <img src="${basePath}assets/logo.svg" alt="FinGuard Logo" />
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section-label">Investigation</div>
      ${navHTML}
    </nav>
    <div class="sidebar-footer">
      <div class="avatar">SA</div>
      <div class="user-info">
        <div class="user-name">Siddharth A.</div>
        <div class="user-role">Sr. Investigator</div>
      </div>
    </div>
  `;
}

// ─── Sidebar SVG Icons ────────────────────────────────────────
function dashboardIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M2 10a8 8 0 1116 0A8 8 0 012 10zm8-4a1 1 0 00-1 1v3H6a1 1 0 100 2h4a1 1 0 001-1V7a1 1 0 00-1-1z"/></svg>`;
}
function alertsIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>`;
}
function networkIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><circle cx="10" cy="5" r="2"/><circle cx="4" cy="15" r="2"/><circle cx="16" cy="15" r="2"/><line x1="10" y1="7" x2="10" y2="10" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="10" x2="4" y2="13" stroke="currentColor" stroke-width="1.5"/><line x1="10" y1="10" x2="16" y2="13" stroke="currentColor" stroke-width="1.5"/></svg>`;
}
function caseIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"/></svg>`;
}
function aiIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/><path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"/></svg>`;
}
function reportsIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/></svg>`;
}
function analyticsIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>`;
}
function settingsIcon() {
  return `<svg class="nav-icon" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"/></svg>`;
}

// ─── Build Topbar HTML ────────────────────────────────────────
/**
 * @param {string} title - Page title
 * @param {boolean} showSearch
 */
function buildTopbar(title, showSearch = false) {
  const topbar = document.getElementById('topbar');
  if (!topbar) return;

  const searchHTML = showSearch ? `
    <div class="topbar-search">
      <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
      </svg>
      <input type="text" placeholder="Search alerts, accounts..." id="topbar-search-input" />
    </div>
  ` : '';

  topbar.innerHTML = `
    <span class="topbar-title">${title}</span>
    <div class="topbar-spacer"></div>
    ${searchHTML}
    <div class="topbar-actions">
      <button class="icon-btn" id="notif-btn" title="Notifications">
        <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zm0 16a2 2 0 002-2H8a2 2 0 002 2z"/>
        </svg>
        <span class="notif-dot"></span>
      </button>
      <div class="topbar-profile">
        <div class="avatar">SA</div>
        <div>
          <div class="profile-name">Siddharth A.</div>
          <div class="profile-role">Sr. Investigator</div>
        </div>
      </div>
    </div>
  `;

  initNotifButton();
}

// ─── Init on DOM ready ────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileSidebar();
});


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /* ============================================================
   FinGuard — dashboard.js
   Dashboard: synthetic data, charts, stat cards
   ============================================================ */

// ─── Synthetic Dashboard Data ─────────────────────────────────
// Future: replace with GET /api/alerts (summary endpoint)

const DASHBOARD_STATS = {
  total: 143,
  critical: 12,
  high: 28,
  medium: 54,
  low: 49
};

const ALERT_TREND = [
  { day: 'Mon', count: 18, critical: 2 },
  { day: 'Tue', count: 22, critical: 3 },
  { day: 'Wed', count: 15, critical: 1 },
  { day: 'Thu', count: 31, critical: 5 },
  { day: 'Fri', count: 27, critical: 4 },
  { day: 'Sat', count: 14, critical: 1 },
  { day: 'Sun', count: 16, critical: 3 },
];

const RECENT_CRITICAL_ALERTS = [
  { id: 'A001', account: 'ACC-8821', name: 'Rajesh K.', amount: 172000, risk: 94, level: 'CRITICAL', location: 'Mumbai', time: '02:17 AM', status: 'Open' },
  { id: 'A002', account: 'ACC-3345', name: 'Priya M.',  amount: 88500,  risk: 85, level: 'CRITICAL', location: 'Delhi',  time: '11:42 PM', status: 'In Review' },
  { id: 'A003', account: 'ACC-6677', name: 'Arjun S.',  amount: 45000,  risk: 82, level: 'CRITICAL', location: 'Pune',   time: '03:05 AM', status: 'Escalated' },
  { id: 'A004', account: 'ACC-1129', name: 'Nisha P.',  amount: 67300,  risk: 89, level: 'CRITICAL', location: 'Chennai',time: '01:30 AM', status: 'Open' },
  { id: 'A005', account: 'ACC-5512', name: 'Karan V.',  amount: 99900,  risk: 91, level: 'CRITICAL', location: 'Hyderabad', time: '04:20 AM', status: 'Open' },
];

const SUSPICIOUS_ACCOUNTS = [
  { id: 'ACC-8821', name: 'Rajesh K.',  initials: 'RK', risk: 'CRITICAL', alerts: 3 },
  { id: 'ACC-3345', name: 'Priya M.',   initials: 'PM', risk: 'CRITICAL', alerts: 2 },
  { id: 'ACC-9934', name: 'Mohit D.',   initials: 'MD', risk: 'HIGH',     alerts: 5 },
  { id: 'ACC-1122', name: 'Sunita R.',  initials: 'SR', risk: 'HIGH',     alerts: 4 },
  { id: 'ACC-7788', name: 'Ankur J.',   initials: 'AJ', risk: 'MEDIUM',   alerts: 2 },
];

const INVESTIGATOR_WORKLOAD = [
  { name: 'Siddharth A.', cases: 8,  max: 15 },
  { name: 'Pooja N.',     cases: 12, max: 15 },
  { name: 'Vikram S.',    cases: 5,  max: 15 },
  { name: 'Rekha T.',     cases: 10, max: 15 },
  { name: 'Ajay K.',      cases: 7,  max: 15 },
];

const RECENT_ACTIVITY = [
  { time: '02:31', text: 'Alert A001 escalated by Siddharth A.', type: 'action' },
  { time: '02:18', text: 'New CRITICAL alert A005 raised for ACC-5512', type: 'system' },
  { time: '01:45', text: 'Investigation note added on A002 by Pooja N.', type: 'note' },
  { time: '01:30', text: 'New CRITICAL alert A004 raised for ACC-1129', type: 'system' },
  { time: '00:55', text: 'Alert A009 marked as Legitimate by Vikram S.', type: 'action' },
  { time: '00:30', text: 'Network graph reviewed for ACC-8821', type: 'note' },
];

// ─── Render Stat Cards ─────────────────────────────────────────
function renderStatCards() {
  const container = document.getElementById('stat-cards');
  if (!container) return;

  const cards = [
    { type: 'total',    label: 'Total Alerts',    value: DASHBOARD_STATS.total,    change: '+12%', dir: 'up' },
    { type: 'critical', label: 'Critical Alerts',  value: DASHBOARD_STATS.critical, change: '+4',   dir: 'up' },
    { type: 'high',     label: 'High Alerts',      value: DASHBOARD_STATS.high,     change: '+2',   dir: 'up' },
    { type: 'medium',   label: 'Medium Alerts',    value: DASHBOARD_STATS.medium,   change: '-3',   dir: 'down' },
    { type: 'low',      label: 'Low Alerts',       value: DASHBOARD_STATS.low,      change: '+6',   dir: 'up' },
  ];

  container.innerHTML = cards.map(card => `
    <div class="stat-card ${card.type}">
      <div class="stat-label">${card.label}</div>
      <div class="stat-value">${card.value}</div>
      <div class="stat-change ${card.dir}">
        ${card.dir === 'up' ? '▲' : '▼'} ${card.change} vs last week
      </div>
    </div>
  `).join('');
}

// ─── Alert Trend Bar Chart ─────────────────────────────────────
function renderAlertTrendChart() {
  const container = document.getElementById('alert-trend-chart');
  if (!container) return;

  const maxCount = Math.max(...ALERT_TREND.map(d => d.count));
  const chartHeight = 140;

  let html = ALERT_TREND.map(d => {
    const totalPct = Math.round((d.count / maxCount) * chartHeight);
    const critPct  = Math.round((d.critical / maxCount) * chartHeight);
    const normalH  = totalPct - critPct;
    return `
      <div class="bar-group" title="${d.day}: ${d.count} total, ${d.critical} critical">
        <div class="bar-value">${d.count}</div>
        <div style="display:flex;flex-direction:column;width:100%;height:${totalPct}px;">
          <div style="flex:${normalH};background:var(--accent);border-radius:3px 3px 0 0;opacity:0.7;min-height:${normalH>0?2:0}px;"></div>
          <div style="height:${critPct}px;background:var(--risk-critical);min-height:${critPct>0?2:0}px;"></div>
        </div>
        <div class="bar-label">${d.day}</div>
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="bar-chart">${html}</div>
    <div style="display:flex;gap:14px;margin-top:8px;">
      <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-muted);">
        <span style="width:10px;height:10px;background:var(--accent);border-radius:2px;opacity:0.7;display:inline-block;"></span>
        Total Alerts
      </span>
      <span style="display:flex;align-items:center;gap:5px;font-size:11px;color:var(--text-muted);">
        <span style="width:10px;height:10px;background:var(--risk-critical);border-radius:2px;display:inline-block;"></span>
        Critical
      </span>
    </div>
  `;
}

// ─── Risk Distribution Donut Chart (SVG) ──────────────────────
function renderRiskDistributionChart() {
  const container = document.getElementById('risk-distribution-chart');
  if (!container) return;

  const data = [
    { label: 'Critical', count: DASHBOARD_STATS.critical, color: '#ef4444' },
    { label: 'High',     count: DASHBOARD_STATS.high,     color: '#f97316' },
    { label: 'Medium',   count: DASHBOARD_STATS.medium,   color: '#f59e0b' },
    { label: 'Low',      count: DASHBOARD_STATS.low,      color: '#22c55e' },
  ];

  const total = data.reduce((s, d) => s + d.count, 0);
  const cx = 65, cy = 65, r = 50, innerR = 30;
  const circumference = 2 * Math.PI * r;

  let currentAngle = -Math.PI / 2;
  let arcs = '';

  data.forEach(d => {
    const fraction = d.count / total;
    const angle = fraction * 2 * Math.PI;
    const x1 = cx + r * Math.cos(currentAngle);
    const y1 = cy + r * Math.sin(currentAngle);
    const x2 = cx + r * Math.cos(currentAngle + angle);
    const y2 = cy + r * Math.sin(currentAngle + angle);
    const xi1 = cx + innerR * Math.cos(currentAngle);
    const yi1 = cy + innerR * Math.sin(currentAngle);
    const xi2 = cx + innerR * Math.cos(currentAngle + angle);
    const yi2 = cy + innerR * Math.sin(currentAngle + angle);
    const largeArc = angle > Math.PI ? 1 : 0;

    arcs += `
      <path d="M ${x1} ${y1}
               A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}
               L ${xi2} ${yi2}
               A ${innerR} ${innerR} 0 ${largeArc} 0 ${xi1} ${yi1} Z"
            fill="${d.color}" opacity="0.9"/>
    `;
    currentAngle += angle;
  });

  const legendHTML = data.map(d => `
    <div class="legend-item">
      <span class="legend-dot" style="background:${d.color};"></span>
      <span>${d.label}</span>
      <span class="legend-count">${d.count}</span>
    </div>
  `).join('');

  container.innerHTML = `
    <div class="donut-wrapper">
      <svg class="donut-svg" width="130" height="130" viewBox="0 0 130 130">
        ${arcs}
        <text x="${cx}" y="${cy}" text-anchor="middle" dominant-baseline="middle"
              font-size="18" font-weight="800" fill="#e6edf3">${total}</text>
        <text x="${cx}" y="${cy + 16}" text-anchor="middle"
              font-size="9" fill="#57687e" letter-spacing="0.5">ALERTS</text>
      </svg>
      <div class="donut-legend">${legendHTML}</div>
    </div>
  `;
}

// ─── Recent Critical Alerts Table ────────────────────────────
function renderRecentCriticalAlerts() {
  const tbody = document.getElementById('recent-alerts-body');
  if (!tbody) return;

  tbody.innerHTML = RECENT_CRITICAL_ALERTS.map(a => `
    <tr class="alert-row-link" onclick="openAlert('${a.id}', false)">
      <td class="alert-id-cell">${a.id}</td>
      <td>
        <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${a.name}</div>
        <div style="font-size:11px;color:var(--text-muted);">${a.account}</div>
      </td>
      <td class="amount-cell">${formatINR(a.amount)}</td>
      <td>
        <span style="font-size:14px;font-weight:800;color:var(--risk-${getRiskClass(a.level)});">${a.risk}</span>
        <span style="font-size:11px;color:var(--text-muted);">/100</span>
      </td>
      <td>${updateRiskBadge(a.level)}</td>
      <td style="font-size:12px;color:var(--text-secondary);">${a.location}</td>
      <td style="font-size:12px;color:var(--text-muted);">${a.time}</td>
      <td>${statusBadge(a.status)}</td>
      <td>
        <button class="btn btn-sm btn-primary" onclick="event.stopPropagation();openAlert('${a.id}',false)">Review</button>
      </td>
    </tr>
  `).join('');
}

// ─── Suspicious Accounts List ──────────────────────────────────
function renderSuspiciousAccounts() {
  const container = document.getElementById('suspicious-accounts');
  if (!container) return;

  container.innerHTML = SUSPICIOUS_ACCOUNTS.map(acc => `
    <div class="account-item">
      <div class="account-avatar">${acc.initials}</div>
      <div>
        <div class="account-name">${acc.name}</div>
        <div class="account-id">${acc.id} · ${acc.alerts} alert${acc.alerts>1?'s':''}</div>
      </div>
      <div class="account-risk">${updateRiskBadge(acc.risk)}</div>
    </div>
  `).join('');
}

// ─── Investigator Workload ─────────────────────────────────────
function renderWorkload() {
  const container = document.getElementById('investigator-workload');
  if (!container) return;

  container.innerHTML = INVESTIGATOR_WORKLOAD.map(inv => {
    const pct = Math.round((inv.cases / inv.max) * 100);
    const color = pct > 80 ? 'var(--risk-high)' : pct > 60 ? 'var(--risk-medium)' : 'var(--accent)';
    return `
      <div class="workload-item">
        <div class="workload-name">${inv.name}</div>
        <div class="workload-bar-wrap">
          <div class="workload-bar-fill" style="width:${pct}%;background:${color};"></div>
        </div>
        <div class="workload-count">${inv.cases}</div>
      </div>
    `;
  }).join('');
}

// ─── Recent Activity Feed ──────────────────────────────────────
function renderActivityFeed() {
  const container = document.getElementById('activity-feed');
  if (!container) return;

  const dotColors = { action: 'var(--risk-critical)', note: 'var(--accent)', system: 'var(--text-muted)' };

  container.innerHTML = RECENT_ACTIVITY.map(a => `
    <div class="activity-item">
      <div class="activity-time">${a.time}</div>
      <div class="activity-dot" style="background:${dotColors[a.type]};"></div>
      <div class="activity-text">${a.text}</div>
    </div>
  `).join('');
}

// ─── Init Dashboard ───────────────────────────────────────────
function initDashboard() {
  buildSidebar('dashboard', '');
  buildTopbar('Investigation Dashboard', true);

  renderStatCards();
  renderAlertTrendChart();
  renderRiskDistributionChart();
  renderRecentCriticalAlerts();
  renderSuspiciousAccounts();
  renderWorkload();
  renderActivityFeed();
}

document.addEventListener('DOMContentLoaded', initDashboard);


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /* ============================================================
   FinGuard — alerts.js
   Alerts page: data, search, filters, sort, pagination, navigation
   ============================================================ */

// ─── Synthetic Alert Data ─────────────────────────────────────
// Future: replace with GET /api/alerts

const ALL_ALERTS = [
  { id:'A001', txId:'TX-88210001', account:'ACC-8821', name:'Rajesh K.',    amount:172000, risk:94, level:'CRITICAL', location:'Mumbai',    time:'2024-01-15 02:17', status:'Open',       priority:'P1' },
  { id:'A002', txId:'TX-33450001', account:'ACC-3345', name:'Priya M.',     amount:88500,  risk:85, level:'CRITICAL', location:'Delhi',     time:'2024-01-15 23:42', status:'In Review',  priority:'P1' },
  { id:'A003', txId:'TX-66770001', account:'ACC-6677', name:'Arjun S.',     amount:45000,  risk:82, level:'CRITICAL', location:'Pune',      time:'2024-01-16 03:05', status:'Escalated',  priority:'P1' },
  { id:'A004', txId:'TX-11290001', account:'ACC-1129', name:'Nisha P.',     amount:67300,  risk:89, level:'CRITICAL', location:'Chennai',   time:'2024-01-16 01:30', status:'Open',       priority:'P1' },
  { id:'A005', txId:'TX-55120001', account:'ACC-5512', name:'Karan V.',     amount:99900,  risk:91, level:'CRITICAL', location:'Hyderabad', time:'2024-01-16 04:20', status:'Open',       priority:'P1' },
  { id:'A006', txId:'TX-22330001', account:'ACC-2233', name:'Deepa L.',     amount:38000,  risk:76, level:'HIGH',     location:'Bengaluru', time:'2024-01-15 14:22', status:'In Review',  priority:'P2' },
  { id:'A007', txId:'TX-44550001', account:'ACC-4455', name:'Manoj T.',     amount:21500,  risk:72, level:'HIGH',     location:'Kolkata',   time:'2024-01-15 09:11', status:'Open',       priority:'P2' },
  { id:'A008', txId:'TX-77880001', account:'ACC-7788', name:'Ankur J.',     amount:55000,  risk:79, level:'HIGH',     location:'Ahmedabad', time:'2024-01-15 16:48', status:'Monitoring', priority:'P2' },
  { id:'A009', txId:'TX-99100001', account:'ACC-9910', name:'Ritu B.',      amount:12000,  risk:68, level:'HIGH',     location:'Surat',     time:'2024-01-14 11:35', status:'Closed',     priority:'P2' },
  { id:'A010', txId:'TX-11220001', account:'ACC-1122', name:'Sunita R.',    amount:29800,  risk:74, level:'HIGH',     location:'Jaipur',    time:'2024-01-14 20:05', status:'Open',       priority:'P2' },
  { id:'A011', txId:'TX-33660001', account:'ACC-3366', name:'Vivek A.',     amount:9500,   risk:55, level:'MEDIUM',   location:'Lucknow',   time:'2024-01-14 08:22', status:'Open',       priority:'P3' },
  { id:'A012', txId:'TX-55440001', account:'ACC-5544', name:'Pooja N.',     amount:14200,  risk:48, level:'MEDIUM',   location:'Nagpur',    time:'2024-01-13 15:40', status:'In Review',  priority:'P3' },
  { id:'A013', txId:'TX-66550001', account:'ACC-6655', name:'Sanjay M.',    amount:7800,   risk:42, level:'MEDIUM',   location:'Patna',     time:'2024-01-13 12:10', status:'Monitoring', priority:'P3' },
  { id:'A014', txId:'TX-88990001', account:'ACC-8899', name:'Kavita D.',    amount:18500,  risk:58, level:'MEDIUM',   location:'Indore',    time:'2024-01-13 19:55', status:'Open',       priority:'P3' },
  { id:'A015', txId:'TX-00110001', account:'ACC-0011', name:'Harish P.',    amount:32000,  risk:51, level:'MEDIUM',   location:'Bhopal',    time:'2024-01-12 22:30', status:'Closed',     priority:'P3' },
  { id:'A016', txId:'TX-22550001', account:'ACC-2255', name:'Meena S.',     amount:5200,   risk:22, level:'LOW',      location:'Vadodara',  time:'2024-01-12 10:15', status:'Closed',     priority:'P4' },
  { id:'A017', txId:'TX-44770001', account:'ACC-4477', name:'Rohit G.',     amount:4800,   risk:18, level:'LOW',      location:'Coimbatore',time:'2024-01-11 16:05', status:'Closed',     priority:'P4' },
  { id:'A018', txId:'TX-66000001', account:'ACC-6600', name:'Anita C.',     amount:6300,   risk:29, level:'LOW',      location:'Kochi',     time:'2024-01-11 09:40', status:'Closed',     priority:'P4' },
  { id:'A019', txId:'TX-77110001', account:'ACC-7711', name:'Suresh W.',    amount:3100,   risk:15, level:'LOW',      location:'Visakhapatnam', time:'2024-01-10 14:22', status:'Closed', priority:'P4' },
  { id:'A020', txId:'TX-99220001', account:'ACC-9922', name:'Divya R.',     amount:8900,   risk:27, level:'LOW',      location:'Chandigarh',time:'2024-01-10 17:55', status:'Closed',     priority:'P4' },
];

// ─── State ────────────────────────────────────────────────────
let filteredAlerts = [...ALL_ALERTS];
let currentPage = 1;
const PAGE_SIZE = 10;
let sortField = 'risk';
let sortDir = 'desc';

// ─── Filter & Search ──────────────────────────────────────────
function applyFilters() {
  const query  = (document.getElementById('alert-search')?.value || '').toLowerCase();
  const risk   = document.getElementById('filter-risk')?.value || '';
  const status = document.getElementById('filter-status')?.value || '';

  filteredAlerts = ALL_ALERTS.filter(a => {
    const matchSearch = !query ||
      a.id.toLowerCase().includes(query) ||
      a.account.toLowerCase().includes(query) ||
      a.name.toLowerCase().includes(query) ||
      a.location.toLowerCase().includes(query) ||
      a.txId.toLowerCase().includes(query);
    const matchRisk   = !risk   || a.level === risk;
    const matchStatus = !status || a.status === status;
    return matchSearch && matchRisk && matchStatus;
  });

  sortAlerts();
  currentPage = 1;
  renderAlertsTable();
  renderPagination();
  updateAlertCount();
}

// ─── Sort ─────────────────────────────────────────────────────
function sortAlerts() {
  filteredAlerts.sort((a, b) => {
    let va = a[sortField], vb = b[sortField];
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });
}

function setSort(field) {
  if (sortField === field) {
    sortDir = sortDir === 'asc' ? 'desc' : 'asc';
  } else {
    sortField = field;
    sortDir = 'desc';
  }
  sortAlerts();
  renderAlertsTable();
  updateSortHeaders();
}

function updateSortHeaders() {
  document.querySelectorAll('.alerts-table thead th[data-sort]').forEach(th => {
    th.classList.remove('sorted');
    const icon = th.querySelector('.sort-icon');
    if (icon) icon.textContent = '↕';
    if (th.dataset.sort === sortField) {
      th.classList.add('sorted');
      if (icon) icon.textContent = sortDir === 'asc' ? '↑' : '↓';
    }
  });
}

// ─── Pagination ───────────────────────────────────────────────
function renderPagination() {
  const container = document.getElementById('pagination');
  if (!container) return;

  const totalPages = Math.ceil(filteredAlerts.length / PAGE_SIZE);
  if (totalPages <= 1) { container.innerHTML = ''; return; }

  let html = `
    <span class="pagination-info">Page ${currentPage} of ${totalPages}</span>
    <button class="page-btn" ${currentPage===1?'disabled':''} onclick="changePage(${currentPage-1})">‹</button>
  `;

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      html += `<button class="page-btn ${i===currentPage?'active':''}" onclick="changePage(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 2) {
      html += `<span style="color:var(--text-muted);padding:0 2px;">…</span>`;
    }
  }

  html += `<button class="page-btn" ${currentPage===totalPages?'disabled':''} onclick="changePage(${currentPage+1})">›</button>`;
  container.innerHTML = html;
}

function changePage(page) {
  const totalPages = Math.ceil(filteredAlerts.length / PAGE_SIZE);
  if (page < 1 || page > totalPages) return;
  currentPage = page;
  renderAlertsTable();
  renderPagination();
}

// ─── Count Label ──────────────────────────────────────────────
function updateAlertCount() {
  const el = document.getElementById('alert-count');
  if (el) el.textContent = `Showing ${filteredAlerts.length} of ${ALL_ALERTS.length} alerts`;
}

// ─── Render Alerts Table ──────────────────────────────────────
function renderAlertsTable() {
  const tbody = document.getElementById('alerts-tbody');
  if (!tbody) return;

  const start = (currentPage - 1) * PAGE_SIZE;
  const page  = filteredAlerts.slice(start, start + PAGE_SIZE);

  if (page.length === 0) {
    tbody.innerHTML = `
      <tr><td colspan="10">
        <div class="empty-state">
          <svg width="36" height="36" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/></svg>
          <p>No alerts match your filters.</p>
        </div>
      </td></tr>
    `;
    return;
  }

  const priorityDots = { P1: 'priority-p1', P2: 'priority-p2', P3: 'priority-p3', P4: 'priority-p4' };

  tbody.innerHTML = page.map(a => {
    const riskCls = getRiskClass(a.level);
    const timeStr = new Date(a.time).toLocaleString('en-IN', {
      day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit', hour12:true
    });
    return `
      <tr onclick="openAlert('${a.id}', true)">
        <td class="alert-id-cell">${a.id}</td>
        <td class="td-mono">${a.txId}</td>
        <td>
          <div style="font-weight:600;color:var(--text-primary);font-size:13px;">${a.name}</div>
          <div style="font-size:11px;color:var(--text-muted);">${a.account}</div>
        </td>
        <td class="amount-cell">${formatINR(a.amount)}</td>
        <td class="risk-score-cell" style="color:var(--risk-${riskCls});">${a.risk}<span style="font-size:11px;color:var(--text-muted);font-weight:400;">/100</span></td>
        <td>${updateRiskBadge(a.level)}</td>
        <td style="font-size:13px;color:var(--text-secondary);">${a.location}</td>
        <td class="time-cell">${timeStr}</td>
        <td>${statusBadge(a.status)}</td>
        <td>
          <span class="priority-dot ${priorityDots[a.priority]}"></span>
          <span style="font-size:12px;color:var(--text-muted);">${a.priority}</span>
        </td>
      </tr>
    `;
  }).join('');
}

// ─── Quick Stats ──────────────────────────────────────────────
function renderQuickStats() {
  const container = document.getElementById('alerts-quick-stats');
  if (!container) return;

  const critical = ALL_ALERTS.filter(a => a.level === 'CRITICAL').length;
  const open     = ALL_ALERTS.filter(a => a.status === 'Open').length;
  const today    = ALL_ALERTS.filter(a => a.time.startsWith('2024-01-16')).length;
  const avg      = Math.round(ALL_ALERTS.reduce((s,a) => s+a.risk, 0) / ALL_ALERTS.length);

  container.innerHTML = `
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:var(--risk-critical-bg);">🔴</div>
      <div>
        <div class="quick-stat-val" style="color:var(--risk-critical);">${critical}</div>
        <div class="quick-stat-lbl">Critical Alerts</div>
      </div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(59,130,246,0.12);">📋</div>
      <div>
        <div class="quick-stat-val">${open}</div>
        <div class="quick-stat-lbl">Open Alerts</div>
      </div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(245,158,11,0.12);">📅</div>
      <div>
        <div class="quick-stat-val" style="color:var(--risk-medium);">${today}</div>
        <div class="quick-stat-lbl">Today's Alerts</div>
      </div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(34,197,94,0.12);">📊</div>
      <div>
        <div class="quick-stat-val">${avg}</div>
        <div class="quick-stat-lbl">Avg Risk Score</div>
      </div>
    </div>
  `;
}

// ─── Init Alerts Page ─────────────────────────────────────────
function initAlertsPage() {
  buildSidebar('alerts', '../');
  buildTopbar('Suspicious Alerts', false);

  renderQuickStats();
  applyFilters();

  // Search input
  const searchEl = document.getElementById('alert-search');
  if (searchEl) {
    searchEl.addEventListener('input', applyFilters);
  }

  // Filter selects
  ['filter-risk', 'filter-status'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', applyFilters);
  });

  // Sort headers
  document.querySelectorAll('.alerts-table thead th[data-sort]').forEach(th => {
    th.addEventListener('click', () => setSort(th.dataset.sort));
  });

  updateSortHeaders();
}

document.addEventListener('DOMContentLoaded', initAlertsPage);


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /* ============================================================
   FinGuard — details.js
   Alert Details: A001 data, risk factors, audit trail, actions
   ============================================================ */

// ─── A001 Alert Data ──────────────────────────────────────────
// Future: replace with GET /api/alerts/{alert_id}

const ALERTS_DATA = {
  A001: {
    id: 'A001',
    txId: 'TX-88210001',
    account: 'ACC-8821',
    name: 'Rajesh Kumar',
    dob: '1985-03-12',
    kycStatus: 'Verified',
    accountType: 'Savings',
    since: 'Mar 2018',
    risk: 94,
    level: 'CRITICAL',
    status: 'Open',
    assignee: 'Siddharth A.',
    location: 'Mumbai',
    device: 'New iPhone (first use)',
    raisedAt: '2024-01-16 02:17 AM',
    summary: 'Three rapid high-value transactions in 3 minutes from a new device in an unusual city between 02:15–02:17 AM. Total exposure: ₹1,72,000.',

    accountHistory: {
      avgTransaction: 3200,
      maxHistorical: 9800,
      usualLocation: 'Ahmedabad',
      usualDevice: 'Samsung Galaxy A52',
      accountBalance: 74500,
      monthlyAvgCredit: 38000,
      totalTx30Days: 22,
    },

    suspiciousTransactions: [
      { txId: 'TX-88210001', time: '02:15 AM', amount: 42000, location: 'Mumbai', device: 'New iPhone', merchant: 'Online Transfer', type: 'Debit' },
      { txId: 'TX-88210002', time: '02:16 AM', amount: 55000, location: 'Mumbai', device: 'New iPhone', merchant: 'Online Transfer', type: 'Debit' },
      { txId: 'TX-88210003', time: '02:17 AM', amount: 75000, location: 'Mumbai', device: 'New iPhone', merchant: 'Online Transfer', type: 'Debit' },
    ],

    riskFactors: [
      { name: 'Velocity (3 txns/3min)', score: 20, max: 20, severity: 'critical', desc: '3 transactions in 3 minutes — far exceeds normal pattern of 1–2 transactions per day.' },
      { name: 'Amount Anomaly',          score: 20, max: 20, severity: 'critical', desc: 'Amounts 13×–23× above avg (₹3,200). Max historical was ₹9,800.' },
      { name: 'Location Anomaly',        score: 18, max: 20, severity: 'critical', desc: 'Transaction from Mumbai. Account usually active in Ahmedabad.' },
      { name: 'New Device',              score: 15, max: 15, severity: 'critical', desc: 'First-ever use of this iPhone — device ID not seen before on this account.' },
      { name: 'Unusual Time',            score: 12, max: 15, severity: 'high',     desc: '02:15 AM — outside 95% of this account\'s normal transaction hours (8AM–10PM).' },
      { name: 'Network Risk',            score: 9,  max: 10, severity: 'high',     desc: 'Destination accounts flagged in 2 prior unrelated suspicious pattern reviews.' },
    ],

    recentTransactions: [
      { date: '2024-01-16', time: '02:15 AM', desc: 'Online Transfer',      amount: -42000, location: 'Mumbai',      device: 'New iPhone',          status: 'Suspicious' },
      { date: '2024-01-16', time: '02:16 AM', desc: 'Online Transfer',      amount: -55000, location: 'Mumbai',      device: 'New iPhone',          status: 'Suspicious' },
      { date: '2024-01-16', time: '02:17 AM', desc: 'Online Transfer',      amount: -75000, location: 'Mumbai',      device: 'New iPhone',          status: 'Suspicious' },
      { date: '2024-01-14', time: '10:32 AM', desc: 'ATM Withdrawal',        amount: -3000,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-12', time: '03:15 PM', desc: 'UPI Payment - Grocery', amount: -850,   location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-10', time: '11:00 AM', desc: 'Salary Credit',         amount: 38000,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-08', time: '07:55 PM', desc: 'UPI Payment - Zomato',  amount: -320,   location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-05', time: '01:20 PM', desc: 'Online Shopping',       amount: -2400,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2024-01-03', time: '09:45 AM', desc: 'Insurance Premium',     amount: -5500,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
      { date: '2023-12-30', time: '12:00 PM', desc: 'ATM Withdrawal',        amount: -3200,  location: 'Ahmedabad',  device: 'Samsung Galaxy A52',  status: 'Normal' },
    ],

    networkConnections: [
      { id: 'ACC-4421', name: 'Bharat T.',    relation: 'Received ₹42,000', risk: 'critical', note: 'Requires review' },
      { id: 'ACC-5532', name: 'Meena P.',     relation: 'Received ₹55,000', risk: 'high',     note: 'Suspicious relationship' },
      { id: 'ACC-7743', name: 'Vikram R.',    relation: 'Received ₹75,000', risk: 'critical', note: 'Requires review' },
      { id: 'ACC-8812', name: 'Sunita C.',    relation: 'Prior transaction', risk: 'medium',   note: 'Transaction connection' },
    ],
  },

  A002: {
    id: 'A002', txId: 'TX-33450001', account: 'ACC-3345', name: 'Priya Mehta',
    risk: 85, level: 'CRITICAL', status: 'In Review', assignee: 'Pooja N.',
    location: 'Delhi', device: 'Unknown Device', raisedAt: '2024-01-15 11:42 PM',
    summary: 'High-value transfer from new device in unfamiliar location during late hours.',
    riskFactors: [
      { name: 'Amount Anomaly',  score: 22, max: 25, severity: 'critical', desc: 'Amount 18× above average transaction.' },
      { name: 'New Device',      score: 15, max: 15, severity: 'critical', desc: 'First use of unknown device.' },
      { name: 'Unusual Time',    score: 13, max: 15, severity: 'high',     desc: 'Transaction at 11:42 PM.' },
      { name: 'Location Anomaly',score: 18, max: 20, severity: 'critical', desc: 'Account usually used in Pune.' },
      { name: 'Network Risk',    score: 17, max: 25, severity: 'high',     desc: 'Destination flagged previously.' },
    ],
    suspiciousTransactions: [
      { txId: 'TX-33450001', time: '11:42 PM', amount: 88500, location: 'Delhi', device: 'Unknown Device', merchant: 'Online Transfer', type: 'Debit' },
    ],
    recentTransactions: [],
    networkConnections: [],
    accountHistory: { avgTransaction: 4900, maxHistorical: 12000, usualLocation: 'Pune', usualDevice: 'iPhone 12', accountBalance: 92000, monthlyAvgCredit: 55000, totalTx30Days: 18 },
  },
};

// ─── Audit Trail (in memory + localStorage) ──────────────────
const AUDIT_STORAGE_KEY = 'fg_audit_';

function loadAuditTrail(alertId) {
  const stored = localStorage.getItem(AUDIT_STORAGE_KEY + alertId);
  if (stored) return JSON.parse(stored);

  // Default initial entries
  return [
    { time: getCurrentTime(-14), text: 'Alert raised by fraud detection engine', type: 'system' },
    { time: getCurrentTime(-10), text: 'Alert opened by Siddharth A.', type: 'system' },
  ];
}

function saveAuditTrail(alertId, trail) {
  localStorage.setItem(AUDIT_STORAGE_KEY + alertId, JSON.stringify(trail));
}

/**
 * Add an entry to the audit trail and re-render.
 * @param {string} text
 * @param {'action'|'note'|'system'} type
 */
function addAuditLog(text, type = 'system') {
  const alertId = getQueryParam('id') || 'A001';
  const trail = loadAuditTrail(alertId);
  trail.push({ time: getCurrentTime(0), text, type });
  saveAuditTrail(alertId, trail);
  renderAuditTrail(trail);
}

function getCurrentTime(offsetMin = 0) {
  const d = new Date(Date.now() + offsetMin * 60000);
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
}

// ─── Render Functions ─────────────────────────────────────────

function renderCaseHeader(alert) {
  const el = document.getElementById('case-header');
  if (!el) return;

  const riskCls = getRiskClass(alert.level);

  el.innerHTML = `
    <div class="case-id-block">
      <div class="case-id">${alert.id}</div>
      <div class="case-label">Suspicious Alert</div>
    </div>
    <div class="case-risk-block">
      <div class="risk-score-large ${riskCls !== 'critical' ? 'score-'+riskCls : ''}">
        <div class="risk-score-num">${alert.risk}</div>
        <div style="font-size:18px;color:var(--text-muted);line-height:1;">/100</div>
        <div class="risk-score-label">Risk Score</div>
      </div>
      <div>
        ${updateRiskBadge(alert.level)}
        <div style="margin-top:6px;font-size:12px;color:var(--text-muted);">Risk Level</div>
      </div>
    </div>
    <div class="case-meta">
      <div class="case-meta-item"><span class="case-meta-key">Account</span><span class="case-meta-val">${alert.account}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Account Holder</span><span class="case-meta-val">${alert.name}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Location</span><span class="case-meta-val">${alert.location}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Device</span><span class="case-meta-val">${alert.device}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Status</span><span class="case-meta-val">${statusBadge(alert.status)}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Raised At</span><span class="case-meta-val">${alert.raisedAt}</span></div>
      <div class="case-meta-item"><span class="case-meta-key">Assigned To</span><span class="case-meta-val">${alert.assignee}</span></div>
    </div>
    <div class="case-actions">
      <button class="btn btn-danger" onclick="handleAction('escalate')">↑ Escalate</button>
      <button class="btn btn-secondary" onclick="handleAction('monitor')">👁 Monitor</button>
      <button class="btn btn-success" onclick="handleAction('legitimate')">✓ Legitimate</button>
    </div>
  `;
}

function renderSuspiciousTransactions(txList) {
  const el = document.getElementById('sus-tx-list');
  if (!el) return;

  el.innerHTML = txList.map((tx, i) => `
    <div class="sus-tx-item" style="animation-delay:${i*0.08}s">
      <div class="sus-tx-time">${tx.time}</div>
      <div class="sus-tx-info">
        <div class="sus-tx-desc">${tx.merchant} → ${tx.location}</div>
        <div class="sus-tx-meta">${tx.txId} · ${tx.device} · ${tx.type}</div>
      </div>
      <div class="sus-tx-amount">−${formatINR(tx.amount)}</div>
      <div class="sus-tx-badge">${updateRiskBadge('CRITICAL')}</div>
    </div>
  `).join('');

  // Total
  const total = txList.reduce((s, tx) => s + tx.amount, 0);
  el.innerHTML += `
    <div style="display:flex;justify-content:space-between;align-items:center;padding:10px 14px;
                background:var(--risk-critical-bg);border:1px solid rgba(239,68,68,0.25);border-radius:6px;margin-top:4px;">
      <span style="font-size:13px;font-weight:700;color:var(--text-primary);">Total Exposure</span>
      <span style="font-size:18px;font-weight:900;color:var(--risk-critical);font-family:monospace;">−${formatINR(total)}</span>
    </div>
  `;
}

function renderRiskFactors(factors) {
  const el = document.getElementById('risk-factors-grid');
  if (!el) return;

  const total = factors.reduce((s, f) => s + f.score, 0);
  const maxPossible = factors.reduce((s, f) => s + f.max, 0);

  el.innerHTML = factors.map(f => {
    const pct = Math.round((f.score / f.max) * 100);
    return `
      <div class="risk-factor-card rfc-${f.severity}">
        <div class="rfc-name">${f.name}</div>
        <div class="rfc-score">${f.score}<span style="font-size:12px;color:var(--text-muted);font-weight:400;">/${f.max}</span></div>
        <div class="rfc-bar-wrap"><div class="rfc-bar" style="width:${pct}%;"></div></div>
        <div class="rfc-desc">${f.desc}</div>
      </div>
    `;
  }).join('');

  el.innerHTML += `
    <div class="rfc-total-card">
      <div>
        <div class="rfc-total-label">Total Risk Score</div>
        <div style="font-size:11px;color:var(--text-muted);">Sum of all weighted risk factors</div>
      </div>
      <div>
        <span class="rfc-total-score">${total}</span>
        <span class="rfc-total-max">/ ${maxPossible}</span>
      </div>
    </div>
  `;
}

function renderAccountHistory(history) {
  const el = document.getElementById('account-history');
  if (!el) return;

  // max suspicious amount for comparison
  const maxSus = 75000;
  const maxPct  = Math.min(100, Math.round((maxSus / maxSus) * 100));
  const avgPct  = Math.round((history.avgTransaction / maxSus) * 100);
  const histPct = Math.round((history.maxHistorical / maxSus) * 100);

  el.innerHTML = `
    <div class="history-stat-row">
      <div class="history-stat">
        <div class="history-stat-val">${formatINR(history.avgTransaction)}</div>
        <div class="history-stat-lbl">Avg Transaction</div>
      </div>
      <div class="history-stat">
        <div class="history-stat-val">${formatINR(history.maxHistorical)}</div>
        <div class="history-stat-lbl">Max Historical</div>
      </div>
      <div class="history-stat">
        <div class="history-stat-val">${formatINR(history.accountBalance)}</div>
        <div class="history-stat-lbl">Balance</div>
      </div>
    </div>

    <div class="compare-bar-wrap">
      <div class="compare-bar-label" style="display:flex;justify-content:space-between;">
        <span>Transaction Amount Comparison</span>
        <span style="color:var(--risk-critical);font-weight:700;">Suspicious: ₹75,000</span>
      </div>
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:3px;">
          <span>Average (₹3,200)</span><span>${((3200/75000)*100).toFixed(0)}% of suspicious</span>
        </div>
        <div class="compare-bar-track">
          <div class="compare-bar-fill" style="width:${avgPct}%;background:var(--risk-low);"></div>
        </div>
      </div>
      <div style="margin-bottom:10px;">
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:3px;">
          <span>Max Historical (₹9,800)</span><span>${((9800/75000)*100).toFixed(0)}% of suspicious</span>
        </div>
        <div class="compare-bar-track">
          <div class="compare-bar-fill" style="width:${histPct}%;background:var(--risk-medium);"></div>
        </div>
      </div>
      <div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:var(--text-muted);margin-bottom:3px;">
          <span>Suspicious Txn (₹75,000)</span><span style="color:var(--risk-critical);">23.4× above average</span>
        </div>
        <div class="compare-bar-track">
          <div class="compare-bar-fill" style="width:100%;background:var(--risk-critical);"></div>
        </div>
      </div>
    </div>

    <div style="display:flex;gap:10px;font-size:12px;color:var(--text-secondary);">
      <div style="flex:1;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:8px 10px;">
        <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.6px;margin-bottom:3px;">Usual Location</div>
        <div style="font-weight:600;color:var(--text-primary);">${history.usualLocation}</div>
        <div style="font-size:11px;color:var(--risk-critical);margin-top:2px;">⚠ Transaction from Mumbai</div>
      </div>
      <div style="flex:1;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:8px 10px;">
        <div style="font-size:10px;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.6px;margin-bottom:3px;">Usual Device</div>
        <div style="font-weight:600;color:var(--text-primary);">${history.usualDevice}</div>
        <div style="font-size:11px;color:var(--risk-critical);margin-top:2px;">⚠ New iPhone used</div>
      </div>
    </div>
  `;
}

function renderRecentTransactions(txList) {
  const tbody = document.getElementById('recent-tx-tbody');
  if (!tbody) return;

  tbody.innerHTML = txList.map(tx => {
    const isSuspicious = tx.status === 'Suspicious';
    const amtStr = tx.amount > 0
      ? `<span style="color:var(--risk-low);font-weight:700;">+${formatINR(tx.amount)}</span>`
      : `<span style="color:${isSuspicious ? 'var(--risk-critical)' : 'var(--text-primary)'};font-weight:700;">${formatINR(tx.amount)}</span>`;
    return `
      <tr style="${isSuspicious ? 'background:rgba(239,68,68,0.04);' : ''}">
        <td style="font-size:12px;color:var(--text-muted);">${tx.date}</td>
        <td style="font-size:12px;color:var(--text-secondary);">${tx.time}</td>
        <td style="font-weight:${isSuspicious?'600':'400'};color:${isSuspicious?'var(--text-primary)':'var(--text-secondary)'};">${tx.desc}</td>
        <td>${amtStr}</td>
        <td style="font-size:12px;color:var(--text-muted);">${tx.location}</td>
        <td style="font-size:12px;color:var(--text-muted);">${tx.device}</td>
        <td>${isSuspicious ? updateRiskBadge('CRITICAL') : '<span class="status-badge status-closed">Normal</span>'}</td>
      </tr>
    `;
  }).join('');
}

function renderNetworkMini(connections) {
  const el = document.getElementById('network-connections');
  if (!el) return;

  el.innerHTML = connections.map(conn => `
    <div class="network-node-row" onclick="showToast('Opening network view for ${conn.id}', 'info')">
      <span class="node-dot ${conn.risk}"></span>
      <span class="node-name">${conn.name}</span>
      <span class="node-rel">${conn.relation}</span>
      <span style="margin-left:4px;" class="risk-badge risk-${conn.risk === 'critical' ? 'critical' : conn.risk === 'high' ? 'high' : 'medium'}">${conn.note}</span>
      <span class="node-arrow">›</span>
    </div>
  `).join('');
}

function renderAuditTrail(trail) {
  const el = document.getElementById('audit-list');
  if (!el) return;

  const dotClass = { action: 'action-dot', note: 'note-dot', system: 'system-dot' };

  el.innerHTML = trail.map(entry => `
    <div class="audit-entry">
      <div class="audit-dot ${dotClass[entry.type] || 'system-dot'}"></div>
      <div class="audit-content">
        <div class="audit-time">${entry.time}</div>
        <div class="audit-text">${entry.text}</div>
      </div>
    </div>
  `).reverse().join('');
}

// ─── Investigator Actions ─────────────────────────────────────
// Future: POST /api/investigations/{id}/escalate | monitor | dismiss

function handleAction(action) {
  const alertId = getQueryParam('id') || 'A001';
  const messages = {
    escalate:   { text: 'Alert escalated to Senior Investigator / Compliance Team.', type: 'action', toast: 'Alert escalated successfully.', toastType: 'warning' },
    monitor:    { text: 'Alert placed under active monitoring.', type: 'action', toast: 'Alert set to Monitoring mode.', toastType: 'info' },
    legitimate: { text: 'Investigator decision: Marked as Legitimate after review.', type: 'action', toast: 'Alert marked as Legitimate and closed.', toastType: 'success' },
  };

  const m = messages[action];
  if (!m) return;

  showConfirm(
    `Confirm: ${action.charAt(0).toUpperCase() + action.slice(1)}`,
    `Are you sure you want to ${action} this alert? This action will be recorded in the audit trail.`,
    () => {
      addAuditLog(`Investigator action: ${m.text} — by Siddharth A.`, 'action');
      showToast(m.toast, m.toastType);
    },
    action === 'escalate' ? 'danger' : action === 'legitimate' ? 'info' : 'warning'
  );
}

function handleAddNote() {
  const textarea = document.getElementById('notes-input');
  if (!textarea) return;
  const note = textarea.value.trim();
  if (!note) { showToast('Please enter a note first.', 'warning'); return; }
  addAuditLog(`Note: "${note}" — by Siddharth A.`, 'note');
  textarea.value = '';
  showToast('Note added to investigation.', 'success');
}

// ─── AI Copilot (details page inline) ────────────────────────
const DETAIL_COPILOT_RESPONSES = {
  'why critical': 'This alert is CRITICAL (94/100) due to a combination of: (1) 3 rapid transactions in 3 minutes totalling ₹1,72,000, (2) amounts 13–23× above the account average of ₹3,200, (3) first-ever use of an iPhone when the registered device is a Samsung Galaxy A52, and (4) transactions from Mumbai despite the account being used exclusively in Ahmedabad.',
  'unusual': 'Compared to account history: Average transaction is ₹3,200; these three transactions are ₹42,000, ₹55,000, and ₹75,000 — between 13× and 23× the historical average. The maximum historical transaction was ₹9,800. The velocity (3 transactions in 3 minutes) is entirely unprecedented on this account.',
  'last 10': 'The 10 most recent transactions are shown in the "Recent Transaction History" table. 3 are flagged as Suspicious (the 3 rapid transfers from Mumbai). The remaining 7 are normal transactions from Ahmedabad using the Samsung device.',
  'network': 'Three destination accounts (ACC-4421, ACC-5532, ACC-7743) received the suspicious funds. ACC-4421 and ACC-7743 require review based on prior pattern analysis. These relationships are flagged as "Suspicious" — further investigation of recipient accounts is recommended.',
  'risk factors': 'The top contributing risk factors are: Velocity (20/20) and Amount Anomaly (20/20) — both maxed out. Location Anomaly (18/20), New Device (15/15), Unusual Time (12/15), and Network Risk (9/10) round out the score for a total of 94/100.',
  'summarize': 'Case A001 — CRITICAL (94/100): Account ACC-8821 (Rajesh Kumar) had 3 rapid online transfers at 02:15–02:17 AM from Mumbai using a new iPhone. Total exposure: ₹1,72,000. This is 53× the account\'s average daily spend. All major risk indicators are triggered. Immediate review and investigator decision required.',
  'next steps': 'Recommended next actions: (1) Contact account holder to verify whether these transactions were authorized. (2) Place a temporary hold on further transfers pending confirmation. (3) Review recipient accounts ACC-4421, ACC-5532, and ACC-7743 for suspicious patterns. (4) Submit escalation if holder cannot be reached within 2 hours.',
};

function sendDetailCopilotMessage() {
  const input = document.getElementById('detail-copilot-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;

  appendDetailMessage(msg, 'user');
  input.value = '';

  // Demo response matching
  setTimeout(() => {
    const msgLower = msg.toLowerCase();
    let response = 'I can answer questions about this alert. Try asking: "Why is this critical?", "What is unusual?", "Summarize this case", "What are the next steps?", or "Explain the risk factors."';

    for (const [key, val] of Object.entries(DETAIL_COPILOT_RESPONSES)) {
      if (msgLower.includes(key)) { response = val; break; }
    }

    appendDetailMessage(response, 'ai');
    addAuditLog('AI Copilot explanation reviewed by investigator', 'note');
  }, 500);
}

function appendDetailMessage(text, role) {
  const container = document.getElementById('detail-copilot-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = `msg msg-${role}`;
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });
  div.innerHTML = `
    <div class="msg-bubble">${text}</div>
    <div class="msg-meta">${role === 'ai' ? '🤖 AI Copilot · ' : 'You · '}${time}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function useSuggestedQuestion(q) {
  const input = document.getElementById('detail-copilot-input');
  if (!input) return;
  input.value = q;
  sendDetailCopilotMessage();
}

// ─── Init Details Page ────────────────────────────────────────
function initDetailsPage() {
  buildSidebar('alerts', '../');
  buildTopbar('Alert Investigation', false);

  const alertId = getQueryParam('id') || 'A001';
  const alert = ALERTS_DATA[alertId];

  if (!alert) {
    document.getElementById('case-header').innerHTML = `
      <div class="empty-state"><p>Alert <strong>${alertId}</strong> not found. <a href="alerts.html">Back to Alerts</a></p></div>
    `;
    return;
  }

  // Render sections
  renderCaseHeader(alert);
  if (alert.suspiciousTransactions?.length) renderSuspiciousTransactions(alert.suspiciousTransactions);
  if (alert.riskFactors?.length)            renderRiskFactors(alert.riskFactors);
  if (alert.accountHistory)                 renderAccountHistory(alert.accountHistory);
  if (alert.recentTransactions?.length)     renderRecentTransactions(alert.recentTransactions);
  if (alert.networkConnections?.length)     renderNetworkMini(alert.networkConnections);

  const trail = loadAuditTrail(alertId);
  renderAuditTrail(trail);
  addAuditLog(`Alert ${alertId} details viewed by Siddharth A.`, 'system');

  // Initial AI greeting
  setTimeout(() => {
    appendDetailMessage(
      `Alert <strong>${alertId}</strong> loaded. Risk Score: <strong>${alert.risk}/100 — ${alert.level}</strong>. ${alert.summary} Ask me anything about this case.`,
      'ai'
    );
  }, 300);

  // Copilot enter key
  const input = document.getElementById('detail-copilot-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendDetailCopilotMessage();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initDetailsPage);


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /* ============================================================
   FinGuard — network.js
   Network visualization: SVG graph, nodes, edges, interactions
   ============================================================ */

// ─── Network Data ─────────────────────────────────────────────
// Future: replace with GET /api/accounts/{account_id}/network

const NETWORK_DATA = {
  central: {
    id: 'ACC-8821', name: 'Rajesh K.', initials: 'RK',
    risk: 'critical', label: 'Subject Account'
  },
  nodes: [
    { id: 'ACC-4421', name: 'Bharat T.',   initials: 'BT', risk: 'critical', relation: 'Requires review',        amount: 42000,  txCount: 1, distance: 1 },
    { id: 'ACC-5532', name: 'Meena P.',    initials: 'MP', risk: 'high',     relation: 'Suspicious relationship', amount: 55000,  txCount: 1, distance: 1 },
    { id: 'ACC-7743', name: 'Vikram R.',   initials: 'VR', risk: 'critical', relation: 'Requires review',         amount: 75000,  txCount: 1, distance: 1 },
    { id: 'ACC-8812', name: 'Sunita C.',   initials: 'SC', risk: 'medium',   relation: 'Transaction connection',  amount: 12000,  txCount: 3, distance: 1 },
    { id: 'ACC-3301', name: 'Employer',    initials: 'EM', risk: 'low',      relation: 'Salary credit',           amount: 38000,  txCount: 12,distance: 1 },
    { id: 'ACC-9921', name: 'Raju D.',     initials: 'RD', risk: 'high',     relation: 'Requires review',         amount: 30000,  txCount: 2, distance: 2 },
    { id: 'ACC-2211', name: 'Anita S.',    initials: 'AS', risk: 'medium',   relation: 'Transaction connection',  amount: 18000,  txCount: 2, distance: 2 },
  ]
};

// ─── Color Map ────────────────────────────────────────────────
const RISK_COLORS = {
  critical: '#ef4444',
  high:     '#f97316',
  medium:   '#f59e0b',
  low:      '#22c55e',
  center:   '#3b82f6'
};

// ─── Layout Positions (calculated for SVG canvas 800×500) ─────
function computeLayout(width, height) {
  const cx = width / 2;
  const cy = height / 2;
  const r1 = Math.min(width, height) * 0.28;  // 1st ring
  const r2 = Math.min(width, height) * 0.44;  // 2nd ring

  const ring1 = NETWORK_DATA.nodes.filter(n => n.distance === 1);
  const ring2 = NETWORK_DATA.nodes.filter(n => n.distance === 2);

  const positions = {};
  positions['ACC-8821'] = { x: cx, y: cy };

  ring1.forEach((n, i) => {
    const angle = (2 * Math.PI * i / ring1.length) - Math.PI / 2;
    positions[n.id] = {
      x: cx + r1 * Math.cos(angle),
      y: cy + r1 * Math.sin(angle)
    };
  });

  ring2.forEach((n, i) => {
    const angle = (2 * Math.PI * i / ring2.length) - Math.PI / 4;
    positions[n.id] = {
      x: cx + r2 * Math.cos(angle),
      y: cy + r2 * Math.sin(angle)
    };
  });

  return positions;
}

// ─── Render SVG Network ───────────────────────────────────────
function renderNetwork() {
  const container = document.getElementById('network-svg-container');
  if (!container) return;

  const W = container.clientWidth || 780;
  const H = 480;
  const positions = computeLayout(W, H);

  let edgeSVG = '';
  let nodeSVG = '';
  let labelSVG = '';

  // Draw edges from center
  NETWORK_DATA.nodes.forEach(node => {
    const from = positions['ACC-8821'];
    const to   = positions[node.id];
    if (!from || !to) return;

    // Arrow direction
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const len = Math.sqrt(dx*dx + dy*dy);
    const ux = dx / len, uy = dy / len;
    const r = 22;

    const x1 = from.x + ux * r;
    const y1 = from.y + uy * r;
    const x2 = to.x - ux * r;
    const y2 = to.y - uy * r;

    // Shade by risk
    const col = RISK_COLORS[node.risk] || '#3b82f6';
    const opacity = node.distance === 1 ? 0.5 : 0.25;

    // Draw only money-flow edges (distance 1 critical/high = suspicious)
    if (node.risk === 'critical' || node.risk === 'high') {
      // Dashed line for suspicious
      edgeSVG += `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="${col}" stroke-width="1.5" stroke-dasharray="5,4" opacity="${opacity}"
              marker-end="url(#arrow-${node.risk})"/>
      `;
    } else {
      edgeSVG += `
        <line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"
              stroke="#2a3347" stroke-width="1" opacity="0.6"/>
      `;
    }

    // Amount label on edge (only distance 1)
    if (node.distance === 1 && node.amount > 0) {
      const mx = (from.x + to.x) / 2;
      const my = (from.y + to.y) / 2;
      edgeSVG += `
        <text x="${mx}" y="${my - 6}" text-anchor="middle"
              font-size="10" fill="${col}" font-family="-apple-system,sans-serif" opacity="0.9">
          ₹${(node.amount/1000).toFixed(0)}K
        </text>
      `;
    }
  });

  // Also draw ring2 to their nearest ring1 neighbor (simplified)
  const ring2Edges = [
    { from: 'ACC-9921', to: 'ACC-4421' },
    { from: 'ACC-2211', to: 'ACC-5532' },
  ];

  ring2Edges.forEach(e => {
    const from = positions[e.from];
    const to   = positions[e.to];
    if (!from || !to) return;
    edgeSVG += `<line x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" stroke="#2a3347" stroke-width="1" stroke-dasharray="3,3" opacity="0.5"/>`;
  });

  // Draw nodes
  const allNodes = [
    { ...NETWORK_DATA.central, distance: 0, isCenter: true },
    ...NETWORK_DATA.nodes
  ];

  allNodes.forEach(node => {
    const pos = positions[node.id];
    if (!pos) return;

    const color = node.isCenter ? RISK_COLORS.center : RISK_COLORS[node.risk];
    const r = node.isCenter ? 26 : 20;
    const strokeW = node.isCenter ? 2.5 : 1.5;

    nodeSVG += `
      <g class="network-node" data-id="${node.id}" onclick="selectNetworkNode('${node.id}')"
         style="cursor:pointer;">
        <circle cx="${pos.x}" cy="${pos.y}" r="${r + 6}" fill="${color}" opacity="0.06"/>
        <circle cx="${pos.x}" cy="${pos.y}" r="${r}"
                fill="${color}" fill-opacity="0.18"
                stroke="${color}" stroke-width="${strokeW}"/>
        <text x="${pos.x}" y="${pos.y + 1}" text-anchor="middle" dominant-baseline="middle"
              font-size="${node.isCenter ? 11 : 9}" font-weight="700"
              fill="#e6edf3" font-family="-apple-system,sans-serif">${node.initials}</text>
      </g>
    `;

    // Label below node
    const labelY = pos.y + r + 14;
    labelSVG += `
      <text x="${pos.x}" y="${labelY}" text-anchor="middle"
            font-size="10" fill="#8b99b0" font-family="-apple-system,sans-serif"
            pointer-events="none">${node.name}</text>
    `;
    if (node.isCenter) {
      labelSVG += `
        <text x="${pos.x}" y="${labelY + 12}" text-anchor="middle"
              font-size="9" fill="#3b82f6" font-family="-apple-system,sans-serif"
              pointer-events="none">Subject</text>
      `;
    }
  });

  // Arrow markers
  const markerDefs = ['critical','high','medium'].map(risk => `
    <marker id="arrow-${risk}" markerWidth="8" markerHeight="8"
            refX="6" refY="3" orient="auto">
      <path d="M0,0 L0,6 L8,3 Z" fill="${RISK_COLORS[risk]}" opacity="0.7"/>
    </marker>
  `).join('');

  container.innerHTML = `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" id="network-svg"
         style="display:block;background:var(--bg-surface);border-radius:var(--radius);">
      <defs>${markerDefs}</defs>
      ${edgeSVG}
      ${nodeSVG}
      ${labelSVG}
    </svg>
  `;
}

// ─── Node Selection ───────────────────────────────────────────
let selectedNode = null;

function selectNetworkNode(nodeId) {
  selectedNode = nodeId;

  const node = nodeId === 'ACC-8821'
    ? { ...NETWORK_DATA.central, relation: 'Subject Account', amount: 172000, txCount: 3 }
    : NETWORK_DATA.nodes.find(n => n.id === nodeId);

  if (!node) return;

  const panel = document.getElementById('node-detail-panel');
  if (!panel) return;

  const riskBadge = updateRiskBadge(node.risk?.toUpperCase() || 'MEDIUM');

  panel.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px;">
      <div style="width:44px;height:44px;border-radius:50%;background:${RISK_COLORS[node.risk||'low']};
                  opacity:0.8;display:flex;align-items:center;justify-content:center;
                  font-size:14px;font-weight:800;color:#fff;">${node.initials}</div>
      <div>
        <div style="font-size:15px;font-weight:700;color:var(--text-primary);">${node.name}</div>
        <div style="font-size:11px;color:var(--text-muted);">${node.id}</div>
      </div>
      <div style="margin-left:auto;">${riskBadge}</div>
    </div>
    <div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;">
      <div style="display:flex;justify-content:space-between;">
        <span style="color:var(--text-muted);">Relationship</span>
        <span style="color:var(--text-primary);font-weight:600;">${node.relation || '—'}</span>
      </div>
      ${node.amount ? `
      <div style="display:flex;justify-content:space-between;">
        <span style="color:var(--text-muted);">Amount Transferred</span>
        <span style="color:var(--risk-critical);font-weight:700;">${formatINR(node.amount)}</span>
      </div>` : ''}
      ${node.txCount ? `
      <div style="display:flex;justify-content:space-between;">
        <span style="color:var(--text-muted);">Connected Transactions</span>
        <span style="font-weight:600;">${node.txCount}</span>
      </div>` : ''}
      <div style="display:flex;justify-content:space-between;">
        <span style="color:var(--text-muted);">Risk Level</span>
        <span>${riskBadge}</span>
      </div>
    </div>
    <div style="margin-top:10px;padding:8px 10px;background:var(--bg-surface);border-radius:6px;
                border-left:3px solid ${RISK_COLORS[node.risk||'low']};font-size:12px;color:var(--text-secondary);">
      ⚠ This is a transaction connection. Investigator review required before any conclusion.
    </div>
    <button class="btn btn-primary btn-sm" style="margin-top:10px;width:100%;"
            onclick="showToast('Opening investigation for ${node.id}', 'info')">
      Investigate Account
    </button>
  `;

  // Highlight selected node in SVG
  document.querySelectorAll('.network-node circle').forEach(c => {
    c.style.filter = '';
  });

  const svgNode = document.querySelector(`.network-node[data-id="${nodeId}"] circle:nth-of-type(2)`);
  if (svgNode) svgNode.style.filter = 'brightness(1.4)';
}

// ─── Filter Network by Risk ───────────────────────────────────
function filterNetwork(risk) {
  const buttons = document.querySelectorAll('.network-filter-btn');
  buttons.forEach(b => b.classList.remove('active'));
  const activeBtn = document.querySelector(`.network-filter-btn[data-risk="${risk}"]`);
  if (activeBtn) activeBtn.classList.add('active');

  if (risk === 'all') {
    renderNetworkNodeList(NETWORK_DATA.nodes);
  } else {
    renderNetworkNodeList(NETWORK_DATA.nodes.filter(n => n.risk === risk));
  }
}

function renderNetworkNodeList(nodes) {
  const list = document.getElementById('network-node-list');
  if (!list) return;

  list.innerHTML = [
    { ...NETWORK_DATA.central, relation: 'Subject Account (Center)', distance: 0 },
    ...nodes
  ].map(node => `
    <div class="network-node-row" onclick="selectNetworkNode('${node.id}')"
         style="${node.id === selectedNode ? 'border-color:var(--accent);background:rgba(59,130,246,0.06);' : ''}">
      <span class="node-dot ${node.risk || 'center'}"></span>
      <div style="flex:1;">
        <div style="font-size:13px;font-weight:600;color:var(--text-primary);">${node.name}</div>
        <div style="font-size:11px;color:var(--text-muted);">${node.id}</div>
      </div>
      <span style="font-size:11px;color:var(--text-muted);">${node.relation || 'Subject'}</span>
      <span class="node-arrow">›</span>
    </div>
  `).join('');
}

// ─── Init Network Page ────────────────────────────────────────
function initNetworkPage() {
  buildSidebar('network', '../');
  buildTopbar('Account Network', false);

  renderNetwork();
  renderNetworkNodeList(NETWORK_DATA.nodes);

  // Select central node by default
  setTimeout(() => selectNetworkNode('ACC-8821'), 100);

  // Filter buttons
  document.querySelectorAll('.network-filter-btn').forEach(btn => {
    btn.addEventListener('click', () => filterNetwork(btn.dataset.risk));
  });

  // Resize
  window.addEventListener('resize', () => {
    renderNetwork();
  });
}

document.addEventListener('DOMContentLoaded', initNetworkPage);


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — /* ============================================================
   FinGuard — copilot.js
   AI Copilot: chat interface, demo responses, suggested prompts
   ============================================================ */

// ─── Demo Responses Database ──────────────────────────────────
// Future: replace with POST /api/copilot/chat (LLM backend)
// NOTE: These are predefined demonstration responses only.
// Connect a backend LLM API for production use.

const COPILOT_RESPONSES = {
  'why is this transaction critical': `
    <strong>Alert A001 is classified CRITICAL (94/100)</strong> due to six compounding risk factors:<br><br>
    1. <strong>Velocity (20/20):</strong> 3 transactions in 3 minutes — never seen on this account before.<br>
    2. <strong>Amount Anomaly (20/20):</strong> ₹42K, ₹55K, ₹75K vs average ₹3,200 — up to 23× above normal.<br>
    3. <strong>Location Anomaly (18/20):</strong> Mumbai, while account is used exclusively in Ahmedabad.<br>
    4. <strong>New Device (15/15):</strong> First-ever iPhone seen on this account (usually Samsung Galaxy A52).<br>
    5. <strong>Unusual Time (12/15):</strong> 02:15 AM — outside 95% of account's normal hours.<br>
    6. <strong>Network Risk (9/10):</strong> Destination accounts have prior suspicious pattern flags.
  `,
  'unusual compared with account history': `
    <strong>Key anomalies vs account history for ACC-8821:</strong><br><br>
    • <strong>Amount:</strong> Avg ₹3,200 → suspicious txns ₹42K–₹75K (13×–23× above average)<br>
    • <strong>Max ever seen:</strong> ₹9,800 → now ₹75,000 (7.6× above max historical)<br>
    • <strong>Location:</strong> 100% Ahmedabad historically → sudden Mumbai activity<br>
    • <strong>Device:</strong> Samsung Galaxy A52 (all prior txns) → unknown iPhone<br>
    • <strong>Time:</strong> Normally 8AM–10PM → 02:15 AM transaction<br>
    • <strong>Velocity:</strong> Normally 1–2 txns/day → 3 txns in 3 minutes
  `,
  'last 10 transactions': `
    <strong>Last 10 transactions on ACC-8821:</strong><br><br>
    <table style="width:100%;font-size:12px;border-collapse:collapse;">
      <tr style="color:#8b99b0;border-bottom:1px solid #2a3347;"><th style="text-align:left;padding:3px 6px;">Date</th><th style="text-align:left;padding:3px 6px;">Description</th><th style="text-align:right;padding:3px 6px;">Amount</th><th style="text-align:left;padding:3px 6px;">Status</th></tr>
      <tr style="background:rgba(239,68,68,0.06);"><td style="padding:3px 6px;">Jan 16</td><td style="padding:3px 6px;">Online Transfer (Mumbai)</td><td style="padding:3px 6px;text-align:right;color:#ef4444;">−₹42,000</td><td style="padding:3px 6px;color:#ef4444;">⚠ Suspicious</td></tr>
      <tr style="background:rgba(239,68,68,0.06);"><td style="padding:3px 6px;">Jan 16</td><td style="padding:3px 6px;">Online Transfer (Mumbai)</td><td style="padding:3px 6px;text-align:right;color:#ef4444;">−₹55,000</td><td style="padding:3px 6px;color:#ef4444;">⚠ Suspicious</td></tr>
      <tr style="background:rgba(239,68,68,0.06);"><td style="padding:3px 6px;">Jan 16</td><td style="padding:3px 6px;">Online Transfer (Mumbai)</td><td style="padding:3px 6px;text-align:right;color:#ef4444;">−₹75,000</td><td style="padding:3px 6px;color:#ef4444;">⚠ Suspicious</td></tr>
      <tr><td style="padding:3px 6px;">Jan 14</td><td style="padding:3px 6px;">ATM Withdrawal</td><td style="padding:3px 6px;text-align:right;">−₹3,000</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 12</td><td style="padding:3px 6px;">UPI - Grocery</td><td style="padding:3px 6px;text-align:right;">−₹850</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 10</td><td style="padding:3px 6px;">Salary Credit</td><td style="padding:3px 6px;text-align:right;color:#22c55e;">+₹38,000</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 08</td><td style="padding:3px 6px;">UPI - Zomato</td><td style="padding:3px 6px;text-align:right;">−₹320</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 05</td><td style="padding:3px 6px;">Online Shopping</td><td style="padding:3px 6px;text-align:right;">−₹2,400</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Jan 03</td><td style="padding:3px 6px;">Insurance Premium</td><td style="padding:3px 6px;text-align:right;">−₹5,500</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
      <tr><td style="padding:3px 6px;">Dec 30</td><td style="padding:3px 6px;">ATM Withdrawal</td><td style="padding:3px 6px;text-align:right;">−₹3,200</td><td style="padding:3px 6px;color:#22c55e;">Normal</td></tr>
    </table>
  `,
  'explain the network': `
    <strong>Account Network for ACC-8821 (Alert A001):</strong><br><br>
    The suspicious funds were transferred to 3 accounts:<br><br>
    • <strong>ACC-4421 (Bharat T.)</strong> — received ₹42,000 — flagged: <em>Requires review</em><br>
    • <strong>ACC-5532 (Meena P.)</strong> — received ₹55,000 — flagged: <em>Suspicious relationship</em><br>
    • <strong>ACC-7743 (Vikram R.)</strong> — received ₹75,000 — flagged: <em>Requires review</em><br><br>
    These accounts have been involved in prior unrelated suspicious pattern reviews. A second-hop analysis shows ACC-9921 and ACC-2211 are connected to some of these accounts.<br><br>
    <em>Note: Connection does not constitute guilt. These accounts require independent investigation.</em>
  `,
  'risk factors contributed most': `
    <strong>Top risk factors by weighted score for A001:</strong><br><br>
    1. 🔴 <strong>Velocity (20/20)</strong> — Maximum score. 3 txns in 3 minutes.<br>
    2. 🔴 <strong>Amount Anomaly (20/20)</strong> — Maximum score. 23× above average.<br>
    3. 🔴 <strong>Location Anomaly (18/20)</strong> — Near-maximum. Mumbai vs Ahmedabad.<br>
    4. 🔴 <strong>New Device (15/15)</strong> — Maximum score. First-time iPhone.<br>
    5. 🟠 <strong>Unusual Time (12/15)</strong> — High score. 02:15 AM activity.<br>
    6. 🟠 <strong>Network Risk (9/10)</strong> — High score. Connected flagged accounts.<br><br>
    <strong>Total: 94/100</strong> — CRITICAL threshold crossed (>80).
  `,
  'summarize this case': `
    <strong>Investigation Summary — Case A001</strong><br><br>
    <strong>Account:</strong> ACC-8821 | Rajesh Kumar | Savings Account since 2018<br>
    <strong>Risk Score:</strong> 94/100 — CRITICAL<br>
    <strong>Status:</strong> Open — Awaiting Investigator Decision<br><br>
    <strong>Key Facts:</strong><br>
    • 3 rapid online transfers at 02:15–02:17 AM on Jan 16, 2024<br>
    • Total exposure: ₹1,72,000 (account balance: ₹74,500)<br>
    • 23× above account's average transaction amount (₹3,200)<br>
    • Transacted from Mumbai — account always used in Ahmedabad<br>
    • Used a new iPhone — registered device is Samsung Galaxy A52<br>
    • Receiving accounts flagged for prior suspicious patterns<br><br>
    <strong>AI Assessment:</strong> High probability of unauthorized access. Immediate investigator review and account holder contact recommended. This is an AI-assisted summary — final decision rests with the human investigator.
  `,
  'what evidence should i review next': `
    <strong>Recommended evidence review checklist for A001:</strong><br><br>
    ✅ <strong>1. Contact account holder</strong> — Verify if transactions were authorized<br>
    📋 <strong>2. Review device registration logs</strong> — Check when/where the new iPhone was first registered<br>
    🌐 <strong>3. IP address & location data</strong> — Confirm geolocation of transactions<br>
    🔗 <strong>4. Investigate recipient accounts</strong> — ACC-4421, ACC-5532, ACC-7743<br>
    📞 <strong>5. Check login history</strong> — Any unusual login before 02:15 AM?<br>
    📊 <strong>6. Review velocity pattern</strong> — Any similar rapid transfers in past 90 days?<br>
    💳 <strong>7. OTP/authentication logs</strong> — Were transactions authenticated successfully?<br><br>
    <em>This is an AI-assisted suggestion. Use investigator judgment for actual evidence collection.</em>
  `
};

// ─── Suggested Questions ──────────────────────────────────────
const SUGGESTED_QUESTIONS = [
  { label: 'Why is this critical?',          key: 'why is this transaction critical' },
  { label: 'Unusual vs history?',             key: 'unusual compared with account history' },
  { label: 'Last 10 transactions',           key: 'last 10 transactions' },
  { label: 'Explain the network',            key: 'explain the network' },
  { label: 'Top risk factors?',              key: 'risk factors contributed most' },
  { label: 'Summarize this case',            key: 'summarize this case' },
  { label: 'What to review next?',           key: 'what evidence should i review next' },
];

// ─── Chat State ───────────────────────────────────────────────
let messageCount = 0;

// ─── Append Message ───────────────────────────────────────────
function appendMessage(text, role) {
  const container = document.getElementById('copilot-messages');
  if (!container) return;

  messageCount++;
  const time = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false });

  const div = document.createElement('div');
  div.className = `msg msg-${role}`;
  div.id = `msg-${messageCount}`;

  div.innerHTML = `
    <div class="msg-bubble">${text}</div>
    <div class="msg-meta">${role === 'ai' ? '🤖 AI Copilot · ' : 'Investigator · '}${time}
      ${role === 'ai' ? '<em style="font-size:10px;color:var(--text-muted);margin-left:6px;">Demo AI response — connect backend/LLM API for production.</em>' : ''}
    </div>
  `;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ─── Send Message ─────────────────────────────────────────────
function sendCopilotMessage() {
  const input = document.getElementById('copilot-input');
  if (!input) return;
  const msg = input.value.trim();
  if (!msg) return;

  appendMessage(msg, 'user');
  input.value = '';

  // Show typing indicator
  const typingId = showTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator(typingId);

    const msgLower = msg.toLowerCase();
    let response = `I understand you're asking about: "<em>${msg}</em>".<br><br>
      For this demo, I have predefined responses for the suggested questions. Try clicking one of the quick prompts below, or ask about:<br><br>
      • Why is this transaction critical?<br>
      • What is unusual compared with account history?<br>
      • Summarize this case<br>
      • Explain the network<br>
      • What evidence should I review next?`;

    for (const [key, val] of Object.entries(COPILOT_RESPONSES)) {
      if (msgLower.includes(key.toLowerCase()) ||
          key.toLowerCase().split(' ').some(word => word.length > 4 && msgLower.includes(word))) {
        response = val;
        break;
      }
    }

    appendMessage(response, 'ai');
  }, 800 + Math.random() * 400);
}

function showTypingIndicator() {
  const container = document.getElementById('copilot-messages');
  if (!container) return null;

  const id = 'typing-' + Date.now();
  const div = document.createElement('div');
  div.id = id;
  div.className = 'msg msg-ai';
  div.innerHTML = `
    <div class="msg-bubble" style="display:flex;gap:4px;align-items:center;padding:10px 14px;">
      <span style="width:7px;height:7px;background:var(--text-muted);border-radius:50%;animation:pulse 1.2s infinite;"></span>
      <span style="width:7px;height:7px;background:var(--text-muted);border-radius:50%;animation:pulse 1.2s 0.2s infinite;"></span>
      <span style="width:7px;height:7px;background:var(--text-muted);border-radius:50%;animation:pulse 1.2s 0.4s infinite;"></span>
    </div>
    <div class="msg-meta">AI Copilot is thinking…</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return id;
}

function removeTypingIndicator(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// ─── Suggested Question Click ─────────────────────────────────
function askSuggested(key) {
  const input = document.getElementById('copilot-input');
  if (input) input.value = key;
  sendCopilotMessage();
}

// ─── Clear Chat ───────────────────────────────────────────────
function clearChat() {
  const container = document.getElementById('copilot-messages');
  if (container) {
    container.innerHTML = '';
    messageCount = 0;
  }
  showInitialGreeting();
}

// ─── Initial AI Greeting ──────────────────────────────────────
function showInitialGreeting() {
  setTimeout(() => {
    appendMessage(
      `Hello, <strong>Siddharth</strong>! I'm your AI Investigation Copilot.<br><br>
      I'm currently loaded with context for <strong>Alert A001</strong> — ACC-8821, CRITICAL risk score 94/100.<br><br>
      I can help you:<br>
      • Understand why transactions are suspicious<br>
      • Compare with account history<br>
      • Analyze network connections<br>
      • Generate investigation summaries<br>
      • Suggest next investigation steps<br><br>
      Use the quick prompts below, or ask me anything about this case.<br><br>
      <em style="font-size:11px;color:var(--text-muted);">⚠ Demo mode: AI responses are predefined. Connect a backend LLM for production intelligence.</em>`,
      'ai'
    );
  }, 400);
}

// ─── Export AI Summary ─────────────────────────────────────────
// Future: POST /api/copilot/explain-alert
function exportAISummary() {
  showToast('AI summary exported to Investigation Report.', 'success');
  setTimeout(() => {
    showToast('Navigate to Reports page to view the complete report.', 'info', 4000);
  }, 1000);
}

// ─── Render Suggested Questions ───────────────────────────────
function renderSuggestedQuestions() {
  const container = document.getElementById('suggested-questions');
  if (!container) return;

  container.innerHTML = SUGGESTED_QUESTIONS.map(q => `
    <button class="suggested-q" onclick="askSuggested('${q.key}')">${q.label}</button>
  `).join('');
}

// ─── Add pulse animation style ────────────────────────────────
function addPulseStyle() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);
}

// ─── Init Copilot Page ────────────────────────────────────────
function initCopilotPage() {
  buildSidebar('copilot', '../');
  buildTopbar('AI Investigation Copilot', false);

  addPulseStyle();
  renderSuggestedQuestions();
  showInitialGreeting();

  // Enter key
  const input = document.getElementById('copilot-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendCopilotMessage();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', initCopilotPage);


### 🤖 Assistant

> 🔧 called: write_file

Now let's create all the HTML pages:

> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — Investigation Dashboard</title>
  <link rel="stylesheet" href="css/style.css" />
  <link rel="stylesheet" href="css/dashboard.css" />
</head>
<body>
<div class="app-layout">

  <!-- Sidebar -->
  <aside id="sidebar" class="sidebar"></aside>

  <!-- Main Content -->
  <div class="main-content">

    <!-- Topbar -->
    <header id="topbar" class="topbar"></header>

    <!-- Page Body -->
    <main class="page-body">

      <!-- Stat Cards -->
      <div id="stat-cards" class="stat-cards"></div>

      <!-- Row 1: Trend + Distribution -->
      <div class="dashboard-grid mb-24">

        <!-- Alert Trend -->
        <div class="chart-container">
          <div class="chart-title">Alert Trend — Last 7 Days</div>
          <div class="chart-subtitle">Daily alert volume by risk level</div>
          <div id="alert-trend-chart"></div>
        </div>

        <!-- Risk Distribution -->
        <div class="chart-container">
          <div class="chart-title">Risk Distribution</div>
          <div class="chart-subtitle">Current open alerts by level</div>
          <div id="risk-distribution-chart"></div>
        </div>

      </div>

      <!-- Row 2: Recent Critical Alerts -->
      <div class="mb-24">
        <div class="section-header">
          <div>
            <div class="section-title">Recent Critical Alerts</div>
            <div class="section-subtitle">Latest CRITICAL priority alerts requiring immediate review</div>
          </div>
          <a href="pages/alerts.html" class="btn btn-secondary btn-sm">View All Alerts →</a>
        </div>
        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Alert ID</th>
                <th>Account Holder</th>
                <th>Amount</th>
                <th>Risk Score</th>
                <th>Risk Level</th>
                <th>Location</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody id="recent-alerts-body"></tbody>
          </table>
        </div>
      </div>

      <!-- Row 3: Accounts + Workload + Activity -->
      <div class="dashboard-grid">

        <!-- Suspicious Accounts -->
        <div class="card">
          <div class="section-header mb-16">
            <div class="section-title">Suspicious Accounts</div>
            <a href="pages/network.html" class="btn btn-secondary btn-sm">Network →</a>
          </div>
          <div id="suspicious-accounts" class="account-list"></div>
        </div>

        <!-- Right column: Workload + Activity -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Investigator Workload -->
          <div class="card">
            <div class="section-title mb-16">Investigator Workload</div>
            <div id="investigator-workload" class="workload-list"></div>
          </div>

          <!-- Recent Activity -->
          <div class="card">
            <div class="section-title mb-16">Recent Activity</div>
            <div id="activity-feed" class="activity-feed"></div>
          </div>

        </div>
      </div>

    </main>
  </div>
</div>

<!-- Toast Container -->
<div id="toast-container" class="toast-container"></div>

<script src="js/app.js"></script>
<script src="js/dashboard.js"></script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — Suspicious Alerts</title>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/alerts.css" />
</head>
<body>
<div class="app-layout">

  <aside id="sidebar" class="sidebar"></aside>

  <div class="main-content">
    <header id="topbar" class="topbar"></header>

    <main class="page-body">

      <!-- Quick Stats -->
      <div id="alerts-quick-stats" class="alerts-quick-stats"></div>

      <!-- Toolbar: search + filters -->
      <div class="alerts-toolbar">
        <div class="search-wrap">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="color:var(--text-muted);flex-shrink:0;">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
          <input type="text" id="alert-search" placeholder="Search alerts, accounts, locations…" />
        </div>

        <div class="filter-group">
          <span class="filter-label">Risk:</span>
          <select id="filter-risk" class="filter-select">
            <option value="">All Levels</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>

          <span class="filter-label">Status:</span>
          <select id="filter-status" class="filter-select">
            <option value="">All Status</option>
            <option value="Open">Open</option>
            <option value="In Review">In Review</option>
            <option value="Escalated">Escalated</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Closed">Closed</option>
          </select>

          <button class="btn btn-secondary btn-sm" onclick="document.getElementById('filter-risk').value='';document.getElementById('filter-status').value='';document.getElementById('alert-search').value='';applyFilters();">
            Clear
          </button>
        </div>

        <span id="alert-count" class="alerts-count"></span>
      </div>

      <!-- Alerts Table -->
      <div class="alerts-table-wrapper">
        <table class="alerts-table">
          <thead>
            <tr>
              <th data-sort="id">Alert ID <span class="sort-icon">↕</span></th>
              <th data-sort="txId">Transaction ID <span class="sort-icon">↕</span></th>
              <th data-sort="name">Account <span class="sort-icon">↕</span></th>
              <th data-sort="amount">Amount <span class="sort-icon">↕</span></th>
              <th data-sort="risk">Risk Score <span class="sort-icon">↕</span></th>
              <th data-sort="level">Risk Level <span class="sort-icon">↕</span></th>
              <th data-sort="location">Location <span class="sort-icon">↕</span></th>
              <th data-sort="time">Time <span class="sort-icon">↕</span></th>
              <th data-sort="status">Status <span class="sort-icon">↕</span></th>
              <th data-sort="priority">Priority <span class="sort-icon">↕</span></th>
            </tr>
          </thead>
          <tbody id="alerts-tbody"></tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div style="display:flex;align-items:center;justify-content:flex-end;margin-top:14px;">
        <div id="pagination" class="pagination"></div>
      </div>

    </main>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>

<script src="../js/app.js"></script>
<script src="../js/alerts.js"></script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — Alert Investigation</title>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/details.css" />
</head>
<body>
<div class="app-layout">

  <aside id="sidebar" class="sidebar"></aside>

  <div class="main-content">
    <header id="topbar" class="topbar"></header>

    <main class="page-body">

      <!-- Back link -->
      <div style="margin-bottom:14px;">
        <a href="alerts.html" style="font-size:13px;color:var(--text-muted);display:flex;align-items:center;gap:4px;">
          ← Back to Alerts
        </a>
      </div>

      <!-- Case Header -->
      <div id="case-header" class="case-header"></div>

      <!-- Alert Summary Banner -->
      <div id="alert-summary-banner" style="
        background:rgba(239,68,68,0.07);
        border:1px solid rgba(239,68,68,0.25);
        border-radius:var(--radius);
        padding:12px 18px;
        margin-bottom:20px;
        font-size:13px;
        color:var(--text-secondary);
        display:flex;align-items:center;gap:10px;
      ">
        <span style="font-size:18px;">⚠</span>
        <span id="alert-summary-text">Loading alert summary…</span>
      </div>

      <!-- Main Details Grid -->
      <div class="details-grid">

        <!-- Left / Main Column -->
        <div class="details-main">

          <!-- Suspicious Transactions -->
          <div class="card">
            <div class="section-header mb-16">
              <div>
                <div class="section-title">Suspicious Transactions</div>
                <div class="section-subtitle">Flagged transactions from this alert event</div>
              </div>
              <span class="risk-badge risk-critical">CRITICAL PATTERN</span>
            </div>
            <div id="sus-tx-list" class="sus-tx-list"></div>
          </div>

          <!-- Risk Factors -->
          <div class="card">
            <div class="section-header mb-16">
              <div>
                <div class="section-title">Risk Factor Analysis</div>
                <div class="section-subtitle">AI-assisted scoring — weighted risk breakdown</div>
              </div>
            </div>
            <div id="risk-factors-grid" class="risk-factors-grid"></div>
          </div>

          <!-- Account History -->
          <div class="card">
            <div class="section-title mb-16">Account History vs Suspicious Activity</div>
            <div id="account-history"></div>
          </div>

          <!-- Recent Transaction History -->
          <div class="card">
            <div class="section-header mb-16">
              <div class="section-title">Recent Transaction History</div>
              <div class="section-subtitle">Last 10 transactions on this account</div>
            </div>
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Location</th>
                    <th>Device</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody id="recent-tx-tbody"></tbody>
              </table>
            </div>
          </div>

          <!-- AI Copilot Panel -->
          <div class="card" style="padding:0;overflow:hidden;">
            <div style="padding:14px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
              <div class="copilot-indicator"></div>
              <div>
                <div style="font-size:14px;font-weight:700;color:var(--text-primary);">AI Investigation Copilot</div>
                <div style="font-size:11px;color:var(--text-muted);">Ask questions about this alert — AI-assisted analysis</div>
              </div>
              <span style="margin-left:auto;font-size:10px;background:rgba(59,130,246,0.12);color:#60a5fa;border:1px solid rgba(59,130,246,0.25);border-radius:4px;padding:2px 8px;">DEMO MODE</span>
            </div>

            <!-- Suggested Questions -->
            <div class="suggested-qs">
              <button class="suggested-q" onclick="useSuggestedQuestion('Why is this transaction critical?')">Why critical?</button>
              <button class="suggested-q" onclick="useSuggestedQuestion('unusual compared with account history')">Unusual vs history?</button>
              <button class="suggested-q" onclick="useSuggestedQuestion('last 10 transactions')">Last 10 txns</button>
              <button class="suggested-q" onclick="useSuggestedQuestion('explain the network')">Network?</button>
              <button class="suggested-q" onclick="useSuggestedQuestion('risk factors contributed most')">Top risk factors?</button>
              <button class="suggested-q" onclick="useSuggestedQuestion('summarize this case')">Summarize case</button>
              <button class="suggested-q" onclick="useSuggestedQuestion('what evidence should I review next')">Next steps?</button>
            </div>

            <div id="detail-copilot-messages" class="copilot-messages" style="height:260px;"></div>
            <div class="demo-label">Demo AI response — connect backend/LLM API for production use.</div>
            <div class="copilot-input-area">
              <textarea id="detail-copilot-input" class="copilot-input" rows="1"
                        placeholder="Ask the AI Copilot about this alert…"></textarea>
              <button class="copilot-send" onclick="sendDetailCopilotMessage()">
                <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
                </svg>
              </button>
            </div>
          </div>

        </div>

        <!-- Right / Sidebar Column -->
        <div class="details-side">

          <!-- Network Connections -->
          <div class="card">
            <div class="section-header mb-16">
              <div class="section-title">Network Connections</div>
              <a href="network.html" class="btn btn-secondary btn-sm">Full View →</a>
            </div>
            <div id="network-connections" class="network-mini-nodes"></div>
            <div style="margin-top:10px;font-size:11px;color:var(--text-muted);font-style:italic;">
              ℹ Connected accounts require independent investigation. Connection ≠ guilt.
            </div>
          </div>

          <!-- Investigation Actions -->
          <div class="investigation-actions">
            <div class="section-title mb-16">Investigator Decision</div>
            <div class="action-buttons-row">
              <button class="action-btn action-escalate" onclick="handleAction('escalate')">
                <span class="action-btn-title">↑ Escalate</span>
                <span class="action-btn-desc">Escalate to compliance / senior investigator</span>
              </button>
              <button class="action-btn action-monitor" onclick="handleAction('monitor')">
                <span class="action-btn-title">👁 Monitor</span>
                <span class="action-btn-desc">Place under active monitoring</span>
              </button>
              <button class="action-btn action-legitimate" onclick="handleAction('legitimate')">
                <span class="action-btn-title">✓ Legitimate</span>
                <span class="action-btn-desc">Mark as legitimate after review</span>
              </button>
              <button class="action-btn action-notes" onclick="document.getElementById('notes-input').focus()">
                <span class="action-btn-title">✏ Add Note</span>
                <span class="action-btn-desc">Add investigation note</span>
              </button>
            </div>
            <div style="font-size:11px;color:var(--text-muted);font-style:italic;margin-bottom:10px;">
              ⚠ Demo actions only. Final decision recorded in audit trail.
            </div>
            <textarea id="notes-input" class="notes-area" placeholder="Add investigation notes, observations, or references…"></textarea>
            <button class="btn btn-primary w-full" onclick="handleAddNote()">Save Note</button>
          </div>

          <!-- Audit Trail -->
          <div class="audit-trail">
            <div class="section-title mb-16">Investigation Audit Trail</div>
            <div id="audit-list" class="audit-list"></div>
          </div>

          <!-- Generate Report -->
          <div class="card" style="text-align:center;padding:20px;">
            <div style="font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:6px;">Generate Investigation Brief</div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:14px;">Create a formal investigation report for this alert</div>
            <a href="reports.html?id=A001" class="btn btn-primary w-full">📄 Generate Report</a>
          </div>

        </div>

      </div>

    </main>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>

<script src="../js/app.js"></script>
<script src="../js/details.js"></script>
<script>
  // Inject summary banner text after alert loads
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
      const alertId = getQueryParam('id') || 'A001';
      const alert = ALERTS_DATA[alertId];
      const banner = document.getElementById('alert-summary-text');
      if (alert && banner) {
        banner.textContent = alert.summary || 'Alert details loaded.';
      }
    }, 100);
  });
</script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — Account Network</title>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/details.css" />
  <style>
    .network-page-layout {
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 20px;
      align-items: start;
    }
    .network-filter-btn {
      padding: 5px 12px;
      border-radius: var(--radius-sm);
      border: 1px solid var(--border);
      background: var(--bg-card);
      color: var(--text-secondary);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s, color 0.15s;
    }
    .network-filter-btn:hover { background: var(--bg-card-hover); }
    .network-filter-btn.active { background: rgba(59,130,246,0.12); border-color: var(--accent); color: var(--accent-hover); }
    .network-legend { display: flex; gap: 12px; flex-wrap: wrap; }
    .legend-entry { display: flex; align-items: center; gap: 5px; font-size: 11px; color: var(--text-muted); }
    .legend-entry .dot { width: 10px; height: 10px; border-radius: 50%; }
    @media (max-width: 900px) {
      .network-page-layout { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
<div class="app-layout">

  <aside id="sidebar" class="sidebar"></aside>

  <div class="main-content">
    <header id="topbar" class="topbar"></header>

    <main class="page-body">

      <!-- Header -->
      <div class="section-header mb-16">
        <div>
          <div class="section-title">Account Transaction Network</div>
          <div class="section-subtitle">Visualizing connected accounts and suspicious money flows — click a node to inspect</div>
        </div>
        <div style="display:flex;align-items:center;gap:8px;">
          <a href="alert-details.html?id=A001" class="btn btn-secondary btn-sm">← Alert A001</a>
          <button class="btn btn-primary btn-sm" onclick="showToast('Network exported as PNG', 'success')">Export</button>
        </div>
      </div>

      <!-- Context Banner -->
      <div style="background:rgba(59,130,246,0.07);border:1px solid rgba(59,130,246,0.2);border-radius:var(--radius);padding:10px 16px;margin-bottom:16px;font-size:12.5px;color:var(--text-secondary);">
        <strong style="color:var(--text-primary);">Viewing network for Alert A001</strong> — ACC-8821 (Rajesh K.) — CRITICAL Risk 94/100.
        The dashed lines indicate suspicious fund flows. Connected accounts require independent review.
        <strong>Connection does not imply criminal activity.</strong>
      </div>

      <!-- Filters + Legend -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <div style="display:flex;align-items:center;gap:6px;">
          <span style="font-size:11px;font-weight:600;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.6px;">Filter:</span>
          <button class="network-filter-btn active" data-risk="all" onclick="filterNetwork('all')">All Nodes</button>
          <button class="network-filter-btn" data-risk="critical" onclick="filterNetwork('critical')">Critical</button>
          <button class="network-filter-btn" data-risk="high" onclick="filterNetwork('high')">High</button>
          <button class="network-filter-btn" data-risk="medium" onclick="filterNetwork('medium')">Medium</button>
          <button class="network-filter-btn" data-risk="low" onclick="filterNetwork('low')">Low</button>
        </div>
        <div class="network-legend">
          <div class="legend-entry"><span class="dot" style="background:#3b82f6;"></span>Subject</div>
          <div class="legend-entry"><span class="dot" style="background:#ef4444;"></span>Requires review</div>
          <div class="legend-entry"><span class="dot" style="background:#f97316;"></span>Suspicious</div>
          <div class="legend-entry"><span class="dot" style="background:#f59e0b;"></span>Transaction connection</div>
          <div class="legend-entry"><span class="dot" style="background:#22c55e;"></span>Normal connection</div>
        </div>
      </div>

      <!-- Network Layout -->
      <div class="network-page-layout">

        <!-- SVG Network Graph -->
        <div class="card" style="padding:0;overflow:hidden;">
          <div id="network-svg-container" style="width:100%;min-height:480px;"></div>
        </div>

        <!-- Right Panel -->
        <div style="display:flex;flex-direction:column;gap:16px;">

          <!-- Node Details -->
          <div class="card">
            <div class="section-title mb-12">Node Details</div>
            <div id="node-detail-panel" style="font-size:13px;color:var(--text-secondary);">
              Click any node in the network graph to see details.
            </div>
          </div>

          <!-- Node List -->
          <div class="card">
            <div class="section-title mb-12">Connected Accounts</div>
            <div id="network-node-list" class="network-mini-nodes"></div>
          </div>

          <!-- Key Facts -->
          <div class="card" style="background:var(--risk-critical-bg);border-color:rgba(239,68,68,0.25);">
            <div style="font-size:13px;font-weight:700;color:var(--text-primary);margin-bottom:8px;">Key Network Facts</div>
            <div style="display:flex;flex-direction:column;gap:6px;font-size:12px;color:var(--text-secondary);">
              <div>📤 Total funds transferred: <strong style="color:var(--risk-critical);">₹1,72,000</strong></div>
              <div>🔗 Direct connections: <strong>4 accounts</strong></div>
              <div>⚠ Flagged connections: <strong>3 (requires review)</strong></div>
              <div>🌐 Second-hop nodes: <strong>2 accounts</strong></div>
            </div>
            <div style="margin-top:10px;font-size:11px;color:var(--text-muted);font-style:italic;">
              ⚠ Relationships require investigator review. Flagged status ≠ criminal determination.
            </div>
          </div>

        </div>
      </div>

    </main>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>

<script src="../js/app.js"></script>
<script src="../js/network.js"></script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — Investigations</title>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/alerts.css" />
</head>
<body>
<div class="app-layout">

  <aside id="sidebar" class="sidebar"></aside>

  <div class="main-content">
    <header id="topbar" class="topbar"></header>

    <main class="page-body">

      <!-- Investigations Header -->
      <div class="section-header mb-16">
        <div>
          <div class="section-title">Investigation Cases</div>
          <div class="section-subtitle">All open, active, and closed investigation cases managed by this team</div>
        </div>
        <button class="btn btn-primary" onclick="showToast('New investigation case created (Demo)', 'success')">
          + New Case
        </button>
      </div>

      <!-- Quick Stats -->
      <div class="alerts-quick-stats mb-16" id="inv-stats"></div>

      <!-- Filters -->
      <div class="alerts-toolbar mb-16">
        <div class="search-wrap">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor" style="color:var(--text-muted);flex-shrink:0;">
            <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"/>
          </svg>
          <input type="text" id="inv-search" placeholder="Search cases, assignees…" oninput="filterInvestigations()" />
        </div>
        <div class="filter-group">
          <span class="filter-label">Status:</span>
          <select id="inv-status-filter" class="filter-select" onchange="filterInvestigations()">
            <option value="">All</option>
            <option value="Open">Open</option>
            <option value="In Review">In Review</option>
            <option value="Escalated">Escalated</option>
            <option value="Monitoring">Monitoring</option>
            <option value="Closed">Closed</option>
          </select>
          <span class="filter-label">Risk:</span>
          <select id="inv-risk-filter" class="filter-select" onchange="filterInvestigations()">
            <option value="">All</option>
            <option value="CRITICAL">Critical</option>
            <option value="HIGH">High</option>
            <option value="MEDIUM">Medium</option>
            <option value="LOW">Low</option>
          </select>
        </div>
      </div>

      <!-- Investigations Table -->
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Case ID</th>
              <th>Alert ID</th>
              <th>Account</th>
              <th>Risk Level</th>
              <th>Assigned Investigator</th>
              <th>Status</th>
              <th>Last Updated</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody id="investigations-tbody"></tbody>
        </table>
      </div>

    </main>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>

<script src="../js/app.js"></script>
<script>
// ─── Synthetic Investigation Data ──────────────────────────────
// Future: GET /api/investigations

const INVESTIGATIONS = [
  { caseId:'INV-001', alertId:'A001', account:'ACC-8821', name:'Rajesh K.',    risk:'CRITICAL', assignee:'Siddharth A.', status:'Open',       updated:'2024-01-16 02:31' },
  { caseId:'INV-002', alertId:'A002', account:'ACC-3345', name:'Priya M.',     risk:'CRITICAL', assignee:'Pooja N.',     status:'In Review',  updated:'2024-01-15 23:55' },
  { caseId:'INV-003', alertId:'A003', account:'ACC-6677', name:'Arjun S.',     risk:'CRITICAL', assignee:'Vikram S.',    status:'Escalated',  updated:'2024-01-16 01:10' },
  { caseId:'INV-004', alertId:'A004', account:'ACC-1129', name:'Nisha P.',     risk:'CRITICAL', assignee:'Siddharth A.', status:'Open',       updated:'2024-01-16 01:32' },
  { caseId:'INV-005', alertId:'A005', account:'ACC-5512', name:'Karan V.',     risk:'CRITICAL', assignee:'Rekha T.',     status:'Open',       updated:'2024-01-16 04:21' },
  { caseId:'INV-006', alertId:'A006', account:'ACC-2233', name:'Deepa L.',     risk:'HIGH',     assignee:'Ajay K.',      status:'In Review',  updated:'2024-01-15 15:00' },
  { caseId:'INV-007', alertId:'A007', account:'ACC-4455', name:'Manoj T.',     risk:'HIGH',     assignee:'Pooja N.',     status:'Monitoring', updated:'2024-01-15 10:00' },
  { caseId:'INV-008', alertId:'A008', account:'ACC-7788', name:'Ankur J.',     risk:'HIGH',     assignee:'Vikram S.',    status:'Monitoring', updated:'2024-01-15 17:20' },
  { caseId:'INV-009', alertId:'A009', account:'ACC-9910', name:'Ritu B.',      risk:'HIGH',     assignee:'Rekha T.',     status:'Closed',     updated:'2024-01-14 12:00' },
  { caseId:'INV-010', alertId:'A010', account:'ACC-1122', name:'Sunita R.',    risk:'HIGH',     assignee:'Ajay K.',      status:'Open',       updated:'2024-01-14 20:30' },
  { caseId:'INV-011', alertId:'A011', account:'ACC-3366', name:'Vivek A.',     risk:'MEDIUM',   assignee:'Siddharth A.', status:'Open',       updated:'2024-01-14 09:00' },
  { caseId:'INV-012', alertId:'A012', account:'ACC-5544', name:'Pooja N.',     risk:'MEDIUM',   assignee:'Rekha T.',     status:'In Review',  updated:'2024-01-13 16:00' },
  { caseId:'INV-013', alertId:'A015', account:'ACC-0011', name:'Harish P.',    risk:'MEDIUM',   assignee:'Vikram S.',    status:'Closed',     updated:'2024-01-12 23:00' },
  { caseId:'INV-014', alertId:'A016', account:'ACC-2255', name:'Meena S.',     risk:'LOW',      assignee:'Ajay K.',      status:'Closed',     updated:'2024-01-12 11:00' },
  { caseId:'INV-015', alertId:'A017', account:'ACC-4477', name:'Rohit G.',     risk:'LOW',      assignee:'Pooja N.',     status:'Closed',     updated:'2024-01-11 17:00' },
];

let filteredInvestigations = [...INVESTIGATIONS];

function filterInvestigations() {
  const query  = (document.getElementById('inv-search')?.value || '').toLowerCase();
  const status = document.getElementById('inv-status-filter')?.value || '';
  const risk   = document.getElementById('inv-risk-filter')?.value || '';

  filteredInvestigations = INVESTIGATIONS.filter(inv => {
    const matchSearch = !query ||
      inv.caseId.toLowerCase().includes(query) ||
      inv.alertId.toLowerCase().includes(query) ||
      inv.name.toLowerCase().includes(query) ||
      inv.assignee.toLowerCase().includes(query);
    const matchStatus = !status || inv.status === status;
    const matchRisk   = !risk   || inv.risk === risk;
    return matchSearch && matchStatus && matchRisk;
  });

  renderInvestigationsTable();
}

function renderInvestigationsTable() {
  const tbody = document.getElementById('investigations-tbody');
  if (!tbody) return;

  if (filteredInvestigations.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><p>No investigations match your filters.</p></div></td></tr>`;
    return;
  }

  tbody.innerHTML = filteredInvestigations.map(inv => {
    const timeStr = new Date(inv.updated).toLocaleString('en-IN', {
      day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit', hour12:true
    });
    return `
      <tr>
        <td style="font-family:monospace;font-weight:700;color:var(--accent-hover);">${inv.caseId}</td>
        <td>
          <a href="alert-details.html?id=${inv.alertId}" style="color:var(--accent);font-family:monospace;">${inv.alertId}</a>
        </td>
        <td>
          <div style="font-weight:600;font-size:13px;">${inv.name}</div>
          <div style="font-size:11px;color:var(--text-muted);">${inv.account}</div>
        </td>
        <td>${updateRiskBadge(inv.risk)}</td>
        <td style="font-size:13px;color:var(--text-secondary);">${inv.assignee}</td>
        <td>${statusBadge(inv.status)}</td>
        <td style="font-size:12px;color:var(--text-muted);">${timeStr}</td>
        <td>
          <div style="display:flex;gap:5px;">
            <a href="alert-details.html?id=${inv.alertId}" class="btn btn-sm btn-primary">Review</a>
            <button class="btn btn-sm btn-secondary" onclick="showToast('Investigation ${inv.caseId} status updated (Demo)', 'info')">Update</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function renderInvStats() {
  const open      = INVESTIGATIONS.filter(i => i.status === 'Open').length;
  const inReview  = INVESTIGATIONS.filter(i => i.status === 'In Review').length;
  const escalated = INVESTIGATIONS.filter(i => i.status === 'Escalated').length;
  const closed    = INVESTIGATIONS.filter(i => i.status === 'Closed').length;

  document.getElementById('inv-stats').innerHTML = `
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(59,130,246,0.12);">📋</div>
      <div><div class="quick-stat-val">${INVESTIGATIONS.length}</div><div class="quick-stat-lbl">Total Cases</div></div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:var(--risk-critical-bg);">🔴</div>
      <div><div class="quick-stat-val" style="color:var(--risk-critical);">${open}</div><div class="quick-stat-lbl">Open</div></div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(245,158,11,0.12);">🟡</div>
      <div><div class="quick-stat-val" style="color:var(--risk-medium);">${inReview + escalated}</div><div class="quick-stat-lbl">In Progress</div></div>
    </div>
    <div class="quick-stat">
      <div class="quick-stat-icon" style="background:rgba(34,197,94,0.12);">✅</div>
      <div><div class="quick-stat-val" style="color:var(--risk-low);">${closed}</div><div class="quick-stat-lbl">Closed</div></div>
    </div>
  `;
}

document.addEventListener('DOMContentLoaded', () => {
  buildSidebar('investigations', '../');
  buildTopbar('Investigations', false);
  renderInvStats();
  filterInvestigations();
});
</script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — AI Investigation Copilot</title>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/details.css" />
  <style>
    .copilot-page-layout {
      display: grid;
      grid-template-columns: 1fr 280px;
      gap: 20px;
      height: calc(100vh - var(--topbar-height) - 80px);
    }

    .copilot-full {
      display: flex; flex-direction: column;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      height: 100%;
      min-height: 500px;
    }

    .copilot-full .copilot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
      display: flex; flex-direction: column; gap: 12px;
    }

    .copilot-full .copilot-input-area {
      border-top: 1px solid var(--border);
      padding: 12px 14px;
      display: flex; gap: 8px; align-items: flex-end;
    }

    .copilot-full .copilot-input {
      flex: 1;
      background: var(--bg-input);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text-primary);
      padding: 8px 12px;
      font-size: 13px;
      font-family: var(--font);
      outline: none;
      resize: none;
      min-height: 40px; max-height: 100px;
    }

    .copilot-full .copilot-input:focus { border-color: var(--accent); }

    .side-panel { display: flex; flex-direction: column; gap: 16px; overflow-y: auto; }

    .context-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 16px;
    }

    @media (max-width: 900px) {
      .copilot-page-layout { grid-template-columns: 1fr; }
      .side-panel { display: none; }
    }
  </style>
</head>
<body>
<div class="app-layout">

  <aside id="sidebar" class="sidebar"></aside>

  <div class="main-content">
    <header id="topbar" class="topbar"></header>

    <main class="page-body">

      <!-- Header row -->
      <div class="section-header mb-16">
        <div>
          <div class="section-title">AI Investigation Copilot</div>
          <div class="section-subtitle">AI-assisted fraud and AML investigation assistant — Loaded: Alert A001</div>
        </div>
        <div style="display:flex;gap:8px;align-items:center;">
          <span style="font-size:11px;background:rgba(34,197,94,0.12);color:var(--risk-low);border:1px solid rgba(34,197,94,0.25);border-radius:4px;padding:3px 8px;font-weight:600;">
            ● Active Session
          </span>
          <span style="font-size:11px;background:rgba(59,130,246,0.12);color:#60a5fa;border:1px solid rgba(59,130,246,0.25);border-radius:4px;padding:3px 8px;">
            DEMO MODE
          </span>
          <button class="btn btn-secondary btn-sm" onclick="clearChat()">Clear Chat</button>
          <button class="btn btn-primary btn-sm" onclick="exportAISummary()">Export Summary</button>
        </div>
      </div>

      <!-- Layout -->
      <div class="copilot-page-layout">

        <!-- Main Chat -->
        <div class="copilot-full">

          <!-- Header -->
          <div style="padding:12px 16px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:8px;">
            <div class="copilot-indicator"></div>
            <span style="font-size:14px;font-weight:700;color:var(--text-primary);">FinGuard AI Copilot</span>
            <span style="font-size:11px;color:var(--text-muted);">Fraud & AML Investigation Assistant</span>
            <span style="margin-left:auto;font-size:11px;color:var(--text-muted);font-style:italic;">
              Demo AI — connect LLM API for production
            </span>
          </div>

          <!-- Messages -->
          <div id="copilot-messages" class="copilot-messages"></div>

          <!-- Demo label -->
          <div class="demo-label">
            ⚠ Demo AI response — predefined responses only. Connect backend/LLM API for production intelligence.
          </div>

          <!-- Suggested questions -->
          <div id="suggested-questions" class="suggested-qs"></div>

          <!-- Input -->
          <div class="copilot-input-area">
            <textarea id="copilot-input" class="copilot-input" rows="1"
                      placeholder="Ask the AI Copilot about the investigation…"></textarea>
            <button class="copilot-send" onclick="sendCopilotMessage()">
              <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"/>
              </svg>
            </button>
          </div>
        </div>

        <!-- Side Panel -->
        <div class="side-panel">

          <!-- Case Context -->
          <div class="context-card">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:10px;">Active Case</div>
            <div style="display:flex;align-items:center;gap:10px;margin-bottom:12px;">
              <div style="width:40px;height:40px;background:var(--risk-critical-bg);border:1px solid rgba(239,68,68,0.3);border-radius:var(--radius-sm);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;color:var(--risk-critical);">A001</div>
              <div>
                <div style="font-size:14px;font-weight:700;color:var(--text-primary);">Alert A001</div>
                <div style="font-size:11px;color:var(--text-muted);">ACC-8821 · Rajesh K.</div>
              </div>
            </div>
            <div style="display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--text-secondary);">
              <div style="display:flex;justify-content:space-between;"><span>Risk Score</span><span style="font-weight:800;color:var(--risk-critical);">94/100</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Risk Level</span><span class="risk-badge risk-critical" style="font-size:10px;">CRITICAL</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Transactions</span><span style="font-weight:600;">3 suspicious</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Total Amount</span><span style="font-weight:700;color:var(--risk-critical);">₹1,72,000</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Location</span><span>Mumbai</span></div>
              <div style="display:flex;justify-content:space-between;"><span>Time</span><span>02:15–02:17 AM</span></div>
            </div>
            <a href="alert-details.html?id=A001" class="btn btn-secondary btn-sm" style="margin-top:12px;width:100%;">Open Alert Details</a>
          </div>

          <!-- Quick Actions -->
          <div class="context-card">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:10px;">Quick Prompts</div>
            <div style="display:flex;flex-direction:column;gap:5px;">
              <button class="btn btn-secondary btn-sm" style="text-align:left;justify-content:flex-start;" onclick="askSuggested('why is this transaction critical')">Why is this critical?</button>
              <button class="btn btn-secondary btn-sm" style="text-align:left;justify-content:flex-start;" onclick="askSuggested('unusual compared with account history')">Unusual vs history?</button>
              <button class="btn btn-secondary btn-sm" style="text-align:left;justify-content:flex-start;" onclick="askSuggested('last 10 transactions')">Last 10 transactions</button>
              <button class="btn btn-secondary btn-sm" style="text-align:left;justify-content:flex-start;" onclick="askSuggested('explain the network')">Explain the network</button>
              <button class="btn btn-secondary btn-sm" style="text-align:left;justify-content:flex-start;" onclick="askSuggested('risk factors contributed most')">Top risk factors?</button>
              <button class="btn btn-secondary btn-sm" style="text-align:left;justify-content:flex-start;" onclick="askSuggested('summarize this case')">Summarize this case</button>
              <button class="btn btn-secondary btn-sm" style="text-align:left;justify-content:flex-start;" onclick="askSuggested('what evidence should i review next')">Next review steps?</button>
            </div>
          </div>

          <!-- AI Capabilities -->
          <div class="context-card">
            <div style="font-size:12px;font-weight:700;color:var(--text-muted);text-transform:uppercase;letter-spacing:0.7px;margin-bottom:10px;">AI Capabilities</div>
            <div style="display:flex;flex-direction:column;gap:5px;font-size:12px;color:var(--text-secondary);">
              <div>✅ Risk factor explanation</div>
              <div>✅ Transaction comparison</div>
              <div>✅ Network analysis summary</div>
              <div>✅ Investigation brief generation</div>
              <div>✅ Suggested review steps</div>
              <div style="color:var(--text-muted);">⬜ Real LLM reasoning (needs backend)</div>
              <div style="color:var(--text-muted);">⬜ Live transaction data (needs API)</div>
            </div>
          </div>

          <!-- Future API Note -->
          <div style="background:rgba(59,130,246,0.07);border:1px solid rgba(59,130,246,0.2);border-radius:var(--radius);padding:12px;font-size:11px;color:var(--text-muted);">
            <strong style="color:var(--accent-hover);">Production Integration:</strong><br>
            Connect to POST /api/copilot/chat for real LLM responses. Responses are currently predefined for demo purposes.
          </div>

        </div>
      </div>

    </main>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>

<script src="../js/app.js"></script>
<script src="../js/copilot.js"></script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — Investigation Report</title>
  <link rel="stylesheet" href="../css/style.css" />
  <style>
    .report-section {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 24px;
      margin-bottom: 16px;
    }
    .report-section-title {
      font-size: 14px;
      font-weight: 700;
      color: var(--text-primary);
      border-bottom: 1px solid var(--border);
      padding-bottom: 8px;
      margin-bottom: 14px;
      display: flex; align-items: center; gap: 8px;
    }
    .report-section-title .section-num {
      font-size: 11px;
      font-weight: 600;
      color: var(--accent);
      background: rgba(59,130,246,0.1);
      border: 1px solid rgba(59,130,246,0.2);
      border-radius: 4px;
      padding: 1px 7px;
    }
    .report-row {
      display: flex;
      gap: 16px;
      margin-bottom: 8px;
      font-size: 13px;
    }
    .report-key {
      min-width: 200px;
      color: var(--text-muted);
      font-weight: 600;
    }
    .report-val { color: var(--text-primary); flex: 1; }
    .report-placeholder {
      padding: 40px;
      text-align: center;
      color: var(--text-muted);
    }
    .report-ai-block {
      background: rgba(59,130,246,0.05);
      border: 1px solid rgba(59,130,246,0.2);
      border-left: 3px solid var(--accent);
      border-radius: var(--radius-sm);
      padding: 14px 16px;
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 1.6;
    }
    .report-evidence-item {
      display: flex; align-items: flex-start; gap: 8px;
      padding: 8px 0; border-bottom: 1px solid var(--border-light);
      font-size: 13px; color: var(--text-secondary);
    }
    .report-evidence-item:last-child { border-bottom: none; }
    .report-evidence-item .ev-num {
      width: 22px; height: 22px; min-width: 22px;
      background: var(--bg-surface); border: 1px solid var(--border);
      border-radius: 50%; display: flex; align-items: center; justify-content: center;
      font-size: 10px; font-weight: 700; color: var(--accent);
    }
    @media print {
      .sidebar, .topbar, #generate-btn-wrap, .topbar-actions { display: none !important; }
      .main-content { margin-left: 0 !important; }
    }
  </style>
</head>
<body>
<div class="app-layout">

  <aside id="sidebar" class="sidebar"></aside>

  <div class="main-content">
    <header id="topbar" class="topbar"></header>

    <main class="page-body">

      <!-- Page Header -->
      <div class="section-header mb-20">
        <div>
          <div class="section-title">Investigation Report</div>
          <div class="section-subtitle">Formal investigation brief — AI-assisted summary with investigator review</div>
        </div>
        <div id="generate-btn-wrap" style="display:flex;gap:8px;">
          <button class="btn btn-primary" onclick="generateReport()">📄 Generate Investigation Brief</button>
          <button class="btn btn-secondary" onclick="window.print()">🖨 Print Report</button>
        </div>
      </div>

      <!-- Empty state before generation -->
      <div id="report-empty" class="report-section" style="text-align:center;padding:48px;">
        <svg width="48" height="48" viewBox="0 0 20 20" fill="currentColor" style="color:var(--text-muted);opacity:0.4;margin:0 auto 12px;display:block;">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
        </svg>
        <div style="font-size:15px;font-weight:600;color:var(--text-primary);margin-bottom:6px;">No Report Generated</div>
        <div style="font-size:13px;color:var(--text-muted);margin-bottom:20px;">Click "Generate Investigation Brief" to create a formal report for Alert A001.</div>
        <button class="btn btn-primary" onclick="generateReport()">📄 Generate Investigation Brief</button>
      </div>

      <!-- Report Content (hidden until generated) -->
      <div id="report-content" style="display:none;">

        <!-- Report Cover -->
        <div class="report-section" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.04);">
          <div style="display:flex;align-items:flex-start;justify-content:space-between;flex-wrap:wrap;gap:16px;">
            <div>
              <div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:1px;color:var(--text-muted);margin-bottom:4px;">CONFIDENTIAL — INVESTIGATION REPORT</div>
              <div style="font-size:22px;font-weight:800;color:var(--text-primary);line-height:1.2;">Case INV-001 / Alert A001</div>
              <div style="font-size:13px;color:var(--text-muted);margin-top:4px;">Generated by FinGuard Investigation Copilot</div>
            </div>
            <div style="text-align:right;">
              <div style="font-size:28px;font-weight:900;color:var(--risk-critical);">94/100</div>
              <div class="risk-badge risk-critical" style="margin-left:auto;">CRITICAL</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:4px;" id="report-generated-time"></div>
            </div>
          </div>
        </div>

        <!-- 1. Case Summary -->
        <div class="report-section">
          <div class="report-section-title"><span class="section-num">01</span> Case Summary</div>
          <div class="report-row"><span class="report-key">Alert ID</span><span class="report-val">A001</span></div>
          <div class="report-row"><span class="report-key">Case ID</span><span class="report-val">INV-001</span></div>
          <div class="report-row"><span class="report-key">Subject Account</span><span class="report-val">ACC-8821 — Rajesh Kumar</span></div>
          <div class="report-row"><span class="report-key">Account Type</span><span class="report-val">Savings Account (since Mar 2018)</span></div>
          <div class="report-row"><span class="report-key">Alert Raised</span><span class="report-val">January 16, 2024 — 02:17 AM</span></div>
          <div class="report-row"><span class="report-key">Assigned Investigator</span><span class="report-val">Siddharth A. (Sr. Investigator)</span></div>
          <div class="report-row"><span class="report-key">Current Status</span><span class="report-val">Open — Awaiting Investigator Decision</span></div>
          <div class="report-row"><span class="report-key">KYC Status</span><span class="report-val">Verified ✓</span></div>
        </div>

        <!-- 2. Risk Assessment -->
        <div class="report-section">
          <div class="report-section-title"><span class="section-num">02</span> Risk Assessment</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:16px;">
            <div style="background:var(--risk-critical-bg);border:1px solid rgba(239,68,68,0.3);border-radius:6px;padding:12px;text-align:center;">
              <div style="font-size:28px;font-weight:900;color:var(--risk-critical);">94</div>
              <div style="font-size:11px;color:var(--text-muted);">Risk Score</div>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:12px;text-align:center;">
              <div style="font-size:18px;font-weight:700;color:var(--text-primary);">CRITICAL</div>
              <div style="font-size:11px;color:var(--text-muted);">Risk Level</div>
            </div>
            <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;padding:12px;text-align:center;">
              <div style="font-size:18px;font-weight:700;color:var(--risk-critical);">₹1,72,000</div>
              <div style="font-size:11px;color:var(--text-muted);">Total Exposure</div>
            </div>
          </div>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead><tr style="background:var(--bg-surface);">
              <th style="text-align:left;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Risk Factor</th>
              <th style="text-align:center;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Score</th>
              <th style="text-align:left;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Detail</th>
            </tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-light);">
                <td style="padding:8px 12px;font-weight:600;">Transaction Velocity</td>
                <td style="padding:8px 12px;text-align:center;font-weight:800;color:var(--risk-critical);">20/20</td>
                <td style="padding:8px 12px;color:var(--text-muted);">3 transactions in 3 minutes</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-light);">
                <td style="padding:8px 12px;font-weight:600;">Amount Anomaly</td>
                <td style="padding:8px 12px;text-align:center;font-weight:800;color:var(--risk-critical);">20/20</td>
                <td style="padding:8px 12px;color:var(--text-muted);">₹42K–₹75K vs avg ₹3,200 (23×)</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-light);">
                <td style="padding:8px 12px;font-weight:600;">Location Anomaly</td>
                <td style="padding:8px 12px;text-align:center;font-weight:800;color:var(--risk-critical);">18/20</td>
                <td style="padding:8px 12px;color:var(--text-muted);">Mumbai; account usual location: Ahmedabad</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-light);">
                <td style="padding:8px 12px;font-weight:600;">New Device</td>
                <td style="padding:8px 12px;text-align:center;font-weight:800;color:var(--risk-critical);">15/15</td>
                <td style="padding:8px 12px;color:var(--text-muted);">First-ever iPhone; usual device: Samsung</td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-light);">
                <td style="padding:8px 12px;font-weight:600;">Unusual Time</td>
                <td style="padding:8px 12px;text-align:center;font-weight:800;color:var(--risk-high);">12/15</td>
                <td style="padding:8px 12px;color:var(--text-muted);">02:15 AM; normal hours: 8AM–10PM</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-weight:600;">Network Risk</td>
                <td style="padding:8px 12px;text-align:center;font-weight:800;color:var(--risk-high);">9/10</td>
                <td style="padding:8px 12px;color:var(--text-muted);">Recipient accounts previously flagged</td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 3. Key Evidence -->
        <div class="report-section">
          <div class="report-section-title"><span class="section-num">03</span> Key Evidence</div>
          <div>
            <div class="report-evidence-item"><span class="ev-num">1</span><span>Three online transfers at 02:15, 02:16, 02:17 AM — totalling ₹1,72,000 — executed from Mumbai on a new iPhone never previously registered on this account.</span></div>
            <div class="report-evidence-item"><span class="ev-num">2</span><span>Account's average transaction amount is ₹3,200; maximum historical transaction was ₹9,800. Suspicious transactions are 13×–23× above average.</span></div>
            <div class="report-evidence-item"><span class="ev-num">3</span><span>All 22 prior transactions in the last 30 days were executed in Ahmedabad using a Samsung Galaxy A52. This is the first transaction from Mumbai or any iPhone.</span></div>
            <div class="report-evidence-item"><span class="ev-num">4</span><span>Destination accounts ACC-4421, ACC-5532, and ACC-7743 have been flagged in prior unrelated suspicious pattern reviews. All three received funds within the same 3-minute window.</span></div>
            <div class="report-evidence-item"><span class="ev-num">5</span><span>The account balance (₹74,500) was significantly drawn down. Total suspicious debit represents approximately 230% of the account's average monthly activity.</span></div>
          </div>
        </div>

        <!-- 4. Transaction Pattern -->
        <div class="report-section">
          <div class="report-section-title"><span class="section-num">04</span> Suspicious Transaction Pattern</div>
          <table style="width:100%;border-collapse:collapse;font-size:13px;">
            <thead><tr style="background:var(--bg-surface);">
              <th style="text-align:left;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Transaction ID</th>
              <th style="text-align:left;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Time</th>
              <th style="text-align:right;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Amount</th>
              <th style="text-align:left;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Location</th>
              <th style="text-align:left;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Device</th>
              <th style="text-align:center;padding:8px 12px;color:var(--text-muted);font-size:11px;border-bottom:1px solid var(--border);">Status</th>
            </tr></thead>
            <tbody>
              <tr style="border-bottom:1px solid var(--border-light);background:rgba(239,68,68,0.04);">
                <td style="padding:8px 12px;font-family:monospace;font-size:12px;">TX-88210001</td>
                <td style="padding:8px 12px;font-weight:700;color:var(--risk-critical);">02:15 AM</td>
                <td style="padding:8px 12px;text-align:right;font-weight:800;color:var(--risk-critical);">₹42,000</td>
                <td style="padding:8px 12px;">Mumbai</td>
                <td style="padding:8px 12px;">New iPhone</td>
                <td style="padding:8px 12px;text-align:center;"><span class="risk-badge risk-critical">Suspicious</span></td>
              </tr>
              <tr style="border-bottom:1px solid var(--border-light);background:rgba(239,68,68,0.04);">
                <td style="padding:8px 12px;font-family:monospace;font-size:12px;">TX-88210002</td>
                <td style="padding:8px 12px;font-weight:700;color:var(--risk-critical);">02:16 AM</td>
                <td style="padding:8px 12px;text-align:right;font-weight:800;color:var(--risk-critical);">₹55,000</td>
                <td style="padding:8px 12px;">Mumbai</td>
                <td style="padding:8px 12px;">New iPhone</td>
                <td style="padding:8px 12px;text-align:center;"><span class="risk-badge risk-critical">Suspicious</span></td>
              </tr>
              <tr style="background:rgba(239,68,68,0.04);">
                <td style="padding:8px 12px;font-family:monospace;font-size:12px;">TX-88210003</td>
                <td style="padding:8px 12px;font-weight:700;color:var(--risk-critical);">02:17 AM</td>
                <td style="padding:8px 12px;text-align:right;font-weight:800;color:var(--risk-critical);">₹75,000</td>
                <td style="padding:8px 12px;">Mumbai</td>
                <td style="padding:8px 12px;">New iPhone</td>
                <td style="padding:8px 12px;text-align:center;"><span class="risk-badge risk-critical">Suspicious</span></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 5. Network Observations -->
        <div class="report-section">
          <div class="report-section-title"><span class="section-num">05</span> Network Observations</div>
          <div style="font-size:13px;color:var(--text-secondary);line-height:1.6;margin-bottom:12px;">
            The subject account transferred funds to three accounts within 3 minutes. These accounts require independent investigation. The following relationships were identified:
          </div>
          <div style="display:flex;flex-direction:column;gap:5px;">
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-size:12.5px;">
              <span class="risk-badge risk-critical" style="min-width:85px;justify-content:center;">Requires review</span>
              <span style="font-weight:600;">ACC-4421 (Bharat T.)</span>
              <span style="color:var(--text-muted);">Received ₹42,000</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-size:12.5px;">
              <span class="risk-badge risk-high" style="min-width:85px;justify-content:center;">Suspicious</span>
              <span style="font-weight:600;">ACC-5532 (Meena P.)</span>
              <span style="color:var(--text-muted);">Received ₹55,000</span>
            </div>
            <div style="display:flex;align-items:center;gap:10px;padding:8px 10px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-size:12.5px;">
              <span class="risk-badge risk-critical" style="min-width:85px;justify-content:center;">Requires review</span>
              <span style="font-weight:600;">ACC-7743 (Vikram R.)</span>
              <span style="color:var(--text-muted);">Received ₹75,000</span>
            </div>
          </div>
          <div style="margin-top:10px;font-size:11px;color:var(--text-muted);font-style:italic;">
            ⚠ Relationship flags do not constitute a criminal determination. Independent investigation of connected accounts is required before any regulatory action.
          </div>
        </div>

        <!-- 6. AI-Assisted Summary -->
        <div class="report-section">
          <div class="report-section-title"><span class="section-num">06</span> AI-Assisted Summary</div>
          <div class="report-ai-block" style="margin-bottom:8px;">
            <strong>AI Assessment (Demo):</strong><br><br>
            Account ACC-8821 exhibits a high-probability unauthorized-access pattern. The combination of a new device, unfamiliar location, late-night timing, and aggressive transaction velocity — all occurring simultaneously — creates a compounding risk profile that is extremely rare in legitimate account activity.<br><br>
            The three transactions (₹42,000 → ₹55,000 → ₹75,000) show an escalating pattern consistent with fund extraction before potential account lockout. Total exposure of ₹1,72,000 represents approximately 230% of the account's average monthly throughput.<br><br>
            <strong>Recommendation:</strong> Immediate contact with the account holder is advised. If the account holder cannot confirm authorization, consider initiating a temporary hold and escalating to the compliance team for STR evaluation.
          </div>
          <div style="font-size:11px;color:var(--text-muted);font-style:italic;">
            ⚠ AI-assisted summary for investigator review only. This is a demo response. Connect a backend LLM API for production-grade AI analysis. Final regulatory/legal decision rests with the human investigator.
          </div>
        </div>

        <!-- 7. Investigator Decision -->
        <div class="report-section">
          <div class="report-section-title"><span class="section-num">07</span> Investigator Decision</div>
          <div id="investigator-decision-block">
            <div style="padding:16px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;margin-bottom:14px;">
              <div style="font-size:13px;color:var(--text-muted);margin-bottom:10px;">Select investigator decision for this case:</div>
              <div style="display:flex;gap:8px;flex-wrap:wrap;">
                <button class="btn btn-danger" onclick="recordDecision('Escalate to Compliance')">↑ Escalate to Compliance</button>
                <button class="btn btn-warning" onclick="recordDecision('Continue Monitoring')">👁 Continue Monitoring</button>
                <button class="btn btn-success" onclick="recordDecision('Mark as Legitimate')">✓ Mark as Legitimate</button>
                <button class="btn btn-secondary" onclick="recordDecision('Request More Information')">ℹ Request More Info</button>
              </div>
            </div>
            <div id="decision-recorded" style="display:none;padding:12px 16px;background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25);border-radius:6px;">
              <strong style="color:var(--risk-low);">Decision Recorded</strong>
              <span id="decision-text" style="color:var(--text-secondary);margin-left:8px;font-size:13px;"></span>
              <span style="color:var(--text-muted);font-size:11px;margin-left:8px;" id="decision-timestamp"></span>
            </div>
          </div>
        </div>

        <!-- 8. Next Steps -->
        <div class="report-section">
          <div class="report-section-title"><span class="section-num">08</span> Recommended Next Steps</div>
          <div style="display:flex;flex-direction:column;gap:5px;font-size:13px;">
            <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;">
              <span style="background:var(--accent);color:#fff;border-radius:50%;width:20px;height:20px;min-width:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">1</span>
              <span style="color:var(--text-secondary);">Contact account holder immediately to verify if the three Mumbai transactions (02:15–02:17 AM) were authorized.</span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;">
              <span style="background:var(--accent);color:#fff;border-radius:50%;width:20px;height:20px;min-width:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">2</span>
              <span style="color:var(--text-secondary);">Review device registration and authentication logs for the new iPhone device ID.</span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;">
              <span style="background:var(--accent);color:#fff;border-radius:50%;width:20px;height:20px;min-width:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">3</span>
              <span style="color:var(--text-secondary);">Initiate independent investigation for recipient accounts ACC-4421, ACC-5532, and ACC-7743.</span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;">
              <span style="background:var(--accent);color:#fff;border-radius:50%;width:20px;height:20px;min-width:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">4</span>
              <span style="color:var(--text-secondary);">If unauthorized access is confirmed, submit a Suspicious Transaction Report (STR) in accordance with applicable AML regulations.</span>
            </div>
            <div style="display:flex;align-items:flex-start;gap:8px;padding:6px 0;">
              <span style="background:var(--accent);color:#fff;border-radius:50%;width:20px;height:20px;min-width:20px;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;">5</span>
              <span style="color:var(--text-secondary);">Schedule next review within 24 hours of account holder contact or regulatory timeline, whichever is earlier.</span>
            </div>
          </div>
        </div>

        <!-- Report Footer -->
        <div style="background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius);padding:14px 20px;display:flex;justify-content:space-between;font-size:12px;color:var(--text-muted);flex-wrap:wrap;gap:8px;">
          <span>FinGuard Investigation Copilot — Demo Report</span>
          <span id="report-footer-time"></span>
          <span>Investigator: Siddharth A. (Sr. Investigator)</span>
        </div>

      </div>

    </main>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>

<script src="../js/app.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar('reports', '../');
  buildTopbar('Investigation Reports', false);
});

function generateReport() {
  document.getElementById('report-empty').style.display = 'none';
  document.getElementById('report-content').style.display = 'block';
  const now = new Date().toLocaleString('en-IN', {
    day:'2-digit', month:'short', year:'numeric',
    hour:'2-digit', minute:'2-digit', hour12:true
  });
  document.getElementById('report-generated-time').textContent = 'Generated: ' + now;
  document.getElementById('report-footer-time').textContent = 'Generated: ' + now;
  showToast('Investigation brief generated for Case INV-001 / Alert A001', 'success', 4000);

  // Auto-scroll
  setTimeout(() => {
    document.getElementById('report-content').scrollIntoView({ behavior:'smooth' });
  }, 200);
}

// Auto-generate if opened from alert-details with ?id=A001
const alertId = new URLSearchParams(window.location.search).get('id');
if (alertId === 'A001') {
  document.addEventListener('DOMContentLoaded', () => setTimeout(generateReport, 400));
}

function recordDecision(decision) {
  const now = new Date().toLocaleString('en-IN', {
    day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit', hour12:true
  });
  document.getElementById('decision-text').textContent = decision;
  document.getElementById('decision-timestamp').textContent = '— ' + now + ' — Siddharth A.';
  document.getElementById('decision-recorded').style.display = 'block';

  // Save to localStorage
  localStorage.setItem('fg_report_decision_A001', JSON.stringify({ decision, time: now }));

  showToast(`Decision recorded: ${decision}`, 'success');
}
</script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — Analytics</title>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="stylesheet" href="../css/dashboard.css" />
  <style>
    .analytics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin-bottom: 20px;
    }
    .analytics-grid-3 {
      display: grid;
      grid-template-columns: repeat(3,1fr);
      gap: 20px;
      margin-bottom: 20px;
    }
    .metric-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      display: flex; flex-direction: column; gap: 6px;
    }
    .metric-label { font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.8px; color: var(--text-muted); }
    .metric-value { font-size: 32px; font-weight: 800; color: var(--text-primary); line-height: 1; }
    .metric-delta { font-size: 12px; color: var(--text-muted); }
    .metric-delta.up { color: var(--risk-critical); }
    .metric-delta.down { color: var(--risk-low); }
    .mini-bar-chart { display: flex; align-items: flex-end; gap: 4px; height: 60px; margin-top: 10px; }
    .mini-bar { flex: 1; border-radius: 2px 2px 0 0; min-width: 8px; }
    @media (max-width: 900px) {
      .analytics-grid, .analytics-grid-3 { grid-template-columns: 1fr; }
    }
  </style>
</head>
<body>
<div class="app-layout">

  <aside id="sidebar" class="sidebar"></aside>

  <div class="main-content">
    <header id="topbar" class="topbar"></header>

    <main class="page-body">

      <!-- Header -->
      <div class="section-header mb-20">
        <div>
          <div class="section-title">Analytics & Insights</div>
          <div class="section-subtitle">Fraud and AML investigation performance metrics — Last 30 Days</div>
        </div>
        <div style="display:flex;gap:8px;">
          <select class="form-control" style="font-size:12px;padding:5px 10px;">
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Quarter</option>
            <option>This Year</option>
          </select>
          <button class="btn btn-secondary btn-sm" onclick="showToast('Analytics exported (Demo)', 'success')">Export</button>
        </div>
      </div>

      <!-- KPI Metrics -->
      <div class="analytics-grid-3 mb-20">
        <div class="metric-card">
          <div class="metric-label">Total Alerts (30d)</div>
          <div class="metric-value">143</div>
          <div class="metric-delta up">▲ +12% vs prior period</div>
          <div class="mini-bar-chart" id="alert-mini-chart"></div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Critical Alerts</div>
          <div class="metric-value" style="color:var(--risk-critical);">12</div>
          <div class="metric-delta up">▲ +4 this week</div>
          <div class="mini-bar-chart" id="critical-mini-chart"></div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Avg Resolution Time</div>
          <div class="metric-value">4.2h</div>
          <div class="metric-delta down">▼ -0.8h improved</div>
          <div class="mini-bar-chart" id="resolution-mini-chart"></div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Cases Investigated</div>
          <div class="metric-value">15</div>
          <div class="metric-delta">3 escalated, 6 closed</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">Total Exposure (30d)</div>
          <div class="metric-value" style="color:var(--risk-high);">₹18.4L</div>
          <div class="metric-delta up">▲ +22% vs prior period</div>
        </div>
        <div class="metric-card">
          <div class="metric-label">False Positive Rate</div>
          <div class="metric-value">18%</div>
          <div class="metric-delta down">▼ -3% improvement</div>
        </div>
      </div>

      <!-- Charts Row -->
      <div class="analytics-grid mb-20">

        <!-- Alert Volume Trend -->
        <div class="chart-container">
          <div class="chart-title">Alert Volume — Last 30 Days</div>
          <div class="chart-subtitle">Daily alert count by risk level</div>
          <div id="volume-chart" style="margin-top:12px;"></div>
        </div>

        <!-- Risk Level Distribution -->
        <div class="chart-container">
          <div class="chart-title">Risk Level Distribution</div>
          <div class="chart-subtitle">Breakdown of current active alerts</div>
          <div id="risk-dist-chart" style="margin-top:12px;"></div>
        </div>

      </div>

      <!-- Investigation Workload + Top Accounts -->
      <div class="analytics-grid mb-20">

        <!-- Investigation Workload Chart -->
        <div class="chart-container">
          <div class="chart-title">Investigator Performance</div>
          <div class="chart-subtitle">Cases handled per investigator (30 days)</div>
          <div id="investigator-chart" style="margin-top:14px;"></div>
        </div>

        <!-- Transaction Anomaly Statistics -->
        <div class="chart-container">
          <div class="chart-title">Transaction Anomaly Types</div>
          <div class="chart-subtitle">Breakdown of risk factor triggers</div>
          <div id="anomaly-chart" style="margin-top:14px;"></div>
        </div>

      </div>

      <!-- Bottom Row: Top Flagged Locations + Account Risk -->
      <div class="analytics-grid">

        <!-- Top Flagged Locations -->
        <div class="chart-container">
          <div class="chart-title">Top Flagged Locations</div>
          <div class="chart-subtitle">Cities with highest alert counts</div>
          <div id="location-chart" style="margin-top:14px;"></div>
        </div>

        <!-- Alert Status Distribution -->
        <div class="chart-container">
          <div class="chart-title">Alert Status Overview</div>
          <div class="chart-subtitle">Current status of all active investigations</div>
          <div id="status-chart" style="margin-top:14px;"></div>
        </div>

      </div>

    </main>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>

<script src="../js/app.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar('analytics', '../');
  buildTopbar('Analytics', false);
  renderAnalyticsCharts();
});

function renderBarH(container, data, colorFn) {
  const max = Math.max(...data.map(d => d.value));
  container.innerHTML = data.map(d => {
    const pct = Math.round((d.value / max) * 100);
    const color = colorFn(d);
    return `
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:8px;">
        <div style="min-width:120px;font-size:12px;color:var(--text-secondary);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;">${d.label}</div>
        <div style="flex:1;background:var(--bg-surface);border-radius:3px;height:18px;overflow:hidden;">
          <div style="width:${pct}%;background:${color};height:100%;border-radius:3px;transition:width 0.5s ease;"></div>
        </div>
        <div style="min-width:32px;text-align:right;font-size:12.5px;font-weight:700;color:${color};">${d.value}</div>
      </div>
    `;
  }).join('');
}

function renderMiniBar(containerId, values, color) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const max = Math.max(...values);
  el.innerHTML = values.map(v => {
    const h = Math.round((v / max) * 56) + 4;
    return `<div class="mini-bar" style="height:${h}px;background:${color};opacity:0.7;"></div>`;
  }).join('');
}

function renderAnalyticsCharts() {
  // Mini charts
  renderMiniBar('alert-mini-chart', [12,18,15,22,27,14,16,20,25,18,22,30,14,12,16,19,24,28,22,15,18,23,27,31,20,17,15,22,19,14], 'var(--accent)');
  renderMiniBar('critical-mini-chart', [1,2,1,3,4,1,2,1,3,2,1,4,1,2,1,2,3,5,2,1,2,3,3,4,2,1,1,3,2,1], 'var(--risk-critical)');
  renderMiniBar('resolution-mini-chart', [5,4.5,4.8,4.2,3.9,4.6,5.1,4.3,3.8,4.0,4.5,3.7,4.2,4.0,4.1,3.9,3.7,3.5,4.0,3.8,4.1,3.9,3.8,3.6,4.2,4.0,3.8,4.2,4.1,4.2], 'var(--risk-low)');

  // Alert Volume Bar Chart (30 day sample - 2 weeks visible)
  const volumeEl = document.getElementById('volume-chart');
  if (volumeEl) {
    const days = ['Jan 1','Jan 3','Jan 5','Jan 7','Jan 9','Jan 11','Jan 13','Jan 15'];
    const vals = [14, 19, 22, 17, 28, 15, 24, 31];
    const criticals = [2, 3, 2, 1, 4, 1, 3, 5];
    const maxV = Math.max(...vals);
    const h = 120;
    volumeEl.innerHTML = `
      <div style="display:flex;align-items:flex-end;gap:6px;height:${h}px;">
        ${vals.map((v, i) => {
          const totalH = Math.round((v / maxV) * h);
          const critH  = Math.round((criticals[i] / maxV) * h);
          const normH  = totalH - critH;
          return `
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:2px;height:100%;justify-content:flex-end;">
              <div style="font-size:10px;color:var(--text-muted);">${v}</div>
              <div style="width:100%;display:flex;flex-direction:column;">
                <div style="height:${normH}px;background:var(--accent);border-radius:3px 3px 0 0;opacity:0.7;"></div>
                <div style="height:${critH}px;background:var(--risk-critical);"></div>
              </div>
              <div style="font-size:9px;color:var(--text-muted);white-space:nowrap;">${days[i]}</div>
            </div>
          `;
        }).join('')}
      </div>
      <div style="display:flex;gap:14px;margin-top:8px;">
        <span style="font-size:11px;color:var(--text-muted);display:flex;align-items:center;gap:4px;">
          <span style="width:10px;height:10px;background:var(--accent);opacity:0.7;border-radius:2px;display:inline-block;"></span>Normal
        </span>
        <span style="font-size:11px;color:var(--text-muted);display:flex;align-items:center;gap:4px;">
          <span style="width:10px;height:10px;background:var(--risk-critical);border-radius:2px;display:inline-block;"></span>Critical
        </span>
      </div>
    `;
  }

  // Risk Distribution (horizontal bar)
  const riskDistEl = document.getElementById('risk-dist-chart');
  if (riskDistEl) {
    renderBarH(riskDistEl, [
      { label: 'Critical', value: 12 },
      { label: 'High',     value: 28 },
      { label: 'Medium',   value: 54 },
      { label: 'Low',      value: 49 },
    ], d => ({Critical:'#ef4444',High:'#f97316',Medium:'#f59e0b',Low:'#22c55e'}[d.label]));
  }

  // Investigator Performance
  const invEl = document.getElementById('investigator-chart');
  if (invEl) {
    renderBarH(invEl, [
      { label: 'Siddharth A.', value: 32 },
      { label: 'Pooja N.',     value: 28 },
      { label: 'Rekha T.',     value: 25 },
      { label: 'Ajay K.',      value: 22 },
      { label: 'Vikram S.',    value: 18 },
    ], () => 'var(--accent)');
  }

  // Transaction Anomaly Types
  const anomalyEl = document.getElementById('anomaly-chart');
  if (anomalyEl) {
    renderBarH(anomalyEl, [
      { label: 'Amount Anomaly',   value: 98 },
      { label: 'New Device',       value: 73 },
      { label: 'Location Anomaly', value: 61 },
      { label: 'Velocity',         value: 45 },
      { label: 'Unusual Time',     value: 39 },
      { label: 'Network Risk',     value: 27 },
    ], d => {
      const map = {'Amount Anomaly':'#ef4444','New Device':'#f97316','Location Anomaly':'#f59e0b','Velocity':'#f59e0b','Unusual Time':'#3b82f6','Network Risk':'#8b5cf6'};
      return map[d.label] || 'var(--accent)';
    });
  }

  // Top Flagged Locations
  const locationEl = document.getElementById('location-chart');
  if (locationEl) {
    renderBarH(locationEl, [
      { label: 'Mumbai',     value: 34 },
      { label: 'Delhi',      value: 28 },
      { label: 'Bengaluru',  value: 22 },
      { label: 'Hyderabad',  value: 18 },
      { label: 'Chennai',    value: 15 },
      { label: 'Pune',       value: 12 },
    ], () => 'var(--accent)');
  }

  // Alert Status Distribution
  const statusEl = document.getElementById('status-chart');
  if (statusEl) {
    renderBarH(statusEl, [
      { label: 'Open',        value: 38 },
      { label: 'In Review',   value: 22 },
      { label: 'Monitoring',  value: 18 },
      { label: 'Escalated',   value: 8  },
      { label: 'Closed',      value: 57 },
    ], d => ({
      Open:'#3b82f6', 'In Review':'#f59e0b', Monitoring:'#8b5cf6',
      Escalated:'#ef4444', Closed:'#22c55e'
    }[d.label]));
  }
}
</script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: write_file



> 🔧 **write_file** — <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FinGuard — Settings</title>
  <link rel="stylesheet" href="../css/style.css" />
  <style>
    .settings-layout {
      display: grid;
      grid-template-columns: 200px 1fr;
      gap: 20px;
      align-items: start;
    }
    .settings-nav {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 8px 0;
    }
    .settings-nav-item {
      padding: 9px 16px;
      font-size: 13px;
      color: var(--text-secondary);
      cursor: pointer;
      border-left: 3px solid transparent;
      display: flex; align-items: center; gap: 8px;
      transition: background 0.15s, color 0.15s, border-color 0.15s;
    }
    .settings-nav-item:hover { background: var(--bg-card-hover); color: var(--text-primary); }
    .settings-nav-item.active { background: rgba(59,130,246,0.08); color: var(--accent-hover); border-left-color: var(--accent); }
    .settings-section { display: none; }
    .settings-section.active { display: block; }
    .settings-card {
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px 24px;
      margin-bottom: 16px;
    }
    .settings-card-title {
      font-size: 14px; font-weight: 700; color: var(--text-primary);
      margin-bottom: 4px;
    }
    .settings-card-desc {
      font-size: 12px; color: var(--text-muted);
      margin-bottom: 16px;
    }
    .setting-row {
      display: flex; align-items: center; justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid var(--border-light);
    }
    .setting-row:last-child { border-bottom: none; }
    .setting-label { font-size: 13px; color: var(--text-primary); font-weight: 500; }
    .setting-desc  { font-size: 11px; color: var(--text-muted); margin-top: 2px; }
    /* Toggle switch */
    .toggle-wrap { position: relative; display: inline-block; width: 40px; height: 22px; cursor: pointer; }
    .toggle-wrap input { opacity: 0; width: 0; height: 0; position: absolute; }
    .toggle-slider {
      position: absolute; inset: 0;
      background: var(--bg-surface);
      border: 1px solid var(--border);
      border-radius: 11px;
      transition: background 0.2s;
    }
    .toggle-slider::before {
      content: ''; position: absolute;
      width: 16px; height: 16px;
      background: var(--text-muted);
      border-radius: 50%;
      top: 2px; left: 2px;
      transition: transform 0.2s, background 0.2s;
    }
    .toggle-wrap input:checked + .toggle-slider { background: rgba(59,130,246,0.3); border-color: var(--accent); }
    .toggle-wrap input:checked + .toggle-slider::before { transform: translateX(18px); background: var(--accent); }
    @media (max-width: 768px) {
      .settings-layout { grid-template-columns: 1fr; }
      .settings-nav { display: flex; overflow-x: auto; padding: 0; }
      .settings-nav-item { white-space: nowrap; border-left: none; border-bottom: 3px solid transparent; }
    }
  </style>
</head>
<body>
<div class="app-layout">

  <aside id="sidebar" class="sidebar"></aside>

  <div class="main-content">
    <header id="topbar" class="topbar"></header>

    <main class="page-body">

      <div class="section-header mb-20">
        <div class="section-title">Settings</div>
      </div>

      <div class="settings-layout">

        <!-- Settings Nav -->
        <div class="settings-nav">
          <div class="settings-nav-item active" onclick="switchSection('profile')">👤 Profile</div>
          <div class="settings-nav-item" onclick="switchSection('notifications')">🔔 Notifications</div>
          <div class="settings-nav-item" onclick="switchSection('thresholds')">📊 Risk Thresholds</div>
          <div class="settings-nav-item" onclick="switchSection('theme')">🎨 Appearance</div>
          <div class="settings-nav-item" onclick="switchSection('demo')">🛠 Demo Mode</div>
          <div class="settings-nav-item" onclick="switchSection('api')">🔌 API Integration</div>
        </div>

        <!-- Settings Panels -->
        <div>

          <!-- Profile -->
          <div id="section-profile" class="settings-section active">
            <div class="settings-card">
              <div class="settings-card-title">Investigator Profile</div>
              <div class="settings-card-desc">Your investigator identity used across the platform.</div>

              <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;padding:14px;background:var(--bg-surface);border:1px solid var(--border);border-radius:var(--radius-sm);">
                <div style="width:52px;height:52px;border-radius:50%;background:var(--accent-dark);display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;color:#fff;">SA</div>
                <div>
                  <div style="font-size:15px;font-weight:700;color:var(--text-primary);">Siddharth A.</div>
                  <div style="font-size:12px;color:var(--text-muted);">Sr. Investigator — Fraud & AML Unit</div>
                  <div style="font-size:11px;color:var(--accent);margin-top:2px;">siddharth.a@finguard.internal</div>
                </div>
                <button class="btn btn-secondary btn-sm" style="margin-left:auto;" onclick="showToast('Profile edit (Demo — no backend)', 'info')">Edit Photo</button>
              </div>

              <div class="grid-2 gap-16" style="margin-bottom:14px;">
                <div class="form-group">
                  <label class="form-label">First Name</label>
                  <input class="form-control" value="Siddharth" id="pf-first" />
                </div>
                <div class="form-group">
                  <label class="form-label">Last Name</label>
                  <input class="form-control" value="A." id="pf-last" />
                </div>
                <div class="form-group">
                  <label class="form-label">Email</label>
                  <input class="form-control" value="siddharth.a@finguard.internal" />
                </div>
                <div class="form-group">
                  <label class="form-label">Employee ID</label>
                  <input class="form-control" value="EMP-20240012" />
                </div>
                <div class="form-group">
                  <label class="form-label">Department</label>
                  <input class="form-control" value="Fraud & AML Investigation Unit" />
                </div>
                <div class="form-group">
                  <label class="form-label">Role</label>
                  <select class="form-control">
                    <option selected>Sr. Investigator</option>
                    <option>Investigator</option>
                    <option>Team Lead</option>
                    <option>Compliance Officer</option>
                  </select>
                </div>
              </div>
              <button class="btn btn-primary" onclick="saveProfile()">Save Changes</button>
              <button class="btn btn-secondary" style="margin-left:8px;" onclick="showToast('No changes made.', 'info')">Cancel</button>
            </div>

            <div class="settings-card">
              <div class="settings-card-title">Security</div>
              <div class="settings-card-desc">Manage authentication and session security.</div>
              <div class="setting-row">
                <div><div class="setting-label">Two-Factor Authentication</div><div class="setting-desc">Require 2FA for all logins</div></div>
                <label class="toggle-wrap"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">Session Timeout</div><div class="setting-desc">Auto-logout after inactivity</div></div>
                <select class="form-control" style="width:120px;"><option>30 minutes</option><option>1 hour</option><option>4 hours</option></select>
              </div>
            </div>
          </div>

          <!-- Notifications -->
          <div id="section-notifications" class="settings-section">
            <div class="settings-card">
              <div class="settings-card-title">Notification Preferences</div>
              <div class="settings-card-desc">Configure when and how you receive investigation alerts.</div>
              <div class="setting-row">
                <div><div class="setting-label">Critical Alert Notifications</div><div class="setting-desc">Immediate push for CRITICAL alerts</div></div>
                <label class="toggle-wrap"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">High Alert Notifications</div><div class="setting-desc">Notify for HIGH risk alerts</div></div>
                <label class="toggle-wrap"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">Medium Alert Notifications</div><div class="setting-desc">Notify for MEDIUM risk alerts</div></div>
                <label class="toggle-wrap"><input type="checkbox" /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">Daily Summary Email</div><div class="setting-desc">Receive daily alert summary at 08:00 AM</div></div>
                <label class="toggle-wrap"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">Case Assignment Alerts</div><div class="setting-desc">Notify when a new case is assigned to you</div></div>
                <label class="toggle-wrap"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">Audit Trail Updates</div><div class="setting-desc">Notify on activity in your assigned cases</div></div>
                <label class="toggle-wrap"><input type="checkbox" /><span class="toggle-slider"></span></label>
              </div>
              <div style="margin-top:14px;">
                <button class="btn btn-primary" onclick="showToast('Notification preferences saved', 'success')">Save Preferences</button>
              </div>
            </div>
          </div>

          <!-- Risk Thresholds -->
          <div id="section-thresholds" class="settings-section">
            <div class="settings-card">
              <div class="settings-card-title">Risk Score Thresholds</div>
              <div class="settings-card-desc">Define score boundaries for each risk level. These thresholds control alert classification.</div>
              <div style="display:flex;flex-direction:column;gap:12px;margin-bottom:16px;">
                <div style="display:grid;grid-template-columns:140px 100px 100px 1fr;align-items:center;gap:12px;padding:10px;background:var(--risk-low-bg);border:1px solid rgba(34,197,94,0.2);border-radius:6px;">
                  <div style="display:flex;align-items:center;gap:6px;font-weight:600;">
                    <span class="risk-badge risk-low">LOW</span>
                  </div>
                  <div><label class="form-label">Min Score</label><input class="form-control" value="0" type="number" /></div>
                  <div><label class="form-label">Max Score</label><input class="form-control" value="30" type="number" /></div>
                  <div style="font-size:12px;color:var(--text-muted);">Routine monitoring. No immediate action required.</div>
                </div>
                <div style="display:grid;grid-template-columns:140px 100px 100px 1fr;align-items:center;gap:12px;padding:10px;background:var(--risk-medium-bg);border:1px solid rgba(245,158,11,0.2);border-radius:6px;">
                  <div><span class="risk-badge risk-medium">MEDIUM</span></div>
                  <div><label class="form-label">Min Score</label><input class="form-control" value="31" type="number" /></div>
                  <div><label class="form-label">Max Score</label><input class="form-control" value="60" type="number" /></div>
                  <div style="font-size:12px;color:var(--text-muted);">Review required within 24 hours.</div>
                </div>
                <div style="display:grid;grid-template-columns:140px 100px 100px 1fr;align-items:center;gap:12px;padding:10px;background:var(--risk-high-bg);border:1px solid rgba(249,115,22,0.2);border-radius:6px;">
                  <div><span class="risk-badge risk-high">HIGH</span></div>
                  <div><label class="form-label">Min Score</label><input class="form-control" value="61" type="number" /></div>
                  <div><label class="form-label">Max Score</label><input class="form-control" value="80" type="number" /></div>
                  <div style="font-size:12px;color:var(--text-muted);">Priority review. Investigate within 4 hours.</div>
                </div>
                <div style="display:grid;grid-template-columns:140px 100px 100px 1fr;align-items:center;gap:12px;padding:10px;background:var(--risk-critical-bg);border:1px solid rgba(239,68,68,0.2);border-radius:6px;">
                  <div><span class="risk-badge risk-critical">CRITICAL</span></div>
                  <div><label class="form-label">Min Score</label><input class="form-control" value="81" type="number" /></div>
                  <div><label class="form-label">Max Score</label><input class="form-control" value="100" type="number" /></div>
                  <div style="font-size:12px;color:var(--text-muted);">Immediate escalation. Investigate within 1 hour.</div>
                </div>
              </div>
              <button class="btn btn-primary" onclick="showToast('Risk thresholds saved (Demo)', 'success')">Save Thresholds</button>
              <button class="btn btn-secondary" style="margin-left:8px;" onclick="showToast('Thresholds reset to defaults', 'info')">Reset Defaults</button>
            </div>
          </div>

          <!-- Appearance -->
          <div id="section-theme" class="settings-section">
            <div class="settings-card">
              <div class="settings-card-title">Appearance</div>
              <div class="settings-card-desc">Customize the visual interface.</div>
              <div class="setting-row">
                <div><div class="setting-label">Theme</div><div class="setting-desc">Choose between dark and light mode</div></div>
                <div style="display:flex;gap:6px;">
                  <button class="btn btn-primary btn-sm" onclick="showToast('Dark mode is default (Demo)', 'info')">Dark Mode</button>
                  <button class="btn btn-secondary btn-sm" onclick="showToast('Light mode coming in v2 (Demo)', 'info')">Light Mode</button>
                </div>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">Sidebar Collapsed</div><div class="setting-desc">Start with a compact sidebar</div></div>
                <label class="toggle-wrap"><input type="checkbox" /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">Dense Tables</div><div class="setting-desc">Compact row height for data tables</div></div>
                <label class="toggle-wrap"><input type="checkbox" checked /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">Language</div><div class="setting-desc">Interface language</div></div>
                <select class="form-control" style="width:130px;"><option>English (IN)</option><option>Hindi</option></select>
              </div>
            </div>
          </div>

          <!-- Demo Mode -->
          <div id="section-demo" class="settings-section">
            <div class="settings-card" style="border-color:rgba(59,130,246,0.3);background:rgba(59,130,246,0.04);">
              <div class="settings-card-title" style="color:var(--accent-hover);">🛠 Demo Data Mode</div>
              <div class="settings-card-desc">This installation uses synthetic demonstration data. No real customer or banking information.</div>
              <div class="setting-row">
                <div><div class="setting-label">Demo Mode</div><div class="setting-desc">All data is synthetic — no real information</div></div>
                <label class="toggle-wrap"><input type="checkbox" checked disabled /><span class="toggle-slider"></span></label>
              </div>
              <div class="setting-row">
                <div><div class="setting-label">AI Copilot Mode</div><div class="setting-desc">Currently using predefined demo responses</div></div>
                <span style="font-size:12px;color:var(--text-muted);">DEMO (predefined)</span>
              </div>
              <div style="margin-top:14px;padding:12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-size:12px;color:var(--text-secondary);line-height:1.6;">
                <strong>To connect a real backend:</strong><br>
                Replace demo data in <code style="background:var(--bg-card);padding:1px 4px;border-radius:3px;">js/</code> files with
                <code style="background:var(--bg-card);padding:1px 4px;border-radius:3px;">fetch()</code> calls to the documented REST APIs.
                See API-ready comments in each JS file for endpoint reference.
              </div>
              <div style="margin-top:10px;">
                <button class="btn btn-secondary" onclick="clearAllDemoData()">🗑 Clear Demo LocalStorage Data</button>
              </div>
            </div>
          </div>

          <!-- API Integration -->
          <div id="section-api" class="settings-section">
            <div class="settings-card">
              <div class="settings-card-title">API Integration Reference</div>
              <div class="settings-card-desc">FinGuard is designed for backend integration. Replace demo data with these API endpoints.</div>
              <div style="display:flex;flex-direction:column;gap:6px;font-size:12.5px;">
                <div style="padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-family:monospace;display:flex;gap:10px;">
                  <span style="color:var(--risk-low);font-weight:700;">GET</span>
                  <span style="color:var(--text-primary);">/api/alerts</span>
                  <span style="color:var(--text-muted);margin-left:auto;">List all alerts</span>
                </div>
                <div style="padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-family:monospace;display:flex;gap:10px;">
                  <span style="color:var(--risk-low);font-weight:700;">GET</span>
                  <span style="color:var(--text-primary);">/api/alerts/{alert_id}</span>
                  <span style="color:var(--text-muted);margin-left:auto;">Alert details</span>
                </div>
                <div style="padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-family:monospace;display:flex;gap:10px;">
                  <span style="color:var(--risk-low);font-weight:700;">GET</span>
                  <span style="color:var(--text-primary);">/api/accounts/{id}/network</span>
                  <span style="color:var(--text-muted);margin-left:auto;">Account network</span>
                </div>
                <div style="padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-family:monospace;display:flex;gap:10px;">
                  <span style="color:var(--risk-medium);font-weight:700;">POST</span>
                  <span style="color:var(--text-primary);">/api/copilot/chat</span>
                  <span style="color:var(--text-muted);margin-left:auto;">AI Copilot LLM</span>
                </div>
                <div style="padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-family:monospace;display:flex;gap:10px;">
                  <span style="color:var(--risk-medium);font-weight:700;">POST</span>
                  <span style="color:var(--text-primary);">/api/reports/investigation</span>
                  <span style="color:var(--text-muted);margin-left:auto;">Report generation</span>
                </div>
                <div style="padding:8px 12px;background:var(--bg-surface);border:1px solid var(--border);border-radius:6px;font-family:monospace;display:flex;gap:10px;">
                  <span style="color:var(--risk-medium);font-weight:700;">POST</span>
                  <span style="color:var(--text-primary);">/api/investigations/{id}/escalate</span>
                  <span style="color:var(--text-muted);margin-left:auto;">Escalate case</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </main>
  </div>
</div>

<div id="toast-container" class="toast-container"></div>

<script src="../js/app.js"></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  buildSidebar('settings', '../');
  buildTopbar('Settings', false);
});

function switchSection(name) {
  document.querySelectorAll('.settings-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.settings-nav-item').forEach(n => n.classList.remove('active'));
  const section = document.getElementById('section-' + name);
  if (section) section.classList.add('active');
  // Find the nav item that matches
  document.querySelectorAll('.settings-nav-item').forEach(n => {
    if (n.getAttribute('onclick')?.includes(`'${name}'`)) n.classList.add('active');
  });
}

function saveProfile() {
  const first = document.getElementById('pf-first')?.value || 'Siddharth';
  const last  = document.getElementById('pf-last')?.value  || 'A.';
  localStorage.setItem('fg_investigator_name', first + ' ' + last);
  showToast('Profile saved: ' + first + ' ' + last, 'success');
}

function clearAllDemoData() {
  showConfirm('Clear Demo Data', 'This will remove all saved notes, decisions, and audit trails from localStorage. Demo data will reload on next visit.', () => {
    Object.keys(localStorage).filter(k => k.startsWith('fg_')).forEach(k => localStorage.removeItem(k));
    showToast('All FinGuard demo data cleared.', 'success');
  }, 'warning');
}
</script>
</body>
</html>


### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Create folder structure and assets (logo.svg)
[x] Create CSS files (style.css, dashboard.css, alerts.css, details.css)
[x] Create JS files (app.js, dashboard.js, alerts.js, details.js, network.js, copilot.js)
[x] Create index.html (Dashboard)
[x] Create pages/alerts.html
[x] Create pages/alert-details.html
[x] Create pages/network.html
[x] Create pages/investigations.html
[x] Create pages/copilot.html
[x] Create pages/reports.html
[x] Create pages/analytics.html
[x] Create pages/settings.html
[-] Verify all paths, links, and files


### 🤖 Assistant

> 🔧 called: update_todo_list



> 🔧 **update_todo_list** — 
[x] Create folder structure and assets (logo.svg)
[x] Create CSS files (style.css, dashboard.css, alerts.css, details.css)
[x] Create JS files (app.js, dashboard.js, alerts.js, details.js, network.js, copilot.js)
[x] Create index.html (Dashboard)
[x] Create pages/alerts.html
[x] Create pages/alert-details.html
[x] Create pages/network.html
[x] Create pages/investigations.html
[x] Create pages/copilot.html
[x] Create pages/reports.html
[x] Create pages/analytics.html
[x] Create pages/settings.html
[-] Verify all paths, links, and fix any issues


### 🤖 Assistant

> 🔧 called: execute_command

Let me skip the todo update and just verify the project. Let me run a quick structural check:

> 🔧 **execute_command** — Get-ChildItem -Path "FinGuard" -Recurse -File | Select-Object FullName | ForEach-Object { $_.FullName -replace [regex]::Escape((Get-Location).Path + "\"), "" }

### 🤖 Assistant

> 🔧 called: execute_command

All 20 files are in place. Now let me do a thorough verification of the critical paths and fix any issues:

> 🔧 **execute_command** — # Check all CSS/JS links in index.html
Select-String -Path "FinGuard\index.html" -Pattern "href=|src=" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — # Check pages CSS/JS references
Select-String -Path "FinGuard\pages\alert-details.html" -Pattern "href=|src=" | Select-Object Line
Write-Host "---"
Select-String -Path "FinGuard\pages\copilot.html" -Pattern "href=.*css|src=.*js" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — # Check sidebar logo path in app.js - critical for both root and pages/
Select-String -Path "FinGuard\js\app.js" -Pattern "logo.svg|basePath" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — # Verify pages use correct basePath '../' for sidebar
Select-String -Path "FinGuard\pages\alerts.html" -Pattern "buildSidebar" | Select-Object Line
Select-String -Path "FinGuard\pages\network.html" -Pattern "buildSidebar" | Select-Object Line
Select-String -Path "FinGuard\pages\investigations.html" -Pattern "buildSidebar" | Select-Object Line
Select-String -Path "FinGuard\pages\reports.html" -Pattern "buildSidebar" | Select-Object Line
Select-String -Path "FinGuard\pages\analytics.html" -Pattern "buildSidebar" | Select-Object Line
Select-String -Path "FinGuard\pages\settings.html" -Pattern "buildSidebar" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — # Alerts and network use ../
Select-String -Path "FinGuard\pages\alerts.html","FinGuard\pages\network.html","FinGuard\pages\copilot.html" -Pattern "buildSidebar|initAlertsPage|initNetworkPage|initCopilotPage" | Select-Object FileName, Line

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — Select-String -Path "FinGuard\js\alerts.js" -Pattern "buildSidebar|initAlertsPage" | Select-Object Line
Select-String -Path "FinGuard\js\network.js" -Pattern "buildSidebar|initNetworkPage" | Select-Object Line
Select-String -Path "FinGuard\js\copilot.js" -Pattern "buildSidebar|initCopilotPage" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command

All sidebar paths are correct. Now let me verify the dashboard's `openAlert` function and its path from the root:

> 🔧 **execute_command** — Select-String -Path "FinGuard\js\app.js" -Pattern "function openAlert" | Select-Object Line
# Check that pages- level navigation uses fromPages=true
Select-String -Path "FinGuard\js\alerts.js" -Pattern "openAlert" | Select-Object Line
Select-String -Path "FinGuard\js\dashboard.js" -Pattern "openAlert" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command

Good. Now let me fix one potential issue — the `details.js` page uses `openAlert` from pages so the alert-details sidebar links (`pages/alerts.html`) inside `buildSidebar('../')` from pages already produces `../pages/alerts.html`. Let me verify the sidebar generates proper links from pages:

The sidebar builds: `basePath + 'pages/alerts.html'` = `'../' + 'pages/alerts.html'` = `'../pages/alerts.html'` — this would go up from `pages/` and back into `pages/` correctly. ✓

Let me also verify that the `details.js` alert-details page doesn't have any undefined function calls:

> 🔧 **execute_command** — # Check for any undefined function references across all JS files
$functions = @()
Get-Content "FinGuard\js\app.js","FinGuard\js\dashboard.js","FinGuard\js\alerts.js","FinGuard\js\details.js","FinGuard\js\network.js","FinGuard\js\copilot.js" | 
  Select-String "^function (\w+)" | ForEach-Object { $_.Matches[0].Groups[1].Value } | ForEach-Object { $functions += $_ }
Write-Host "Defined functions:"
$functions | Sort-Object | ForEach-Object { Write-Host "  $_" }

### 🤖 Assistant

> 🔧 called: execute_command

All functions are defined. Now let me check that the HTML files call only defined functions:

> 🔧 **execute_command** — # Check inline onclick calls in HTML files to ensure they reference defined functions
$htmlFiles = Get-ChildItem "FinGuard\*.html","FinGuard\pages\*.html"
$definedFunctions = @("showToast","buildSidebar","buildTopbar","openAlert","updateRiskBadge","statusBadge","getRiskClass",
  "formatINR","getQueryParam","getRiskLevel","showConfirm","handleAction","handleAddNote","useSuggestedQuestion",
  "sendDetailCopilotMessage","sendCopilotMessage","askSuggested","clearChat","exportAISummary","filterNetwork",
  "selectNetworkNode","changePage","applyFilters","setSort","filterInvestigations","generateReport","recordDecision",
  "clearAllDemoData","saveProfile","switchSection","toggleTheme")

foreach ($file in $htmlFiles) {
  $content = Get-Content $file.FullName -Raw
  $calls = [regex]::Matches($content, 'onclick="([^("]+)\(') | ForEach-Object { $_.Groups[1].Value }
  $unique = $calls | Sort-Object -Unique
  foreach ($call in $unique) {
    if ($call -notin $definedFunctions) {
      Write-Host "UNDEFINED: $call in $($file.Name)"
    }
  }
}
Write-Host "Function check complete."

### 🤖 Assistant

> 🔧 called: execute_command

Those are all valid — `document.getElementById`, `document.getElementById`, and `window.print` are all built-in browser APIs, not custom functions. The check is clean.

Now let me do a final check on the sidebar navigation from pages — specifically ensuring the `../` prefix links to the correct files:

> 🔧 **execute_command** — # Verify the investigation page inline script has the correct header
Select-String -Path "FinGuard\pages\investigations.html" -Pattern "buildSidebar|DOMContentLoaded" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — # Verify reports page also has correct imports
Select-String -Path "FinGuard\pages\reports.html" -Pattern "src=|href=" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — # Verify analytics and settings imports
Select-String -Path "FinGuard\pages\analytics.html" -Pattern "src=|href=" | Select-Object Line
Write-Host "---"
Select-String -Path "FinGuard\pages\settings.html" -Pattern "src=|href=" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command

All paths are correct. Let me do one final check to make sure the details page renders correctly with the A001 data by verifying the `ALERTS_DATA` object includes correct fields used in templates:

> 🔧 **execute_command** — Select-String -Path "FinGuard\js\details.js" -Pattern "ALERTS_DATA\[|function render|function init" | Select-Object Line

### 🤖 Assistant

> 🔧 called: execute_command



> 🔧 **execute_command** — # Verify A001's device field is set (used in renderCaseHeader)
Select-String -Path "FinGuard\js\details.js" -Pattern "device:|device:" | Select-Object -First 5 Line

### 🤖 Assistant

> 🔧 called: execute_command

Everything looks solid. Let me verify the complete folder structure one more time:

> 🔧 **execute_command** — Get-ChildItem -Path "FinGuard" -Recurse | Select-Object @{N='Path';E={$_.FullName -replace [regex]::Escape((Get-Location).Path + "\FinGuard\"), ""}} | Sort-Object Path | Format-Table -AutoSize

### 🤖 Assistant

> 🔧 called: execute_command

The project structure matches the specification exactly. Let me now do a quick final review of the key A001 story to ensure the demo case is complete and coherent:

> 🔧 **execute_command** — # Verify A001 total exposure is correctly calculated in the suspicious transactions section
Select-String -Path "FinGuard\js\details.js" -Pattern "Total Exposure|₹1,72|172000|42000|55000|75000" | Select-Object Line

### 🤖 Assistant

The total `42000 + 55000 + 75000 = 172000 = ₹1,72,000` is correct and the JavaScript `renderSuspiciousTransactions` computes it dynamically with `txList.reduce((s, tx) => s + tx.amount, 0)`.

The FinGuard project is complete. Here's a summary of everything built:

---

## ✅ FinGuard — Build Complete

**20 files created** in the exact structure specified:

### Project Structure
```
FinGuard/
├── index.html                    ← Dashboard (entry point)
├── assets/logo.svg               ← Shield + checkmark SVG logo
├── css/
│   ├── style.css                 ← Global: variables, sidebar, topbar, buttons, cards, badges, toast
│   ├── dashboard.css             ← Stat cards, bar charts, donut, activity feed
│   ├── alerts.css                ← Alert table, filters, pagination, quick stats
│   └── details.css               ← Risk factors, suspicious txns, copilot panel, audit trail
├── js/
│   ├── app.js                    ← Sidebar builder, topbar builder, toast, confirm, risk utils
│   ├── dashboard.js              ← Stat cards, trend chart, donut, workload, activity
│   ├── alerts.js                 ← 20 synthetic alerts, search/filter/sort/pagination
│   ├── details.js                ← A001 case data, risk factors, audit trail, AI copilot
│   ├── network.js                ← SVG network graph, node selection, filtering
│   └── copilot.js                ← Full-page AI chat, predefined demo responses
└── pages/
    ├── alerts.html               ← Alert table with 20 rows
    ├── alert-details.html        ← A001 investigation screen
    ├── network.html              ← SVG account network visualization
    ├── investigations.html       ← 15 case table with inline JS
    ├── copilot.html              ← Full AI Copilot chat interface
    ├── reports.html              ← Investigation brief generator
    ├── analytics.html            ← 6 charts + 6 KPI metric cards
    └── settings.html             ← Profile, notifications, risk thresholds, demo mode
```

### Key Features
- **Alert A001 demo case** — 3 transactions in 3 minutes (₹42K→₹55K→₹75K) from Mumbai on a new iPhone; risk score 94/100 CRITICAL; full risk factor breakdown (6 factors weighted to 94/100)
- **Dark enterprise UI** — navy/charcoal background, cool blue accent, semantic risk colors (green/amber/orange/red)
- **Investigation workflow** — alert → risk factors → account history comparison → network → AI Copilot → decision → audit trail
- **AI Copilot** — 7 predefined responses with clear "Demo mode" labelling; ready for LLM API integration
- **Audit trail** — persisted in `localStorage`, updated on every investigator action
- **No frameworks** — pure HTML/CSS/vanilla JS; open `index.html` directly in browser