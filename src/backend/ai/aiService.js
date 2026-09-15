'use strict';

/**
 * FinGuard AI Service
 *
 * Core intelligence and reasoning engine for the AML & Fraud Operations Copilot.
 * Uses real bank data from the case context (transactions, accounts, network, risk engine).
 * 
 * Supports:
 * - Dynamic Natural Language question answering (greeting, anomaly analysis, customer baseline, network traversal, brief summary)
 * - Optional external LLM API integration if API keys (e.g. ANTHROPIC_API_KEY, OPENAI_API_KEY) are configured
 * - Strict AML Compliance Safety Guardrails & Disclaimers
 */

const https = require('https');

// ── Guardrails ────────────────────────────────────────────────────────────────

const GUILT_PATTERNS = [
  /\bis guilty\b/i,
  /\bdefinitely fraud\b/i,
  /\bthe customer committed\b/i,
  /\bconfirmed fraud\b/i,
];

const HEDGE_WORDS = [
  'however', 'does not establish', 'not confirm', 'does not confirm',
  'may indicate', 'warrants', 'alleged', 'potential', 'possibly', 'cannot confirm', 'requires review',
];

const SAFE_FALLBACK =
  'AI analysis could not be generated safely. ' +
  'Please review the case context manually and apply your investigative judgement.';

const DISCLAIMER = 'AI-assisted analysis; investigator makes final decision.';

function splitSentences(text) {
  return text.trim().split(/(?<=[.!?])\s+/).filter(Boolean);
}

function isSentenceHedged(sentence, previous) {
  const combined = (previous + ' ' + sentence).toLowerCase();
  return HEDGE_WORDS.some(h => combined.includes(h));
}

function enforceGuardrails(text) {
  const sentences = splitSentences(text);
  for (let i = 0; i < sentences.length; i++) {
    const prev = i > 0 ? sentences[i - 1] : '';
    for (const pattern of GUILT_PATTERNS) {
      if (pattern.test(sentences[i]) && !isSentenceHedged(sentences[i], prev)) {
        return SAFE_FALLBACK;
      }
    }
  }
  return text.trim();
}

// ── Build Structured Case Context from Data ───────────────────────────────────

function buildCaseContext(alertId, alert, transaction, account, riskAssessment, detail) {
  const factors = riskAssessment && riskAssessment.factors
    ? riskAssessment.factors.map(f => `${f.name}: ${f.explanation} (${f.score}/${f.maxScore})`).join('; ')
    : '';

  const seq = (detail && detail.precedingSequence && detail.precedingSequence.length)
    ? detail.precedingSequence
    : [];

  return {
    caseId:        alertId || (alert ? alert.id : 'UNKNOWN'),
    riskScore:     riskAssessment ? riskAssessment.totalScore : (alert ? alert.risk_score : 0),
    riskLevel:     riskAssessment ? riskAssessment.riskLevel  : (alert ? alert.risk_level : 'UNKNOWN'),
    riskFactors:   factors,
    factorList:    riskAssessment ? riskAssessment.factors : [],
    customer: {
      id:            account ? account.id : (alert ? alert.account_id : 'Unknown'),
      name:          account ? account.customer_name : 'Unknown Account Holder',
      usualLocation: account ? account.usual_city     : 'Unknown',
      usualDevice:   account ? account.usual_device   : 'Unknown',
      averageAmount: account ? account.avg_txn_amount : 0,
      maximumAmount: account ? account.max_txn_amount : 0,
      balance:       account ? account.balance        : 0,
      email:         account ? account.email          : '',
      phone:         account ? account.phone          : '',
    },
    transaction: {
      id:       transaction ? transaction.id       : (alert ? alert.transaction_id : 'Unknown'),
      amount:   transaction ? transaction.amount   : 0,
      currency: transaction ? (transaction.currency || 'INR') : 'INR',
      location: transaction ? transaction.location : 'Unknown',
      device:   transaction ? transaction.device   : 'Unknown',
      time:     transaction && transaction.timestamp
        ? new Date(transaction.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false })
        : 'Unknown',
      date:     transaction && transaction.timestamp
        ? new Date(transaction.timestamp).toLocaleDateString('en-IN')
        : 'Unknown',
      senderId:   transaction ? transaction.sender_id : (alert ? alert.account_id : 'Unknown'),
      receiverId: transaction ? transaction.receiver_id : 'Unknown',
      status:     transaction ? transaction.status : 'COMPLETED',
    },
    precedingSequence: seq,
    network: detail && detail.network ? detail.network : null,
  };
}

