let express = require('express'),
    router = express.Router(),
    mainController = require('./app/controllers/main');

router.get('/', mainController.getHomePage);
router.get('/place/:id',mainController.getPlacePage);
router.get('/map', require('./app/controllers/main').getMapPage);
router.get('/profile/:id', require('./app/controllers/main').getProfile);

module.exports = router;