let express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './src/img')
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname)
        }
    }),
    upload = multer({storage: storage}),
    locales = require('./server').locales,

    mainController = require('./app/controllers/main'),
    searchController = require('./app/controllers/search'),
    lkController = require('./app/controllers/guideLk'),//ранее gidProfile
    mapController = require('./app/controllers/map'),
    guideController = require('./app/controllers/guideCard'),//ранее guideCard
    placeController = require('./app/controllers/placeCard'),//ранее placeCard
    regPlaceController = require('./app/controllers/regPlace'),
    adminController = require('./app/controllers/admin'),
    regGuideController = require('./app/controllers/regGuide'),
    logGuideController = require('./app/controllers/logGuide'),
    getJSONController = require('./app/controllers/getJSON');

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
router.post('/guidePlaces', lkController.parsePlaces);
router.get('/guideProfile', lkController.getProfilePage);

//Карточки(профиль) гида и места
router.get('/profile/:id', guideController.getProfile);
router.get('/place/:id', placeController.getPlacePage);

//Регистрация гидов и мест
router.get('/registration', regGuideController.getNewGuide);
router.post('/registration', upload.single('img'), regGuideController.addNewGuide);
router.get('/create/place', regPlaceController.getCreatePlacePage);
router.post('/createPlace', upload.single('img'), regPlaceController.createPlace);
router.get('/activate/:url', regGuideController.confirmEmail);

//Аутентификация гидов
router.post('/guide/login', logGuideController.login);
router.post('/guide/logout', logGuideController.logout);

router.get('/api/getPlaces/:city', getJSONController.getPlacesJSON);

//Поиск мест и гидов
router.get('/search' ,searchController.getSearchPage);

//Административные функции
router.get('/admin/main', adminController.getPage);
router.get('/admin/login', adminController.loginPage);
router.get('/admin/logout', adminController.logout);
router.get('/admin/create', adminController.createPage);
router.post('/admin/create', adminController.create);
router.post('/admin/login', adminController.login);

module.exports = router;