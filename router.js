let express = require('express'),
    router = express.Router();

router.get('/gidProfile/:id', require('./app/controllers/main').getProfilePage);

module.exports = router;