const cors = require('cors');
const chalk = require('chalk');
const express = require('express');
const app = express();
const path = require('path');

const corsOptions = {
  origin: ['https://calculator.tabla-online.ro', 'https://tabla-online.ro'],
  optionsSuccessStatus: 200
};

app.use(process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? cors(corsOptions) : cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'dist/angular-project')));

  app.get('/calculator-1-apa', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/angular-project/index.html'));
  });
  app.get('/calculator-2-ape', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/angular-project/index.html'));
  });
  app.get('/calculator-4-ape', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/angular-project/index.html'));
  });
  app.get('/calculator-personalizat', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/angular-project/index.html'));
  });
  app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'dist/angular-project/index.html'));
  });
}

require('./app/routes/main.routes')(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.green.bold(`Server is running on port ${PORT}.`));
});

