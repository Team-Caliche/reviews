const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'franciscoveranicola',
  password: '',
  database: 'sdcreview',
  host: ' 18.216.158.248',
  port: '5432'
});


pool.connect();

module.exports = pool;
