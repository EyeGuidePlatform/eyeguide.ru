let express = require('express'),
    router = express.Router(),
    mainController = require('./app/controllers/main'),
    mapController = require('./app/controllers/map');

router.get('/', mainController.getHomePage);
router.post('/map', mapController.parseCity);
router.get('/map/:city', mapController.getCityPage);
router.get('/createPlace', require('./app/controllers/jz_place.js').getCreatePlacePage);
router.post('/createPlace', require('./app/controllers/jz_place.js').createPlace);

module.exports = router;