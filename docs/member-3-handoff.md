# Member 3 Handoff — Risk Engine & Network Graph

This document describes exactly what Member 3 needs to implement and what data contracts the frontend and backend API expect.

---

## 1. Risk Engine — `src/backend/risk-engine/scoring.js`

### What to Replace

The file currently contains a stub that:
- Returns hardcoded 94/CRITICAL for `ALT-10482`
- Returns pre-generated synthetic scores for all other alerts

Replace the body of `calculateRiskScore` with your real ML model inference.

### Function Signature (DO NOT CHANGE)

```js
function calculateRiskScore(alert, transaction, account)
```

| Parameter | Shape |
|---|---|
| `alert` | `{ id, risk_level, risk_score, account_id, transaction_id, ... }` |
| `transaction` | `{ id, sender_id, receiver_id, amount, currency, timestamp, location, device, ... }` |
| `account` | `{ id, customer_name, usual_city, usual_device, avg_txn_amount, max_txn_amount, balance, ... }` |

### Required Return Shape (DO NOT CHANGE — frontend depends on this)

```js
{
  totalScore: number,        // 0–100 integer
  maxScore: 100,
  riskLevel: string,         // "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  factors: [
    {
      name: string,          // Display name e.g. "Amount Anomaly"
      score: number,         // Actual score for this factor
      maxScore: number,      // Maximum possible score for this factor
      explanation: string,   // Plain-language explanation for the investigator
    }
  ]
}
```

### Expected Factors

The frontend renders exactly 6 factors in this order:

| Factor Name | Max Score |
|---|---|
| Amount Anomaly | 20 |
| Location Anomaly | 18 |
| Device Anomaly | 15 |
| Time Anomaly | 12 |
| Velocity Anomaly | 20 |
| Network Anomaly | 15 |

Total max = 100.

### Where It Is Called

`src/backend/routes/alerts.js`, line containing:
```js
const riskResult = calculateRiskScore(detail.alert, detail.transaction, detail.account);
```

The result is attached as `detail.riskAssessment` in the `GET /api/alerts/:id` response.

### Benchmark Branch

Keep the benchmark branch for `ALT-10482` until your model is validated:
```js
if (alert && alert.id === 'ALT-10482') { return { totalScore: 94, ... }; }
```
Remove it once your model returns the same values.

---

## 2. Network Graph Builder — `src/backend/network/graphBuilder.js`

### What to Replace

The file currently contains a stub that:
- Returns the hardcoded benchmark graph for `A023` / `A001`
- Returns a single-node placeholder for all other accounts

Replace the body of `buildAccountNetwork` with real database-driven graph traversal.

### Function Signature (DO NOT CHANGE)

```js
function buildAccountNetwork(accountId, depth = 1)
```

| Parameter | Description |
|---|---|
| `accountId` | The account to center the graph on |
| `depth` | Number of hops to traverse (1, 2, or 3) |

### Required Return Shape (DO NOT CHANGE — vis-network depends on this)

```js
{
  nodes: [
    {
      id: string,          // Account ID e.g. "A023"
      label: string,       // Multi-line label e.g. "A023\nFarhan Qureshi"
      title: string,       // Tooltip text
      color: {
        background: string,  // hex
        border: string,      // hex
      },
      riskLevel: string,   // "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "UNKNOWN"
      accountId: string,   // Same as id
    }
  ],
  edges: [
    {
      from: string,        // Source account ID
      to: string,          // Target account ID
      label: string,       // Edge label e.g. "₹42K / ₹75K"
      color: { color: string },
      arrows: "to",
    }
  ]
}
```

### Risk Level Colors

```js
const RISK_COLORS = {
  CRITICAL: { background: '#3D1515', border: '#EF4444' },
  HIGH:     { background: '#3D2A0A', border: '#F97316' },
  MEDIUM:   { background: '#3D330A', border: '#EAB308' },
  LOW:      { background: '#0A3D1A', border: '#22C55E' },
  UNKNOWN:  { background: '#1B2638', border: '#263244' },
};
```

### Where It Is Called

- `src/backend/routes/alerts.js` — attached as `detail.network` in `GET /api/alerts/:id`
- `src/backend/routes/accounts.js` — attached as `account.network` in `GET /api/accounts/:id`

### Data Source

Read transactions from the JSON store or PostgreSQL to build real adjacency. Use the `transactions` table/file: filter where `sender_id = accountId` or `receiver_id = accountId`, then recurse up to `depth` hops.

---

## 3. Tests to Update

After replacing the stubs, the following tests in `src/tests/api.test.js` should still pass (may need value updates):
- `benchmark A023 returns correct nodes` — verify node IDs match your traversal
- `returns 94/CRITICAL for benchmark alert` — verify until you remove the benchmark branch
