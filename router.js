let express = require('express'),
    router = express.Router(),
    mainController = require('./app/controllers/main'),
    gidProfile = require('./app/controllers/gidProfile'),
    mapController = require('./app/controllers/map'),
    guideCard = require('./app/controllers/guideCard');

router.get('/', mainController.getHomePage);
router.post('/map', mapController.parseCity);
router.get('/map/:city', mapController.getCityPage);
router.get('/createPlace', require('./app/controllers/jz_place.js').getCreatePlacePage);
router.post('/createPlace', require('./app/controllers/jz_place.js').createPlace);
router.get('/gidOptions', gidProfile.getGidOptionsPage);
router.get('/gidOrders', gidProfile.getGidOrdersPage);
router.get('/gidPlaces', gidProfile.getGidPlacesPage);
router.get('/gidProfile', gidProfile.getProfilePage0); // заглушка 
router.get('/gidProfile/:id', require('./app/controllers/brm_gid').getProfilePage);
router.get('/newguide', gidProfile.getNewGuide);
router.get('/profile/:id', guideCard.getProfile);

module.exports = router;