const bluebird = require('bluebird');

const dev = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'roof',
  Promise: bluebird
};

const prod = {
  host: 'localhost',
  user: 'tablaonline_to2020',
  password: 'Jv%}v(pp-lG!',
  database: 'tablaonline_2020',
  Promise: bluebird
};

module.exports = process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? prod : dev;