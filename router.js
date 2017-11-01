let express = require('express'),
    router = express.Router(),
    mainController = require('./app/controllers/main'),
    gidProfile = require('./app/controllers/gidProfile')

router.get('/', mainController.getHomePage);
router.get('/place/:id',mainController.getPlacePage);
router.get('/map', require('./app/controllers/main').getMapPage);
router.get('/profile/:id', require('./app/controllers/main').getProfile);
router.get('/gidOptions', gidProfile.getGidOptionsPage);
router.get('/gidOrders', gidProfile.getGidOrdersPage);
router.get('/gidPlaces', gidProfile.getGidPlacesPage);
// router.get('/gidProfile', gidProfile.getProfilePage); // заглушка 
router.get('/gidProfile/:id', require('./app/controllers/brm_gid').getProfilePage);

module.exports = router;