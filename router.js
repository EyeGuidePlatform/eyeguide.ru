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
    upload = multer({storage: storage}, {limits: { fileSize: 2048 }}),
    locales = require('./server').locales,
    recaptcha = require('./server').recaptcha,

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
    FAQcontroller = require('./app/controllers/FAQ'),
    guideFAQcontroller = require('./app/controllers/guideFAQ'),
    contactsController = require('./app/controllers/contacts');


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
router.get('/guideProfile', lkController.getProfilePage);
// ЛК гида - utils
router.post('/guide/changeInfo', lkController.guideChangeInfo);
router.post('/guide/changePhoto', upload.single('img'), lkController.guideChangePhoto);
router.post('/guideOptions', lkController.saveWeekends);
router.post('/guidePlaceAdd', lkController.addPlace);
router.post('/guidePlaceRemove', lkController.removePlace);
router.put('/order/confirm/:id', lkController.confirmOrder);
router.put('/order/done/:id', lkController.finishOrder);
router.put('/order/delete/:id', lkController.deleteOrder);
router.post('/guide/delete', lkController.deleteGuide);

//Карточки(профиль) гида и места
router.get('/error/404', error404. throwError);
router.get('/profile/:id', guideController.getProfile);
router.get('/place/:id', placeController.getPlacePage);


//Регистрация гидов и мест
router.get('/registration', regGuideController.getNewGuide);
router.post('/registration', recaptcha.middleware.verify, upload.single('img'), regGuideController.addNewGuide);
router.get('/suggest/place', middleware.isGuideLogged, regPlaceController.getSuggestPlacePage);
router.post('/suggest/place', middleware.isGuideLogged, upload.single('img'),regPlaceController.suggestPlace);
router.get('/activate/:url', regGuideController.confirmEmail);

//Создание заказа
router.post('/new_order', newOrderController.getNewOrderPage);
router.post('/set_new_order', recaptcha.middleware.verify, newOrderController.createOrder); 

//Аутентификация гидов
router.post('/guide/login', logGuideController.login);
router.post('/guide/logout', middleware.isGuideLogged, logGuideController.logout);


//JSON
router.get('/api/getPlaces', getJSONController.getPlaces);
router.get('/api/getGuides', getJSONController.getGuides);
router.get('/api/getExcursion', getJSONController.getExcursion);
router.get('/api/getCities', getJSONController.getCities);
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
router.post('/admin/login', adminController.login);
router.get('/admin/logout', middleware.isAdminLogged, adminController.logout);

router.get('/admin/create', middleware.isAdminLogged, adminController.createPage);
router.post('/admin/create', middleware.isAdminLogged,adminController.create);

router.get('/admin/create/place', middleware.isAdminLogged, regPlaceController.getCreatePlacePage);
router.post('/admin/create/place', middleware.isAdminLogged, upload.single('img'), regPlaceController.createPlace);

router.get('/admin/confirm/guides', middleware.isAdminLogged, adminController.getConfirmGuidesPage);
router.get('/admin/confirm/places', middleware.isAdminLogged, adminController.getConfirmPlacesPage);

router.get('/admin/confirm/guides/:id', middleware.isAdminLogged, adminController.confirmGuide);
router.get('/admin/confirm/places/:id', middleware.isAdminLogged, adminController.confirmPlace);

router.post('/profile/:id/remove', middleware.isAdminLogged, regGuideController.removeGuide);
router.get('/profile/:id/edit', middleware.isAdminLogged, regGuideController.getEditGuidePage);
router.post('/profile/:id', middleware.isAdminLogged, regGuideController.editGuide);

router.get('/place/:id/edit', middleware.isAdminLogged, regPlaceController.getEditPlace);
router.post('/place/:id', middleware.isAdminLogged, upload.single('img'), regPlaceController.editPlace);
router.post('/place/:id/remove', middleware.isAdminLogged, regPlaceController.removePlace);

router.get('/onModerate',  middleware.isAdminLogged, adminController.getOnModerate);
router.get('/onModerate/agree/:id', middleware.isAdminLogged, adminController.agreeOnModerate);
router.get('/onModerate/desagree/:id', middleware.isAdminLogged, adminController.desagreeOnModerate);

router.get('/admin/update/guides', middleware.isAdminLogged, adminController.getGuides);
router.get('/admin/update/delete/:id', middleware.isAdminLogged, adminController.deleteGuide);
router.post('/admin/update/raitng', middleware.isAdminLogged, adminController.updateRaiting);
//FAQ
router.get('/FAQ', FAQcontroller.getFAQpage);
router.post('/FAQ', recaptcha.middleware.verify, FAQcontroller.sendSupportEmail);
router.get('/guideFAQ', guideFAQcontroller.getGuideFAQpage);
router.post('/guideFAQ', recaptcha.middleware.verify, guideFAQcontroller.sendSupportEmail);
router.get('/contacts', contactsController.getContactsPage);

//Статус заказа
router.get('/order/:id', orderStatusController.getOrderStatus);
router.post('/order/:id', orderStatusController.rateExcursion);
router.post('/order', orderStatusController.cancelExcursion);

module.exports = router;