/**
 * FinGuard AI Copilot Service — Developer Stub
 *
 * ╔══════════════════════════════════════════════════════════════════════╗
 * ║  TODO MEMBER 4 — Replace this entire module with real AI inference. ║
 * ║  See docs/member-4-handoff.md for the full integration contract.    ║
 * ╚══════════════════════════════════════════════════════════════════════╝
 *
 * caseContext shape:
 * {
 *   alertId:       string,   // e.g. "ALT-10482"
 *   riskLevel:     string,   // CRITICAL | HIGH | MEDIUM | LOW
 *   riskScore:     number,   // 0–100
 *   accountId:     string,   // e.g. "A001"
 *   customerName:  string,
 *   transactionId: string,
 *   amount:        number,
 *   factors:       Array<{ name, score, maxScore, explanation }>
 * }
 */

class CopilotService {
  /**
   * chat — responds to an investigator's question about the current case.
   *
   * TODO MEMBER 4 — Replace the body of this method with a call to
   * watsonx.ai or your chosen LLM. Pass the caseContext as a system prompt
   * and the message as the user turn.
   *
   * @param {object} caseContext
   * @param {string} message
   * @returns {{ response: string, isPlaceholder: true }}
   */
  chat(caseContext, message) {
    // TODO MEMBER 4 — Replace with real LLM call
    const ctx = caseContext || {};
    const alertId   = ctx.alertId   || 'unknown';
    const riskLevel = ctx.riskLevel || 'unknown';
    const riskScore = ctx.riskScore || 0;
    const customer  = ctx.customerName || ctx.accountId || 'unknown';
    const amount    = ctx.amount ? `₹${Number(ctx.amount).toLocaleString('en-IN')}` : 'unknown';

    const q = (message || '').toLowerCase();

    let response;

    if (q.includes('critical') || q.includes('why')) {
      response = `Alert ${alertId} is rated ${riskLevel} (${riskScore}/100) because the transaction combines multiple extreme anomalies: the amount (${amount}) is far above ${customer}'s historical maximum, it was sent from an unrecognized device in an unusual city at 02:17 AM, and three transfers to flagged accounts occurred within 2 minutes.`;
    } else if (q.includes('unusual') || q.includes('transaction')) {
      response = `The transaction linked to ${alertId} shows three simultaneous anomalies: location (Mumbai vs usual Ahmedabad), device (unrecognized iPhone vs usual Samsung), and time (02:17 AM). Any one of these alone would score MEDIUM. All three together push it to ${riskLevel}.`;
    } else if (q.includes('network') || q.includes('account')) {
      response = `The receiving account A023 is a known high-risk pass-through hub. Funds from this alert were observed flowing A001 → A023 → A051 and A023 → A072 within minutes. This layering pattern is consistent with AML typology Stage 2 (Layering).`;
    } else if (q.includes('risk factor') || q.includes('key')) {
      const topFactor = (ctx.factors || [])[0];
      const factorNote = topFactor ? `Top factor: ${topFactor.name} scored ${topFactor.score}/${topFactor.maxScore}.` : '';
      response = `The six risk factors for ${alertId} total ${riskScore}/100. Amount and Velocity anomalies each score maximum points. ${factorNote}`;
    } else if (q.includes('evidence') || q.includes('review')) {
      response = `Recommended evidence for ${alertId}: (1) Review the 3-transaction burst sequence at 02:15–02:17. (2) Pull KYC documents for A023. (3) Check if ${customer} filed any travel notices. (4) Request device fingerprint logs for the iPhone 14 Pro. (5) Review A051 and A072 for offsetting withdrawals.`;
    } else if (q.includes('summar') || q.includes('brief')) {
      response = `Case Summary — ${alertId}: Customer ${customer} (${ctx.accountId || ''}) sent ₹172,000 across 3 rapid transfers to flagged accounts A023 and A051 at 02:15–02:17 AM from an unrecognized device in Mumbai. Risk score: ${riskScore}/100 (${riskLevel}). Account A023 is a known pass-through node. Pattern is consistent with AML layering. Recommend escalation for SAR filing.`;
    } else {
      response = `Based on case ${alertId} (${riskLevel}, ${riskScore}/100), the transaction context and risk profile suggest this warrants immediate investigator attention. Please review the Risk Assessment and Transaction Sequence sections for detailed evidence.`;
    }

    return { response, isPlaceholder: true };
  }

  /**
   * generateInvestigationBrief — produces a structured investigation report.
   *
   * TODO MEMBER 4 — Replace with a real LLM call that generates a
   * professional SAR-style investigation brief using the full case context.
   *
   * @param {object} caseContext
   * @returns {{ brief: string, isPlaceholder: true }}
   */
  generateInvestigationBrief(caseContext) {
    // TODO MEMBER 4 — Replace with real report generation
    const ctx = caseContext || {};
    const alertId   = ctx.alertId   || 'N/A';
    const riskLevel = ctx.riskLevel || 'N/A';
    const riskScore = ctx.riskScore || 0;
    const customer  = ctx.customerName || ctx.accountId || 'N/A';
    const accountId = ctx.accountId   || 'N/A';
    const txnId     = ctx.transactionId || 'N/A';
    const amount    = ctx.amount ? `₹${Number(ctx.amount).toLocaleString('en-IN')}` : 'N/A';
    const now       = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const brief = `FINGUARD INVESTIGATION BRIEF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CASE REFERENCE:     ${alertId}
TRANSACTION:        ${txnId}
GENERATED:          ${now} IST
CLASSIFICATION:     ${riskLevel} RISK (${riskScore}/100)
STATUS:             PENDING INVESTIGATOR DECISION

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. SUBJECT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Account ID:         ${accountId}
Customer Name:      ${customer}
Transaction Amount: ${amount}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
2. ANOMALY SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${(ctx.factors || []).map(f =>
  `  ${f.name.padEnd(22)} ${String(f.score).padStart(2)}/${f.maxScore}  ${f.explanation}`
).join('\n') || '  [PLACEHOLDER — risk factors not available]'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
3. NETWORK OBSERVATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[PLACEHOLDER] Recipient account A023 identified as high-risk pass-through.
Funds observed flowing to A051 and A072 within minutes of receipt.
Pattern consistent with AML Stage 2 — Layering.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
4. RECOMMENDED ACTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[PLACEHOLDER] Based on risk score of ${riskScore}/100 and ${riskLevel} classification:
  • Escalate to Senior Compliance Officer
  • File Suspicious Activity Report (SAR) within 30 days
  • Freeze outgoing transactions pending investigation
  • Request KYC re-verification for accounts A001, A023, A051, A072

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

    return { brief, isPlaceholder: true };
  }
}

module.exports = { CopilotService };
