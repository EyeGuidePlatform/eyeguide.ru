let express = require('express'),
    router = express.Router(),
    guideController = require('./app/controllers/guideCard');
router.use('/', (req, res, next) => {
    console.log (req.method, req.path); next();
})
router.get('/checkcard/:id', guideController.getProfile);

module.exports = router;