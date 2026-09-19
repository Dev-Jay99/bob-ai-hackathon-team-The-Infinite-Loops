/**
 * FinGuard — Customer Banking Portal JS
 * Handles AI Copilot customer transaction verification (YES / NO),
 * transaction simulation, and live transaction history.
 */

(function () {
  const ACCOUNT_ID = 'A001';
  let pendingTxn = null;

  async function loadCustomerPortal() {
    const bannerContainer = document.getElementById('verification-banner-container');
    const tbody = document.getElementById('customer-tx-body');

    // Fetch transactions for account A001
    const { data, error } = await API.getTransactions({ accountId: ACCOUNT_ID, limit: 30 });
    if (error || !data || !data.data) {
      tbody.innerHTML = `<tr><td colspan="8" class="text-center text-muted" style="padding:30px;">Failed to load transactions: ${error || 'Unknown error'}</td></tr>`;
      return;
    }

    const txns = data.data;
    document.getElementById('tx-count').textContent = `${txns.length} transactions on record`;

    // Check if a specific transaction was requested via query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const requestedTxnId = (urlParams.get('txn') || urlParams.get('id') || '').toUpperCase();

    if (requestedTxnId) {
      pendingTxn = txns.find(t => t.id === requestedTxnId) || null;
    }

    if (!pendingTxn) {
      // Prioritize any transaction that is currently PENDING verification (newest first)
      pendingTxn = txns.find(t => (t.customer_verification || '').toUpperCase() === 'PENDING')
        || txns.find(t => t.id === 'TXN10482')
        || txns[0];
    }

    await renderVerificationBanner(pendingTxn);
    renderTransactionTable(txns);
  }

  async function renderVerificationBanner(txn) {
    const container = document.getElementById('verification-banner-container');
    if (!txn) {
      container.innerHTML = '';
      return;
    }

    const verification = txn.customer_verification || 'NOT_REQUIRED';
    const amountStr = '₹' + Number(txn.amount || 0).toLocaleString('en-IN');
    const timeStr = txn.timestamp
      ? new Date(txn.timestamp).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      : '02:17 AM';

    // State 1: PENDING VERIFICATION (Action Required)
    if (verification === 'PENDING') {
      container.innerHTML = `
        <div class="verification-card" id="active-verification-card">
          <div class="verification-header">
            <div class="verification-title">
              <svg viewBox="0 0 24 24" fill="none" stroke="#FBBF24" stroke-width="2" style="width:24px;height:24px;">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
              </svg>
              Unusual Transaction Detected — Action Required
            </div>
            <span class="verification-tag">AI Copilot Verification</span>
          </div>

          <p style="color:var(--text-secondary);font-size:14.5px;line-height:1.6;margin-bottom:6px;">
            We detected a transaction that differs from your usual account activity (unusual location, overnight timing, and elevated spend).
            Please review the details below to confirm whether you authorized this transaction.
          </p>

          <div class="verification-details-grid">
            <div>
              <div class="detail-cell-label">Transaction ID</div>
              <div class="detail-cell-value" style="font-family:var(--mono);">${txn.id}</div>
            </div>
            <div>
              <div class="detail-cell-label">Amount</div>
              <div class="detail-cell-value amount">${amountStr}</div>
            </div>
            <div>
              <div class="detail-cell-label">Recipient</div>
              <div class="detail-cell-value">${txn.receiver_name || txn.receiver_id} (${txn.receiver_id})</div>
            </div>
            <div>
              <div class="detail-cell-label">Date &amp; Time</div>
              <div class="detail-cell-value">${timeStr} IST</div>
            </div>
            <div>
              <div class="detail-cell-label">Location</div>
              <div class="detail-cell-value">${txn.location || 'Mumbai'}</div>
            </div>
            <div>
              <div class="detail-cell-label">Device</div>
              <div class="detail-cell-value">${txn.device || 'iPhone 14 Pro'}</div>
            </div>
          </div>

          <div style="font-size:15px;font-weight:600;color:var(--text-primary);margin-top:14px;">
            Did you make this transaction?
          </div>

          <div class="verification-actions">
            <button class="btn-verify-yes" id="btn-verify-yes" data-id="${txn.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px;"><polyline points="20 6 9 17 4 12"/></svg>
              Yes, this was me
            </button>
            <button class="btn-verify-no" id="btn-verify-no" data-id="${txn.id}">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="width:16px;height:16px;"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              No, I did not make this
            </button>
          </div>
        </div>
      `;

      document.getElementById('btn-verify-yes').addEventListener('click', () => handleVerification(txn.id, 'CONFIRMED'));
      document.getElementById('btn-verify-no').addEventListener('click', () => handleVerification(txn.id, 'DENIED'));
      return;
    }

    // State 2: USER CONFIRMED
    if (verification === 'CONFIRMED') {
      container.innerHTML = `
        <div class="verification-card confirmed">
          <div class="verification-header">
            <div class="verification-title" style="color:#4ADE80;">
              <svg viewBox="0 0 24 24" fill="none" stroke="#4ADE80" stroke-width="2.5" style="width:24px;height:24px;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              Transaction Verified
            </div>
            <span class="verification-tag confirmed">✓ User Confirmed</span>
          </div>
          <p style="color:var(--text-secondary);font-size:14.5px;line-height:1.6;">
            You confirmed that transaction <strong style="color:var(--text-primary);font-family:var(--mono);">${txn.id}</strong> (${amountStr}) was made by you.
            Your confirmation response (*"Yes, this was me"*) has been stored with your transaction record.
            No fraud escalation has been filed.
          </p>
          <div style="margin-top:14px;display:flex;gap:12px;align-items:center;">
            <span class="status-confirmed-pill">Status: User Confirmed</span>
            <span class="text-muted text-xs">Retained in transaction history with original risk assessment for bank audit.</span>
          </div>
        </div>
      `;
      return;
    }

    // State 3: USER DENIED (Fraud Flag Raised) — Dynamic Investigation Status
    if (verification === 'DENIED') {
      // Fetch investigation status from backend
      const { data: invData } = await API.getCustomerInvestigationStatus(ACCOUNT_ID);
      const invStatuses = invData && invData.data ? invData.data : [];
      // Find investigation for the current transaction's alert
      const alertId = `ALT-${(txn.id || '').replace(/^TXN/, '')}`;
      const inv = invStatuses.find(s => s.transactionId === txn.id) || invStatuses.find(s => s.alertId === alertId) || invStatuses[0];

      const investigationStatus = inv ? inv.investigationStatus : 'ESCALATED';
      lastKnownInvStatus = investigationStatus;
      const investigatorName = inv ? inv.investigatorName : null;
      const startedAt = inv && inv.investigationStartedAt
        ? new Date(inv.investigationStartedAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })
        : null;

      if (investigationStatus === 'UNDER_INVESTIGATION') {
        // Investigation actively in progress
        container.innerHTML = `
          <div class="verification-card denied" style="border-color:rgba(59,130,246,0.5);background:linear-gradient(180deg, rgba(59,130,246,0.08) 0%, var(--bg-panel) 100%);">
            <div class="verification-header">
              <div class="verification-title" style="color:#60A5FA;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2.5" style="width:24px;height:24px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Investigation In Progress
              </div>
              <span class="verification-tag" style="background:rgba(59,130,246,0.15);color:#60A5FA;border-color:rgba(59,130,246,0.3);">🛡️ Under Investigation</span>
            </div>
            <p style="color:var(--text-secondary);font-size:14.5px;line-height:1.6;">
              Your fraud report for transaction <strong style="color:var(--text-primary);font-family:var(--mono);">${txn.id}</strong> (${amountStr}) has been reviewed and approved by our fraud investigation team.
              A formal investigation is now <strong style="color:#60A5FA;">actively underway</strong>.
            </p>
            <div style="margin-top:14px;background:rgba(59,130,246,0.06);border:1px solid rgba(59,130,246,0.2);border-radius:var(--radius-md);padding:14px;">
              <div style="font-size:13px;color:var(--text-secondary);display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:8px;">
                <div><span style="color:var(--text-muted);font-size:12px;">Assigned Investigator:</span><br><strong style="color:var(--text-primary);">${investigatorName || 'Senior Investigator'}</strong></div>
                <div><span style="color:var(--text-muted);font-size:12px;">Investigation Started:</span><br><strong style="color:var(--text-primary);">${startedAt || 'Recently'}</strong></div>
                <div><span style="color:var(--text-muted);font-size:12px;">Status:</span><br><strong style="color:#60A5FA;">Active Investigation</strong></div>
                <div><span style="color:var(--text-muted);font-size:12px;">Case Reference:</span><br><strong style="color:var(--text-primary);font-family:var(--mono);">${inv ? inv.investigationId : `INV-${alertId}`}</strong></div>
              </div>
            </div>
            <div style="margin-top:14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
              <span class="status-denied-pill" style="background:rgba(59,130,246,0.15);color:#60A5FA;border-color:rgba(59,130,246,0.3);">Status: Under Investigation</span>
              <span class="text-muted text-xs">Your account is being actively protected. We will update you when the investigation concludes.</span>
            </div>
          </div>
        `;
      } else if (investigationStatus === 'MONITORED') {
        container.innerHTML = `
          <div class="verification-card denied" style="border-color:rgba(234,179,8,0.5);background:linear-gradient(180deg, rgba(234,179,8,0.06) 0%, var(--bg-panel) 100%);">
            <div class="verification-header">
              <div class="verification-title" style="color:#EAB308;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#EAB308" stroke-width="2.5" style="width:24px;height:24px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                Case Under Monitoring
              </div>
              <span class="verification-tag" style="background:rgba(234,179,8,0.15);color:#EAB308;border-color:rgba(234,179,8,0.3);">📋 Monitored</span>
            </div>
            <p style="color:var(--text-secondary);font-size:14.5px;line-height:1.6;">
              Your fraud report for transaction <strong style="color:var(--text-primary);font-family:var(--mono);">${txn.id}</strong> (${amountStr}) has been reviewed. The investigation team has placed this case under active monitoring.
            </p>
            <div style="margin-top:14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
              <span class="status-denied-pill" style="background:rgba(234,179,8,0.15);color:#EAB308;border-color:rgba(234,179,8,0.3);">Status: Under Monitoring</span>
            </div>
          </div>
        `;
      } else if (investigationStatus === 'DISMISSED') {
        container.innerHTML = `
          <div class="verification-card denied" style="border-color:rgba(100,116,139,0.5);background:linear-gradient(180deg, rgba(100,116,139,0.06) 0%, var(--bg-panel) 100%);">
            <div class="verification-header">
              <div class="verification-title" style="color:#94A3B8;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2.5" style="width:24px;height:24px;"><polyline points="20 6 9 17 4 12"/></svg>
                Case Resolved
              </div>
              <span class="verification-tag" style="background:rgba(100,116,139,0.15);color:#94A3B8;border-color:rgba(100,116,139,0.3);">✓ Resolved</span>
            </div>
            <p style="color:var(--text-secondary);font-size:14.5px;line-height:1.6;">
              Your fraud report for transaction <strong style="color:var(--text-primary);font-family:var(--mono);">${txn.id}</strong> (${amountStr}) has been reviewed and resolved by our investigation team.
            </p>
            <div style="margin-top:14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
              <span class="status-denied-pill" style="background:rgba(100,116,139,0.15);color:#94A3B8;border-color:rgba(100,116,139,0.3);">Status: Resolved</span>
            </div>
          </div>
        `;
      } else {
        // Default ESCALATED state: pending investigator review
        container.innerHTML = `
          <div class="verification-card denied">
            <div class="verification-header">
              <div class="verification-title" style="color:#F87171;">
                <svg viewBox="0 0 24 24" fill="none" stroke="#F87171" stroke-width="2.5" style="width:24px;height:24px;"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                Transaction Reported — Pending Investigator Review
              </div>
              <span class="verification-tag denied">⚠ Customer Denied</span>
            </div>
            <p style="color:var(--text-secondary);font-size:14.5px;line-height:1.6;">
              We have recorded your response: <em style="color:#FCA5A5;">"I did not make this transaction"</em>.
              Transaction <strong style="color:var(--text-primary);font-family:var(--mono);">${txn.id}</strong> (${amountStr}) has been immediately escalated to human bank fraud investigators for emergency account protection, beneficiary freezing, and SAR review.
            </p>
            <div style="margin-top:14px;background:rgba(251,191,36,0.06);border:1px solid rgba(251,191,36,0.2);border-radius:var(--radius-md);padding:12px;font-size:13px;color:#EAB308;">
              ⏳ <strong>Awaiting Investigator Approval:</strong> Your fraud report has been received and is pending review by an assigned investigator. You will see an update here once the investigation begins.
            </div>
            <div style="margin-top:14px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;">
              <span class="status-denied-pill">Status: Escalated to Fraud Queue</span>
            </div>
          </div>
        `;
      }
      return;
    }

    // Default: Clean state
    container.innerHTML = `
      <div style="background:var(--bg-panel);border:1px solid var(--border-subtle);border-radius:var(--radius-lg);padding:18px 24px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;align-items:center;gap:12px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="#22C55E" stroke-width="2" style="width:20px;height:20px;"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          <span style="font-size:14px;color:var(--text-secondary);">Your account activity is currently normal and protected by FinGuard AI.</span>
        </div>
        <span class="badge badge-low">All Clear</span>
      </div>
    `;
  }

  function renderTransactionTable(txns) {
    const tbody = document.getElementById('customer-tx-body');
    if (!txns.length) {
      tbody.innerHTML = '<tr><td colspan="8" class="text-center text-muted" style="padding:30px;">No transactions on record.</td></tr>';
      return;
    }

    tbody.innerHTML = txns.map(t => {
      const v = t.customer_verification || 'NOT_REQUIRED';
      let vBadge = '<span class="badge badge-not_required">Normal</span>';
      if (v === 'CONFIRMED') {
        vBadge = '<span class="status-confirmed-pill">✓ Confirmed</span>';
      } else if (v === 'DENIED') {
        vBadge = '<span class="status-denied-pill">✕ Denied</span>';
      } else if (v === 'PENDING') {
        vBadge = `<button class="btn btn-secondary btn-sm" style="font-size:11px;padding:3px 9px;cursor:pointer;background:rgba(234,179,8,0.15);color:#FBBF24;border:1px solid rgba(234,179,8,0.35);font-weight:600;" onclick="window.selectCustomerTxn('${t.id}')">⏳ Verify Now</button>`;
      }

      let statusPill = UI.statusBadge(t.transaction_status || t.status);

      return `
        <tr>
          <td style="font-family:var(--mono);font-weight:600;color:var(--accent-blue-light);">${t.id}</td>
          <td class="text-muted text-sm">${UI.formatDate(t.timestamp)}</td>
          <td>
            <div style="font-weight:500;">${t.receiver_name || t.receiver_id}</div>
            <div class="text-muted text-xs" style="font-family:var(--mono);">${t.receiver_id}</div>
          </td>
          <td style="font-family:var(--mono);font-weight:600;font-size:13.5px;">${UI.formatINR(t.amount)}</td>
          <td class="text-secondary text-sm">
            <div>${t.location || '—'}</div>
            <div class="text-muted text-xs">${t.device || 'Standard Device'}</div>
          </td>
          <td>${UI.riskBadge(t.risk_level || 'LOW')}</td>
          <td>${statusPill}</td>
          <td>${vBadge}</td>
        </tr>
      `;
    }).join('');
  }

  async function handleVerification(txnId, decision) {
    const isYes = decision === 'CONFIRMED';
    const note = isYes ? 'Customer verified transaction authorization.' : 'Customer reported transaction as unauthorized fraud.';

    showToast(`Submitting your response to FinGuard security…`, 'info');
    const { data, error } = await API.verifyTransaction(txnId, decision, note);

    if (error) {
      showToast(`Verification failed: ${error}`, 'error');
      return;
    }

    if (isYes) {
      showToast('✓ Transaction verified successfully. Stored in your account record.', 'success');
    } else {
      showToast('⚠ Transaction reported! Case escalated to bank fraud investigators.', 'error');
    }

    await loadCustomerPortal();
  }

  // Simulation Controls
  document.getElementById('btn-sim-normal').addEventListener('click', async () => {
    showToast('Simulating normal grocery spend (₹1,500 in Ahmedabad)…', 'info');
    const { data, error } = await API.simulateTransaction({
      sender_id: ACCOUNT_ID,
      receiver_id: 'A023',
      amount: 1500,
      location: 'Ahmedabad',
      device: 'Samsung Galaxy S23',
    });

    if (error) {
      showToast(`Simulation failed: ${error}`, 'error');
      return;
    }

    showToast(`✓ Transaction recorded normally (${UI.formatINR(data.transaction.amount)}). No security verification required.`, 'success');
    await loadCustomerPortal();
  });

  document.getElementById('btn-sim-unusual').addEventListener('click', async () => {
    showToast('Simulating unusual spend (₹85,000 in Mumbai at 3 AM)…', 'info');
    const { data, error } = await API.simulateTransaction({
      sender_id: ACCOUNT_ID,
      receiver_id: 'A023',
      amount: 85000,
      location: 'Mumbai',
      device: 'iPhone 14 Pro (unrecognized)',
    });

    if (error) {
      showToast(`Simulation failed: ${error}`, 'error');
      return;
    }

    showToast(`⚠ Unusual transaction detected (${data.transaction.id})! AI Copilot verification prompt triggered.`, 'info');
    pendingTxn = data.transaction;
    await loadCustomerPortal();
  });

  document.getElementById('btn-reset-demo').addEventListener('click', async () => {
    showToast('Resetting benchmark case (TXN10482)…', 'info');
    const { data, error } = await API.resetBenchmarkTransaction();

    if (error) {
      showToast(`Reset failed: ${error}`, 'error');
      return;
    }

    showToast('✓ Benchmark case ALT-10482 / TXN10482 reset to pending verification state.', 'success');
    await loadCustomerPortal();
  });

  window.selectCustomerTxn = async (txnId) => {
    const { data } = await API.getTransactions({ accountId: ACCOUNT_ID, limit: 30 });
    if (data && data.data) {
      const target = data.data.find(t => t.id === txnId);
      if (target) {
        pendingTxn = target;
        await renderVerificationBanner(pendingTxn);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        showToast(`Loaded verification prompt for ${txnId}`, 'info');
      }
    }
  };

  // Initial load
  loadCustomerPortal();

  // Live polling for investigation updates when customer has denied a transaction
  let lastKnownInvStatus = null;
  setInterval(async () => {
    if (!pendingTxn || pendingTxn.customer_verification !== 'DENIED') return;
    try {
      const { data: invData } = await API.getCustomerInvestigationStatus(ACCOUNT_ID);
      const invStatuses = invData && invData.data ? invData.data : (Array.isArray(invData) ? invData : []);
      const alertId = `ALT-${(pendingTxn.id || '').replace(/^TXN/, '')}`;
      const inv = invStatuses.find(s => s.transactionId === pendingTxn.id) || invStatuses.find(s => s.alertId === alertId) || invStatuses[0];
      const currentStatus = inv ? inv.investigationStatus : null;

      if (currentStatus && lastKnownInvStatus && currentStatus !== lastKnownInvStatus) {
        if (currentStatus === 'UNDER_INVESTIGATION') {
          showToast('🛡️ Update: Fraud investigation team has approved and started your case!', 'info', 5000);
        } else if (currentStatus === 'MONITORED') {
          showToast('📋 Update: Your case is being actively monitored by fraud operations.', 'info', 5000);
        } else if (currentStatus === 'DISMISSED') {
          showToast('✓ Update: Your reported transaction case has been resolved.', 'success', 5000);
        }
        await renderVerificationBanner(pendingTxn);
      }
      lastKnownInvStatus = currentStatus;
    } catch (e) {
      // silent background check
    }
  }, 4000);
})();
