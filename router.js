let express = require('express'),
    router = express.Router(),
    mainController = require('./app/controllers/main');

router.get('/', mainController.getHomePage);
// router.get('/main/:name', require('./app/controllers/main').getPage);

module.exports = router;