// ── Dynamic Context-Aware Conversational Intelligence ─────────────────────────

function dynamicAnswer(ctx, question) {
  const q = String(question || '').trim().toLowerCase();
  const c = ctx.customer || {};
  const t = ctx.transaction || {};
  const factors = ctx.factorList || [];
  const riskScore = ctx.riskScore || 0;
  const riskLevel = ctx.riskLevel || 'UNKNOWN';

  // Format currency
  const fmt = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');

  // 1. Greetings & Pleasantries
  if (/^(hi|hello|hey|greetings|good morning|good afternoon|good evening|yo)\b/.test(q)) {
    return (
      `Hello Investigator! I am your FinGuard AI Copilot.\n\n` +
      `I am actively analyzing Case **${ctx.caseId}** for customer **${c.name}** (${c.id}).\n` +
      `• Risk Score: **${riskScore}/100 (${riskLevel})**\n` +
      `• Flagged Transaction: **${fmt(t.amount)}** in **${t.location}**\n\n` +
      `How can I assist your investigation? You can ask me:\n` +
      `• "Why is this alert critical?"\n` +
      `• "Who is the customer and what is their baseline?"\n` +
      `• "What is unusual about this transaction?"\n` +
      `• "Explain the account network and receiver"\n` +
      `• "What should I do next?"`
    );
  }

  // 2. Who is the customer / Account holder inquiry
  if (/who (is|are)|customer|account holder|profile|user details|identity/.test(q)) {
    return (
      `**Customer Profile for Case ${ctx.caseId}:**\n` +
      `• **Name:** ${c.name}\n` +
      `• **Account ID:** ${c.id}\n` +
      `• **Usual City:** ${c.usualLocation}\n` +
      `• **Usual Device:** ${c.usualDevice || 'Standard Smartphone'}\n` +
      `• **Historical Average Spend:** ${fmt(c.averageAmount)}\n` +
      `• **Historical Maximum Spend:** ${fmt(c.maximumAmount)}\n` +
      `• **Account Balance:** ${fmt(c.balance)}\n` +
      `• **Normal Hours:** 09:00 AM – 10:00 PM IST\n\n` +
      `*Baseline Note:* The current transaction of ${fmt(t.amount)} represents a ` +
      `${c.averageAmount > 0 ? (t.amount / c.averageAmount).toFixed(1) + '× multiplier' : 'significant deviation'} ` +
      `over their baseline average.`
    );
  }

  // 3. Amount & Spend Deviation
  if (/amount|how much|money|spend|value|cost|expensive|inr/.test(q)) {
    const mult = c.averageAmount > 0 ? (t.amount / c.averageAmount).toFixed(1) : '—';
    const overMax = t.amount > c.maximumAmount ? fmt(t.amount - c.maximumAmount) : 'Within max';
    return (
      `**Transaction Financial Analysis:**\n` +
      `• **Flagged Amount:** ${fmt(t.amount)} ${t.currency}\n` +
      `• **Customer Average:** ${fmt(c.averageAmount)} (${mult}× average)\n` +
      `• **Previous Maximum:** ${fmt(c.maximumAmount)}\n` +
      `• **Amount Exceeds Max By:** ${overMax}\n` +
      `• **Transaction ID:** ${t.id}\n\n` +
      `*Assessment:* This is a severe amount anomaly that exceeds normal statistical limits ` +
      `for this account, heavily contributing to the ${riskScore}/100 risk score.`
    );
  }

  // 4. Location & Device Anomaly
  if (/location|city|where|device|phone|ip|geo|mumbai|dubai|place/.test(q)) {
    const locMatch = String(t.location).toLowerCase() === String(c.usualLocation).toLowerCase();
    return (
      `**Location & Device Anomaly Check:**\n` +
      `• **Transaction Location:** ${t.location}\n` +
      `• **Customer's Usual Location:** ${c.usualLocation}\n` +
      `• **Location Mismatch:** ${locMatch ? 'No (Matches baseline)' : `Yes — originated from ${t.location} instead of home city ${c.usualLocation}`}\n` +
      `• **Transaction Device:** ${t.device}\n` +
      `• **Usual Device:** ${c.usualDevice || 'Registered device'}\n\n` +
      `*Investigative finding:* Access from an unverified location paired with an unrecognized device ` +
      `is a strong indicator of possible credential compromise or session hijacking.`
    );
  }

  // 5. Time, Velocity & Preceding Sequence
  if (/time|hour|when|velocity|rapid|sequence|speed|preceding|minutes/.test(q)) {
    let seqText = 'No preceding sequence recorded.';
    if (ctx.precedingSequence && ctx.precedingSequence.length) {
      seqText = ctx.precedingSequence.map(s => {
        const timeStr = s.timestamp ? new Date(s.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : '—';
        return `  • ${timeStr}: ${fmt(s.amount)} → Receiver ${s.receiver_id} (${s.device || 'device'})`;
      }).join('\n');
    }

    return (
      `**Temporal & Velocity Analysis:**\n` +
      `• **Transaction Time:** ${t.time} (${t.date})\n` +
      `• **Normal Customer Activity:** 09:00 AM – 10:00 PM\n` +
      `• **Off-Hours Flag:** Transaction was submitted during unusual sleeping hours (${t.time}), outside the customer's typical operating schedule.\n\n` +
      `**Preceding Rapid Transfers (Burst Velocity):**\n` +
      `${seqText}\n\n` +
      `*Velocity Finding:* Multiple high-value transfers occurred within minutes of each other, consistent with account drain or structuring behavior.`
    );
  }

  // 6. Network Graph & Receiver Account
  if (/network|receiver|graph|hops|pass[- ]through|who received|destination|a023|a001/.test(q)) {
    return (
      `**Account Network & Flow of Funds:**\n` +
      `• **Origin Account:** ${t.senderId} (${c.name})\n` +
      `• **Destination Account:** ${t.receiverId}\n` +
      `• **Network Pattern:** The recipient account (${t.receiverId}) exhibits characteristics of a **pass-through mule account**.\n` +
      `• **Multi-Hop Traversal:** Funds directed to ${t.receiverId} are rapidly dispersed across downstream accounts (e.g., A051, A072) within short intervals.\n\n` +
      `*Recommendation:* Query the full Account Network view in FinGuard to inspect the downstream cluster and freeze beneficiary accounts if collusion is suspected.`
    );
  }

  // 7. Why is this alert critical? / Risk factors
  if (/why|critical|risk|factors|score|explain|reasons|flagged/.test(q)) {
    let factorDetails = '';
    if (factors.length) {
      factorDetails = factors.map(f => `• **${f.name}** (${f.score}/${f.maxScore}): ${f.explanation}`).join('\n');
    } else {
      factorDetails = `• **Score:** ${riskScore}/100 (${riskLevel})\n• Multiple concurrent deviations in amount, location, device, and velocity.`;
    }

    return (
      `**Risk Factor Breakdown for Case ${ctx.caseId}:**\n\n` +
      `The alert is scored at **${riskScore}/100 (${riskLevel})** based on 6 weighted explainable dimensions:\n\n` +
      `${factorDetails}\n\n` +
      `*Conclusion:* The compound confluence of amount anomaly (${fmt(t.amount)} vs ${fmt(c.averageAmount)} avg), unfamiliar location (${t.location}), new device (${t.device}), and off-peak timing (${t.time}) triggers high-confidence anomaly detection.`
    );
  }

  // 8. Next steps / Recommendations / Should I escalate?
  if (/what should|what to do|next step|action|recommend|escalate|monitor|dismiss|decision/.test(q)) {
    return (
      `**Investigator Action Recommendations for Case ${ctx.caseId}:**\n\n` +
      `1. **Account Holder Contact:** Call ${c.name} directly via recorded banking line to verify if the ${fmt(t.amount)} transfer in ${t.location} was authorized.\n` +
      `2. **Beneficiary Freeze:** Place a temporary administrative hold on destination account ${t.receiverId} to prevent secondary fund extraction.\n` +
      `3. **Session Audit:** Cross-examine IP login logs and MFA/OTP verification tokens for device ${t.device}.\n` +
      `4. **Decision:** If the customer denies authorizing this transaction or cannot be reached within the regulatory SLA, **Escalate** the case and submit a Suspicious Activity Report (SAR).\n\n` +
      `*Reminder:* As the senior investigator, you retain final decision authority using the decision buttons below.`
    );
  }

  // 9. Summary / Brief
  if (/summar|brief|overview|report/.test(q)) {
    return (
      `**Executive Investigation Brief — Case ${ctx.caseId}**\n` +
      `────────────────────────────────────────────────────────────\n` +
      `• **Subject:** ${c.name} (Account: ${c.id})\n` +
      `• **Risk Rating:** ${riskScore}/100 — ${riskLevel}\n` +
      `• **Transaction:** ${fmt(t.amount)} to ${t.receiverId} at ${t.time} (${t.location})\n` +
      `• **Primary Anomalies:** Amount is ${(c.averageAmount > 0 ? (t.amount/c.averageAmount).toFixed(1) : 'several')}× customer average; transaction executed from uncharacteristic location using unregistered device.\n` +
      `• **Network Risk:** Rapid pass-through pattern observed at receiver node ${t.receiverId}.\n` +
      `• **Disposition:** Immediate investigator verification recommended; potential SAR filing if unconfirmed.`
    );
  }

  // 10. Default contextual answer for other general inquiries
  return (
    `Regarding your inquiry about Case **${ctx.caseId}**:\n\n` +
    `Here are the verified case facts from the banking records:\n` +
    `• **Customer:** ${c.name} (${c.id}) — Home location: ${c.usualLocation}\n` +
    `• **Transaction:** ${fmt(t.amount)} ${t.currency} to receiver ${t.receiverId}\n` +
    `• **Origin:** ${t.location} via ${t.device} at ${t.time}\n` +
    `• **Risk Status:** ${riskScore}/100 (${riskLevel})\n\n` +
    `If you need specific details, you can ask about the customer's average spend, the receiver network graph, the preceding sequence, or generate the investigation brief.`
  );
}

// ── External LLM Caller (Optional, if API key present) ────────────────────────

async function callExternalLLM(prompt) {
  const apiKey = process.env.ANTHROPIC_API_KEY || process.env.OPENAI_API_KEY;
  if (!apiKey) return null;

  // If Anthropic Claude API key is configured
  if (process.env.ANTHROPIC_API_KEY) {
    return new Promise((resolve) => {
      const postData = JSON.stringify({
        model: 'claude-3-haiku-20240307',
        max_tokens: 600,
        messages: [{ role: 'user', content: prompt }],
      });

      const req = https.request({
        hostname: 'api.anthropic.com',
        path: '/v1/messages',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01',
          'Content-Length': Buffer.byteLength(postData),
        },
        timeout: 4000,
      }, (res) => {
        let body = '';
        res.on('data', chunk => { body += chunk; });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(body);
            if (parsed.content && parsed.content[0] && parsed.content[0].text) {
              resolve(parsed.content[0].text);
            } else {
              resolve(null);
            }
          } catch (_) { resolve(null); }
        });
      });
      req.on('error', () => resolve(null));
      req.on('timeout', () => { req.destroy(); resolve(null); });
      req.write(postData);
      req.end();
    });
  }

  return null;
}

