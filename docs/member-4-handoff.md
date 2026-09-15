# Member 4 Handoff — AI Copilot

This document describes exactly what Member 4 needs to implement and the data contract the frontend expects.

---

## 1. Copilot Service — `src/backend/ai/copilot.js`

### What to Replace

The file currently contains a stub `CopilotService` class with two methods that return keyword-matched placeholder text. Replace both method bodies with real watsonx.ai or IBM Granite model calls.

### Class and Method Signatures (DO NOT CHANGE)

```js
class CopilotService {
  chat(caseContext, message)
  generateInvestigationBrief(caseContext)
}
```

### `caseContext` Shape

This object is built by the frontend from the alert detail API response and sent with every request:

```js
{
  alertId:       string,   // e.g. "ALT-10482"
  riskLevel:     string,   // "CRITICAL" | "HIGH" | "MEDIUM" | "LOW"
  riskScore:     number,   // 0–100
  accountId:     string,   // e.g. "A001"
  customerName:  string,   // e.g. "Vikram Mehta"
  transactionId: string,   // e.g. "TXN10482"
  amount:        number,   // e.g. 75000
  factors: [
    { name: string, score: number, maxScore: number, explanation: string }
  ]
}
```

### `chat` — Required Return Shape

```js
{
  response: string,        // The AI response text (markdown supported)
  isPlaceholder: boolean,  // Set to false when this is real AI
}
```

### `generateInvestigationBrief` — Required Return Shape

```js
{
  brief: string,           // Full investigation brief text (plain text or markdown)
  isPlaceholder: boolean,  // Set to false when this is real AI
}
```

### API Routes (DO NOT CHANGE)

The routes in `src/backend/routes/copilot.js` call the service and return these responses directly. The frontend receives them from:

- `POST /api/copilot/chat` — body: `{ caseContext, message }`
- `POST /api/copilot/brief` — body: `{ caseContext }`

---

## 2. Integration Approach (Recommended)

```js
// src/backend/ai/copilot.js

const { WatsonXAI } = require('@ibm-cloud/watsonx-ai');

class CopilotService {
  constructor() {
    // TODO MEMBER 4 — Initialize watsonx.ai client
    this.client = WatsonXAI.newInstance({ version: '2024-05-31' });
    this.modelId = 'ibm/granite-13b-instruct-v2';
    this.projectId = process.env.WATSONX_PROJECT_ID;
  }

  async chat(caseContext, message) {
    // TODO MEMBER 4 — Build system prompt from caseContext, call model
    const systemPrompt = buildSystemPrompt(caseContext);
    const response = await this.client.generateText({ ... });
    return { response: response.result.results[0].generated_text, isPlaceholder: false };
  }

  async generateInvestigationBrief(caseContext) {
    // TODO MEMBER 4 — Call model with brief-generation prompt
    const brief = await this.client.generateText({ ... });
    return { brief: brief.result.results[0].generated_text, isPlaceholder: false };
  }
}
```

Add `WATSONX_API_KEY`, `WATSONX_PROJECT_ID`, and `WATSONX_URL` to `src/.env.example` when ready.

---

## 3. Frontend Display

The frontend (`src/frontend/js/alert-details.js`) displays:
- A `⚠️ PLACEHOLDER` badge in the copilot header (remove this when you replace the stub)
- The `response` field from `chat()` is rendered in a chat bubble
- The `brief` field from `generateInvestigationBrief()` is stored in `sessionStorage` and displayed on the Reports page as `<pre>` formatted text
- The Reports page also prints the brief — keep the format clean for print/PDF output

---

## 4. Suggested Questions

The frontend pre-populates 6 suggested questions. Your model should handle all of them well:

1. "Why is this alert critical?"
2. "What is unusual about this transaction?"
3. "Explain the account network"
4. "Show the key risk factors"
5. "What evidence should I review next?"
6. "Summarize this case"

---

## 5. Tests to Update

After replacing the stub, update `src/tests/api.test.js`:
- `chat returns a response string` — should still pass, verify `isPlaceholder` is now `false`
- `generateInvestigationBrief returns a brief string` — verify brief contains real content
