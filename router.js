let express = require('express'),
    router = express.Router(),
    mainController = require('./app/controllers/main');

router.get('/', mainController.getHomePage);
router.get('/place/:id',mainController.getPlacePage);
router.get('/map', require('./app/controllers/main').getMapPage);
router.get('/profile/:id', require('./app/controllers/main').getProfile);
router.get('/gidOptions', mainController.getGidOptionsPage);
router.get('/gidOrders', mainController.getGidOrdersPage);
router.get('/gidPlaces', mainController.getGidPlacesPage);
router.get('/gidProfile/:id', require('./app/controllers/main').getProfilePage);
router.get('/test', require('./app/controllers/example').example);// тестовый маршрут

module.exports = router;