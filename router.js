let express = require('express'),
    router = express.Router(),
<<<<<<< HEAD
    mainController = require('./app/controllers/main'),
=======
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
>>>>>>> origin/SOLID
    lkController = require('./app/controllers/guideLk'),//ранее gidProfile
    mapController = require('./app/controllers/map'),
    guideController = require('./app/controllers/guideCard'),//ранее guideCard
    placeController = require('./app/controllers/placeCard'),//ранее placeCard
    regPlaceController = require('./app/controllers/regPlace'),
<<<<<<< HEAD
=======
    adminController = require('./app/controllers/admin'),
>>>>>>> origin/SOLID
    regGuideController = require('./app/controllers/regGuide');

//Middleware
router.use('/', (req, res, next) => {
<<<<<<< HEAD
    console.log (req.method, req.path); next();
=======
    if (!req.cookies.eye_lang) {
        lang = (locales.indexOf(req.region) == -1) ? 'ru' : req.region;
        res.cookie('eye_lang', lang, { maxAge: 900000, httpOnly: true });
    }

    next();

>>>>>>> origin/SOLID
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
<<<<<<< HEAD
router.get('/create/place', regPlaceController.getCreatePlacePage);
router.post('/createPlace', regPlaceController.createPlace);

//Поиск мест и гидов
//TODO

//Административные функции
//TODO
=======
router.post('/registration', upload.single('img'), regGuideController.addNewGuide);
router.get('/create/place', regPlaceController.getCreatePlacePage);
router.post('/createPlace', upload.single('img'), regPlaceController.createPlace);

//Поиск мест и гидов
router.get('/search' ,searchController.getSearchPage);

//Административные функции
router.get('/admin/main', adminController.getPage);
router.get('/admin/login', adminController.loginPage);
router.get('/admin/logout', adminController.logout);
router.get('/admin/create', adminController.createPage);
router.post('/admin/create', adminController.create);
router.post('/admin/login', adminController.login);
>>>>>>> origin/SOLID

module.exports = router;