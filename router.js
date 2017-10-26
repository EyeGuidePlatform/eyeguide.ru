let express = require('express'),
    router = express.Router(),
    mainController = require('./app/controllers/main')

router.get('/gidOptions', mainController.getGidOptionsPage);
router.get('/gidOrders', mainController.getGidOrdersPage);
router.get('/gidPlaces', mainController.getGidPlacesPage);
router.get('/gidProfile/:id', require('./app/controllers/main').getProfilePage);

module.exports = router;