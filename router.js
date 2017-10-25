let express = require('express'),
router = express.Router();
mainController = require('./app/controllers/main');

router.get('/place/:id',mainController.getPlacePage);

module.exports = router;