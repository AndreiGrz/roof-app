const cors = require('cors');
const chalk = require('chalk');
const db = require('./app/database/db.js');
const express = require('express');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

require('./app/routes/main.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`Server is running on port ${PORT}.`));
});

