const mysql = require('mysql2');
const dbConfig = require('../config/db.config.js');
const chalk = require('chalk');

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) throw err;
  console.log(chalk.green.bold(`Database connected!`));
});

module.exports = connection;