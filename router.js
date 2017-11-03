let express = require('express'),
    router = express.Router(),
    locales = require('./server').locales,

    mainController = require('./app/controllers/main'),
    lkController = require('./app/controllers/guideLk'),//ранее gidProfile
    mapController = require('./app/controllers/map'),
    guideController = require('./app/controllers/guideCard'),//ранее guideCard
    placeController = require('./app/controllers/placeCard'),//ранее placeCard
    regPlaceController = require('./app/controllers/regPlace'),
    regGuideController = require('./app/controllers/regGuide');

//Middleware
router.use('/', (req, res, next) => {
    if (!req.cookies.eye_lang) {
        lang = (locales.indexOf(req.region) == -1) ? 'ru' : req.region;
        res.cookie('eye_lang', lang, { maxAge: 900000, httpOnly: true });
    }

    next();

    /**
     * Проверка авторизации
     * Редирект на 404
     */
})

//Главная и карта
router.get('/', mainController.getHomePage);
router.get('/map/:city', mapController.getCityPage);
router.post('/map', mapController.parseCity);

//ЛК гида
router.get('/guideOptions', lkController.getGuideOptionsPage);
router.get('/guideOrders', lkController.getGuideOrdersPage);
router.get('/guidePlaces', lkController.getGuidePlacesPage);
router.get('/guideProfile/:id', lkController.getProfilePage);

//Карточки(профиль) гида и места
router.get('/profile/:id', guideController.getProfile);
router.get('/place/:id', placeController.getPlacePage);

//Регистрация гидов и мест
router.get('/registration', regGuideController.getNewGuide);
router.get('/create/place', regPlaceController.getCreatePlacePage);
router.post('/createPlace', regPlaceController.createPlace);

//Поиск мест и гидов
//TODO

//Административные функции
//TODO

router.get('/test', require('./app/controllers/test').test);

module.exports = router;