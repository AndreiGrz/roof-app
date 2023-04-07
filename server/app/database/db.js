const mysql = require('mysql2/promise');
const dbConfig = require('../config/db.config.js');

async function connect() {
  return await mysql.createConnection(dbConfig);
};

module.exports = connect;