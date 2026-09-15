# Problem Statement

## Background

Financial crime — including payment fraud, account takeover, and money laundering — costs the global banking sector over $3 trillion annually. Banks are legally required to file Suspicious Activity Reports (SARs) when fraud or money laundering is detected. Failure to file timely and accurate SARs results in regulatory fines, reputational damage, and complicity in financial crime.

## The Problem

Bank fraud and AML investigators working in transaction monitoring operations centers face a severe evidence fragmentation problem. When an alert fires, the investigator must manually:

1. Look up the alert in the transaction monitoring system
2. Pull the customer's KYC profile from a separate CRM
3. Query transaction history from a data warehouse
4. Check device and location logs from a fraud platform
5. Run the account through a network analysis tool to check for connected suspicious accounts
6. Document findings and make a decision

This process takes **45–90 minutes per alert**. Investigators managing 30–50 alerts per day are unable to complete thorough reviews, leading to superficial dismiss decisions, missed fraud networks, and delayed SAR filings — all of which expose the institution to regulatory penalty.

## Who is Affected

**Primary users:** AML/Fraud investigators at commercial banks and financial institutions — typically teams of 5–50 investigators working alert queues in shift patterns. They hold professional certifications (CAMS, CFE) and are responsible for high-stakes, legally auditable decisions.

**Secondary impact:** Compliance officers who review investigation quality, and regulators who audit SAR filing timeliness and accuracy.

## Why It Matters

- Banks were fined over **$10 billion** globally in 2023 for AML failures
- The average cost of a manual AML investigation is estimated at **$25–$50 per alert**
- Alert volumes are increasing 15–20% annually due to digital transaction growth
- Investigator burnout and high staff turnover compound the problem
- Every missed fraud network represents real money flowing to organized crime

## Why Existing Solutions Fall Short

Existing transaction monitoring platforms (e.g., NICE Actimize, Oracle FCCM, Temenos) generate alerts well but provide investigators with isolated case screens that link out to multiple other systems. They do not:

- Consolidate all evidence in one view
- Provide explainable, factor-level risk breakdowns
- Show account network relationships interactively
- Offer AI-assisted investigation guidance within the workflow
- Support auditable, one-click investigation decisions linked to the evidence

Investigators still spend the majority of their time navigating between tools rather than analyzing evidence and making decisions.
