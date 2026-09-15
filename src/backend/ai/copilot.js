'use strict';

/**
 * FinGuard Copilot Service
 *
 * Core service layer connecting the REST API to the dynamic FinGuard AI engine.
 * Powered by real database records from src/data/*.json (alerts, accounts, transactions, risk factors).
 */

const ai = require('./aiService');

class CopilotService {
  /**
   * chat — dynamically answers an investigator's question about a case using real banking data.
   */
  async chat(caseContext, message, detail) {
    const ctx = caseContext || {};
    const alertId = ctx.alertId || (detail && detail.alert ? detail.alert.id : null);
    if (!alertId) {
      return {
        response: 'No alert ID selected. Please select a case to begin investigation assistance.',
        disclaimer: ai.DISCLAIMER,
        isPlaceholder: false,
      };
    }

    // Build structured context from detail (db) or fallback to caseContext
    const fullCtx = detail
      ? ai.buildCaseContext(
          alertId,
          detail.alert,
          detail.transaction,
          detail.account,
          detail.riskAssessment,
          detail
        )
      : {
          caseId:      alertId,
          riskScore:   ctx.riskScore   || 0,
          riskLevel:   ctx.riskLevel   || 'UNKNOWN',
          riskFactors: ctx.factors ? ctx.factors.map(f => f.name).join(', ') : '',
          factorList:  ctx.factors || [],
          transaction: {
            id:         ctx.transactionId || 'Unknown',
            amount:     ctx.amount   || 0,
            currency:   ctx.currency || 'INR',
            location:   ctx.location || 'Unknown',
            device:     ctx.device   || 'Unknown',
            time:       ctx.time     || 'Unknown',
            date:       ctx.date     || 'Unknown',
            receiverId: ctx.receiverId || 'Unknown',
            senderId:   ctx.accountId  || 'Unknown',
          },
          customer: {
            id:            ctx.accountId  || 'Unknown',
            name:          ctx.customerName || 'Account Holder',
            usualLocation: ctx.usualCity  || 'Unknown',
            usualDevice:   ctx.usualDevice || 'Unknown',
            averageAmount: ctx.avgAmount  || 0,
            maximumAmount: ctx.maxAmount  || 0,
            balance:       ctx.balance    || 0,
          },
        };

    const response = await ai.ask(fullCtx, String(message).slice(0, 1000));
    return {
      response,
      caseId: alertId,
      disclaimer: ai.DISCLAIMER,
      isPlaceholder: false,
    };
  }

  /**
   * explainAlert — generates grounded anomaly explanation, evidence signals, and recommendations.
   */
  async explainAlert(alertId, detail) {
    if (!detail) {
      return {
        explanation: `Alert ${alertId} was not found in the database.`,
        evidence: [],
        recommendations: [],
        disclaimer: ai.DISCLAIMER,
        isPlaceholder: false,
      };
    }

    const ctx = ai.buildCaseContext(
      alertId,
      detail.alert,
      detail.transaction,
      detail.account,
      detail.riskAssessment,
      detail
    );

    const result = ai.explainAlert(ctx);
    return {
      ...result,
      caseId: alertId,
      isPlaceholder: false,
    };
  }

  /**
   * generateInvestigationBrief — produces formal, auditable Investigation Brief.
   */
  async generateInvestigationBrief(caseContext, detail, investigatorNotes) {
    const alertId = (caseContext || {}).alertId || (detail && detail.alert ? detail.alert.id : 'UNKNOWN');
    const ctx = detail
      ? ai.buildCaseContext(
          alertId,
          detail.alert,
          detail.transaction,
          detail.account,
          detail.riskAssessment,
          detail
        )
      : {
          caseId:      alertId,
          riskScore:   (caseContext || {}).riskScore  || 0,
          riskLevel:   (caseContext || {}).riskLevel  || 'UNKNOWN',
          customer:    { name: (caseContext || {}).customerName || 'Account Holder', id: (caseContext || {}).accountId || 'Unknown', usualLocation: 'Unknown', averageAmount: 0, maximumAmount: 0, balance: 0 },
          transaction: { id: 'TXN', amount: (caseContext || {}).amount || 0, currency: 'INR', location: 'Unknown', device: 'Unknown', time: 'Unknown', date: 'Unknown', receiverId: 'Unknown' },
        };

    const { brief, disclaimer } = ai.generateBrief(ctx, investigatorNotes);
    return {
      brief,
      caseId: alertId,
      disclaimer,
      isPlaceholder: false,
    };
  }
}

module.exports = { CopilotService };
