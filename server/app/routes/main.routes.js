const mainController = require('../controllers/main.controller');

module.exports = function(app) {
  app.get('/api/main/get', mainController.get);
};