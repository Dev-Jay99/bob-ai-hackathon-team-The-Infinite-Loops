/**
 * Database index — auto-selects JSON store or PostgreSQL based on environment.
 * All consumers import from this file only.
 */
const store = process.env.DATABASE_URL
  ? require('./pgStore')
  : require('./jsonStore');

module.exports = store;