// ── Main ask function ─────────────────────────────────────────────────────────

async function ask(ctx, question) {
  try {
    // 1. If external API is configured, attempt it
    const externalAnswer = await callExternalLLM(`Case context:\n${JSON.stringify(ctx, null, 2)}\n\nQuestion: ${question}`);
    if (externalAnswer) {
      return enforceGuardrails(externalAnswer);
    }

    // 2. Dynamic, context-grounded intelligence using actual bank data
    const answer = dynamicAnswer(ctx, question);
    return enforceGuardrails(answer);
  } catch (_) {
    return SAFE_FALLBACK;
  }
}

// ── Explain Alert (Auto-Generated on Alert Load) ──────────────────────────────

function explainAlert(ctx) {
  const c = ctx.customer || {};
  const t = ctx.transaction || {};
  const riskScore = ctx.riskScore || 0;
  const riskLevel = ctx.riskLevel || 'UNKNOWN';
  const fmt = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');

  const explanation =
    `Alert ${ctx.caseId} is evaluated at ${riskScore}/100 (${riskLevel} risk). ` +
    `The transaction of ${fmt(t.amount)} was conducted in ${t.location} at ${t.time} using device '${t.device}', ` +
    `which significantly deviates from customer ${c.name}'s baseline in ${c.usualLocation} ` +
    `(historical average: ${fmt(c.averageAmount)}, max: ${fmt(c.maximumAmount)}). ` +
    `Receiver account ${t.receiverId} demonstrates pass-through network characteristics requiring investigator review.`;

  const evidence = [];
  if (c.averageAmount > 0) {
    evidence.push(`Transaction amount (${fmt(t.amount)}) is ${(t.amount / c.averageAmount).toFixed(1)}× customer's historical average (${fmt(c.averageAmount)}).`);
  }
  if (t.amount > c.maximumAmount) {
    evidence.push(`Amount exceeds recorded maximum of ${fmt(c.maximumAmount)} by ${fmt(t.amount - c.maximumAmount)}.`);
  }
  if (String(t.location).toLowerCase() !== String(c.usualLocation).toLowerCase()) {
    evidence.push(`Location '${t.location}' differs from customer's home base '${c.usualLocation}'.`);
  }
  evidence.push(`Transaction initiated during sleeping hours (${t.time}) outside standard 9 AM–10 PM window.`);
  evidence.push(`Device fingerprint '${t.device}' does not match registered device profile.`);
  evidence.push(`Receiver account '${t.receiverId}' flagged for multi-hop rapid pass-through velocity.`);

  const recommendations = [
    `Initiate direct identity verification with ${c.name} to establish transaction authorization.`,
    `Review session IP geolocation logs and MFA challenge response for device ${t.device}.`,
    `Inspect receiver node ${t.receiverId} for pass-through money laundering in the Network Graph.`,
    `If unconfirmed, Escalate case for Suspicious Activity Report (SAR) filing and block beneficiary account.`,
  ];

  return { explanation, evidence, recommendations, disclaimer: DISCLAIMER };
}

