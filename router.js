let express = require('express'),
    router = express.Router();

router.get('/', function (req, res)  {res.redirect('/main/Иван')});
router.get('/main/:name', require('./app/controllers/main').getPage);

module.exports = router;