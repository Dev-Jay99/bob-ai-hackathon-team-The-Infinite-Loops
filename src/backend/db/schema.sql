-- FinGuard PostgreSQL Schema
-- Run this script to initialize the database when using PostgreSQL mode

CREATE TABLE IF NOT EXISTS accounts (
  id              VARCHAR(20)    PRIMARY KEY,
  customer_name   VARCHAR(120)   NOT NULL,
  usual_city      VARCHAR(80)    NOT NULL,
  usual_device    VARCHAR(80)    NOT NULL,
  avg_txn_amount  NUMERIC(14,2)  NOT NULL DEFAULT 0,
  max_txn_amount  NUMERIC(14,2)  NOT NULL DEFAULT 0,
  balance         NUMERIC(14,2)  NOT NULL DEFAULT 0,
  risk_level      VARCHAR(10)    NOT NULL DEFAULT 'LOW',
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS transactions (
  id              VARCHAR(20)    PRIMARY KEY,
  sender_id       VARCHAR(20)    REFERENCES accounts(id),
  receiver_id     VARCHAR(20)    REFERENCES accounts(id),
  amount          NUMERIC(14,2)  NOT NULL,
  currency        VARCHAR(5)     NOT NULL DEFAULT 'INR',
  timestamp       TIMESTAMPTZ    NOT NULL,
  location        VARCHAR(80)    NOT NULL,
  device          VARCHAR(80)    NOT NULL,
  status          VARCHAR(20)    NOT NULL DEFAULT 'COMPLETED',
  is_suspicious   BOOLEAN        NOT NULL DEFAULT FALSE
);

CREATE INDEX IF NOT EXISTS idx_txn_sender    ON transactions(sender_id);
CREATE INDEX IF NOT EXISTS idx_txn_receiver  ON transactions(receiver_id);
CREATE INDEX IF NOT EXISTS idx_txn_timestamp ON transactions(timestamp);

CREATE TABLE IF NOT EXISTS alerts (
  id              VARCHAR(20)    PRIMARY KEY,
  transaction_id  VARCHAR(20)    REFERENCES transactions(id),
  account_id      VARCHAR(20)    REFERENCES accounts(id),
  risk_score      INTEGER        NOT NULL DEFAULT 0,
  risk_level      VARCHAR(10)    NOT NULL,
  status          VARCHAR(20)    NOT NULL DEFAULT 'OPEN',
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_alert_risk_level ON alerts(risk_level);
CREATE INDEX IF NOT EXISTS idx_alert_status     ON alerts(status);
CREATE INDEX IF NOT EXISTS idx_alert_account    ON alerts(account_id);

CREATE TABLE IF NOT EXISTS risk_factors (
  id              SERIAL         PRIMARY KEY,
  alert_id        VARCHAR(20)    REFERENCES alerts(id),
  factor_name     VARCHAR(80)    NOT NULL,
  score           INTEGER        NOT NULL,
  max_score       INTEGER        NOT NULL,
  explanation     TEXT           NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_rf_alert ON risk_factors(alert_id);

CREATE TABLE IF NOT EXISTS investigations (
  id              VARCHAR(20)    PRIMARY KEY,
  alert_id        VARCHAR(20)    REFERENCES alerts(id),
  status          VARCHAR(20)    NOT NULL DEFAULT 'OPEN',
  decision        VARCHAR(20),
  notes           TEXT,
  created_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_inv_alert  ON investigations(alert_id);
CREATE INDEX IF NOT EXISTS idx_inv_status ON investigations(status);

CREATE TABLE IF NOT EXISTS reports (
  id              SERIAL         PRIMARY KEY,
  investigation_id VARCHAR(20)   REFERENCES investigations(id),
  report_text     TEXT           NOT NULL,
  generated_at    TIMESTAMPTZ    NOT NULL DEFAULT NOW()
);
