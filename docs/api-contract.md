# FinGuard API Contract

All API responses use `Content-Type: application/json`. Error responses use the format `{ "error": "message" }`.

Base URL: `http://localhost:3000`

---

## GET /api/health

Returns application health status.

**Response 200:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "app": "FinGuard",
  "version": "1.0.0",
  "mode": "json",
  "environment": "development"
}
```

---

## GET /api/alerts/stats

Returns KPI counts for the dashboard. **Must be called before /api/alerts/:id in Express routing.**

**Response 200:**
```json
{
  "totalAlerts": 240,
  "criticalAlerts": 24,
  "highRiskAlerts": 48,
  "pendingInvestigations": 30,
  "byRiskLevel": {
    "CRITICAL": 24,
    "HIGH": 48,
    "MEDIUM": 96,
    "LOW": 72
  },
  "hourlyTrend": [
    { "label": "00:00", "count": 2 },
    ...
  ]
}
```

---

## GET /api/alerts

Returns paginated, filtered list of alerts.

**Query Parameters:**

| Parameter | Type | Description |
|---|---|---|
| `page` | integer | Page number (default: 1) |
| `limit` | integer | Results per page (default: 20, max: 100) |
| `search` | string | Search alert ID, customer name, or account ID |
| `riskLevel` | string | Filter: CRITICAL \| HIGH \| MEDIUM \| LOW |
| `status` | string | Filter: OPEN \| ESCALATED \| MONITORED \| DISMISSED |
| `location` | string | Partial match on transaction location |

**Response 200:**
```json
{
  "data": [
    {
      "id": "ALT-10482",
      "transaction_id": "TXN10482",
      "account_id": "A001",
      "risk_score": 94,
      "risk_level": "CRITICAL",
      "status": "OPEN",
      "customer_name": "Vikram Mehta",
      "location": "Mumbai",
      "amount": 75000,
      "created_at": "2024-01-01T02:17:00.000Z",
      "updated_at": "2024-01-01T02:17:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 240,
    "pages": 12
  }
}
```

**Error 400:** Invalid riskLevel or status value.

---

## GET /api/alerts/:id

Returns full alert detail for the investigator workspace.

**Response 200:**
```json
{
  "alert": { "id": "ALT-10482", "risk_level": "CRITICAL", "risk_score": 94, ... },
  "transaction": { "id": "TXN10482", "amount": 75000, "location": "Mumbai", "device": "iPhone 14 Pro (unrecognized)", ... },
  "account": { "id": "A001", "customer_name": "Vikram Mehta", "avg_txn_amount": 3200, "max_txn_amount": 9800, "usual_city": "Ahmedabad", ... },
  "riskFactors": [
    { "alert_id": "ALT-10482", "factor_name": "Amount Anomaly", "score": 20, "max_score": 20, "explanation": "..." }
  ],
  "riskAssessment": {
    "totalScore": 94,
    "maxScore": 100,
    "riskLevel": "CRITICAL",
    "factors": [
      { "name": "Amount Anomaly", "score": 20, "maxScore": 20, "explanation": "..." }
    ]
  },
  "recentTransactions": [ ... ],
  "precedingSequence": [ ... ],
  "investigation": { "id": "INV-ALT-10482", "status": "OPEN", "notes": "", ... },
  "network": {
    "nodes": [ { "id": "A023", "label": "A023\nFarhan Qureshi", "riskLevel": "CRITICAL", "color": { "background": "#3D1515", "border": "#EF4444" } } ],
    "edges": [ { "from": "A001", "to": "A023", "label": "₹42K / ₹75K", "arrows": "to" } ]
  }
}
```

**Error 404:** Alert not found.

---

## GET /api/accounts/:id

Returns account detail with network graph.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `depth` | integer | Network hop depth (1–3, default: 1) |

**Response 200:**
```json
{
  "id": "A023",
  "customer_name": "Farhan Qureshi",
  "usual_city": "Mumbai",
  "usual_device": "Redmi Note 12",
  "avg_txn_amount": 18000,
  "max_txn_amount": 95000,
  "balance": 42000,
  "risk_level": "CRITICAL",
  "network": { "nodes": [...], "edges": [...] }
}
```

---

## GET /api/accounts/:id/transactions

Returns paginated transaction history for an account.

**Query Parameters:** `page`, `limit` (same as alerts)

**Response 200:**
```json
{
  "data": [ { "id": "TXN10482", "sender_id": "A001", "receiver_id": "A023", "amount": 75000, ... } ],
  "pagination": { "page": 1, "limit": 20, "total": 45, "pages": 3 }
}
```

---

## GET /api/investigations

Returns list of investigations.

**Query Parameters:**
| Parameter | Type | Description |
|---|---|---|
| `status` | string | Filter: OPEN \| ESCALATED \| MONITORED \| DISMISSED |

**Response 200:**
```json
{
  "data": [
    { "id": "INV-ALT-10482", "alert_id": "ALT-10482", "status": "ESCALATED", "risk_level": "CRITICAL", "notes": "...", "updated_at": "..." }
  ]
}
```

---

## POST /api/investigations/:id/escalate

**Request Body:** `{ "notes": "Optional investigator notes" }`

**Response 200:**
```json
{ "success": true, "investigation": { "id": "...", "status": "ESCALATED", "notes": "..." } }
```

---

## POST /api/investigations/:id/monitor

Same shape as escalate. Sets status to `MONITORED`.

---

## POST /api/investigations/:id/dismiss

Same shape as escalate. Sets status to `DISMISSED`.

---

## POST /api/copilot/chat

**Request Body:**
```json
{
  "caseContext": { "alertId": "ALT-10482", "riskLevel": "CRITICAL", "riskScore": 94, ... },
  "message": "Why is this alert critical?"
}
```

**Response 200:**
```json
{
  "response": "Alert ALT-10482 is rated CRITICAL (94/100) because...",
  "isPlaceholder": true
}
```

**Error 400:** `message` field missing.

---

## POST /api/copilot/brief

**Request Body:**
```json
{
  "caseContext": { "alertId": "ALT-10482", ... }
}
```

**Response 200:**
```json
{
  "brief": "FINGUARD INVESTIGATION BRIEF\n━━━...",
  "isPlaceholder": true
}
```
