let express = require('express'),
router = express.Router();
mainController = require('./app/controllers/main');

router.get('/',mainController.getPage);

module.exports = router;