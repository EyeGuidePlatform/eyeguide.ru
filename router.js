let express = require('express'),
    router = express.Router(),
    mainController = require('./app/controllers/main'),
    mapController = require('./app/controllers/map');

router.get('/', mainController.getHomePage);
router.get('/map', mapController.getMapPage);

module.exports = router;