const mainController = require('../controllers/main.controller');

module.exports = function(app) {
  app.get('/api/main/getBrands', mainController.getBrands);
  app.get('/api/main/getModels', mainController.getModels);
  app.get('/api/main/getFinisaje', mainController.getFinisaje);
  app.get('/api/main/getGrosimi', mainController.getGrosimi);
};