const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'franciscoveranicola',
  password: '',
  database: 'sdcreview',
  host: 'localhost',
  port: '5432'
});


pool.connect();

module.exports = pool;
