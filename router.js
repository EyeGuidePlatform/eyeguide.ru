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
    error404 = require('./app/controllers/error'),
    logGuideController = require('./app/controllers/logGuide'),
    getJSONController = require('./app/controllers/getJSON'),
    newOrderController = require('./app/controllers/newOrder'),
    middleware = require('./app/controllers/middleware'),
    orderStatusController = require('./app/controllers/orderStatus'),
    FAQcontroller=require('./app/controllers/FAQ');



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

router.get('/FAQ', FAQcontroller.getFAQpage);
//ЛК гида
router.get('/guideOptions', lkController.getGuideOptionsPage);
router.get('/guideOrders', lkController.getGuideOrdersPage);
router.get('/guidePlaces', lkController.getGuidePlacesPage);
router.get('/guideProfile', lkController.getProfilePage);
// ЛК гида - utils
router.post('/guidePlaceAdd', lkController.addPlace);
router.post('/guidePlaceRemove', lkController.removePlace);

//Карточки(профиль) гида и места
router.get('/error/404', error404. throwError);
router.get('/profile/:id', guideController.getProfile);
router.get('/place/:id', placeController.getPlacePage);


//Регистрация гидов и мест
router.get('/registration', regGuideController.getNewGuide);
router.post('/registration', upload.single('img'), regGuideController.addNewGuide);
router.get('/create/place', middleware.isAdminLogged, regPlaceController.getCreatePlacePage);
router.post('/create/place', middleware.isAdminLogged, upload.single('img'), regPlaceController.createPlace);
router.get('/suggest/place', middleware.isGuideLogged, regPlaceController.getSuggestPlacePage);
router.post('/suggest/place', middleware.isGuideLogged, upload.single('img'),regPlaceController.suggestPlace);
router.get('/activate/:url', regGuideController.confirmEmail);


//Создание заказа
router.post('/new_order', newOrderController.getNewOrderPage);

//Аутентификация гидов
router.post('/guide/login', logGuideController.login);
router.post('/guide/logout', middleware.isGuideLogged, logGuideController.logout);


//JSON
router.get('/api/getPlaces/:query', getJSONController.getPlacesJSON);
router.get('/api/editPlaces/:id', getJSONController.editPlacesJSON);
router.get('/api/getPlace/:id', getJSONController.getPlaceByIdJSON);
router.get('/api/checkPass/:pwd', getJSONController.checkPassJSON);
router.get('/api/changePass/:pwd', getJSONController.changePassJSON);
router.get('/api/getMyPlaces', getJSONController.getMyPlacesJSON);
router.get('/api/getPlacesByGuideId/:id', getJSONController.getPlacesByGuideId);
router.get('/api/getGuidesByPlaceId/:id', getJSONController.getGuidesByPlaceId);

//Поиск мест и гидов TODO
router.get('/search/guides' ,searchController.getSearchPageGuides);
router.get('/search/places' ,searchController.getSearchPagePlaces);

//Административные функции
router.get('/admin/main', middleware.isAdminLogged, adminController.getPage);
router.get('/admin/login', adminController.loginPage);
router.get('/admin/logout', middleware.isAdminLogged, adminController.logout);
router.get('/admin/create', middleware.isAdminLogged, adminController.createPage);
router.post('/admin/create', middleware.isAdminLogged,adminController.create);
router.post('/admin/login', adminController.login);

//FAQ

//Статус заказа
router.get('/order/:id', orderStatusController.getOrderStatus);


module.exports = router;