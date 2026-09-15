/**
 * Global error handler middleware.
 * Catches all errors, returns clean JSON — never exposes stack traces.
 */
function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = status < 500 ? err.message : 'An internal server error occurred.';

  if (process.env.NODE_ENV !== 'test') {
    console.error(`[${new Date().toISOString()}] ${status} ${req.method} ${req.path} — ${err.message}`);
  }

  res.status(status).json({ error: message });
}

module.exports = errorHandler;
