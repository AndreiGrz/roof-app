const mainController = require('../controllers/main.controller');

module.exports = function(app) {
  app.get('/api/main/getBrands', mainController.getBrands);
  app.get('/api/main/getModels', mainController.getModels);
  app.get('/api/main/getFinisaje', mainController.getFinisaje);
  app.get('/api/main/getGrosimi', mainController.getGrosimi);
  app.get('/api/main/getCulori', mainController.getCulori);
  app.get('/api/main/getPret', mainController.getPret);
  app.get('/api/main/getOferta', mainController.getOferta);
  app.post('/api/main/getAccesorii', mainController.getAccesorii);
  app.get('/api/main/getAccesoriiSuplimentare', mainController.getAccesoriiSuplimentare);
  app.post('/api/main/sendEmail', mainController.sendEmail);
  app.post('/api/main/uploadFiles', mainController.uploadFiles);
};