let express = require('express'),
router = express.Router();

router.get('/profile/:id', require('./app/controllers/main').getProfile);

module.exports = router;