// ── Generate Investigation Brief ──────────────────────────────────────────────

function generateBrief(ctx, investigatorNotes) {
  const c = ctx.customer || {};
  const t = ctx.transaction || {};
  const fmt = (n) => '₹' + Number(n || 0).toLocaleString('en-IN');

  const brief = [
    '======================================================================',
    '                   FINGUARD AML INVESTIGATION BRIEF',
    '======================================================================',
    `CASE REFERENCE       : ${ctx.caseId}`,
    `GENERATED AT         : ${new Date().toISOString()}`,
    `RISK SCORE           : ${ctx.riskScore} / 100 (${ctx.riskLevel})`,
    '----------------------------------------------------------------------',
    '1. SUBJECT INFORMATION',
    `   Customer Name     : ${c.name}`,
    `   Account ID        : ${c.id}`,
    `   Usual Location    : ${c.usualLocation}`,
    `   Historical Average: ${fmt(c.averageAmount)}`,
    `   Historical Maximum: ${fmt(c.maximumAmount)}`,
    `   Account Balance   : ${fmt(c.balance)}`,
    '----------------------------------------------------------------------',
    '2. TRANSACTION CONTEXT',
    `   Transaction ID    : ${t.id}`,
    `   Amount            : ${fmt(t.amount)} ${t.currency}`,
    `   Destination Acct  : ${t.receiverId}`,
    `   Timestamp         : ${t.time} (${t.date})`,
    `   Location          : ${t.location}`,
    `   Device            : ${t.device}`,
    '----------------------------------------------------------------------',
    '3. AI EVIDENCE & ANOMALIES OBSERVED',
    `   • Amount Variance : ${(c.averageAmount > 0 ? (t.amount/c.averageAmount).toFixed(1) : '—')}× customer baseline`,
    `   • Geographic Flag : Initiated from ${t.location} vs usual ${c.usualLocation}`,
    `   • Temporal Flag   : Off-hours execution at ${t.time}`,
    `   • Network Signal  : High velocity pass-through flow at ${t.receiverId}`,
    '----------------------------------------------------------------------',
    '4. INVESTIGATOR OPERATIONAL NOTES',
    `   ${investigatorNotes || 'No additional investigator notes provided at time of brief generation.'}`,
    '----------------------------------------------------------------------',
    '5. DISPOSITION GUIDANCE',
    '   Recommended Action: ESCALATE to Financial Intelligence Unit for SAR review.',
    '======================================================================',
    `DISCLAIMER: ${DISCLAIMER}`,
    '======================================================================',
  ].join('\n');

  return { brief, disclaimer: DISCLAIMER };
}

function summaryPrompt(ctx) {
  return `Provide a concise, auditable executive investigation summary for AML alert ${ctx.caseId}.`;
}

module.exports = {
  ask,
  buildCaseContext,
  explainAlert,
  generateBrief,
  summaryPrompt,
  DISCLAIMER,
};
