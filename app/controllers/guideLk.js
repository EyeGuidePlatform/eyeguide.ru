const guideModel = require('../models/guide').guideModel;

/**
 * Страница "Смена пароля гида"
 */
exports.getGuideOptionsPage = (req, res) => {
    res.render('gid_options.html');
}

/**
 * Страница "Заказы гида"
 */
exports.getGuideOrdersPage = (req, res) => {
    res.render('gid_orders.html');
}

/**
 * Страница "Места гида"
 */
exports.getGuidePlacesPage = (req, res) => {
    res.render('gid_places.html');
}

/**
 * Страница "Личный кабинет гида"
 * @param {ObjectId} id
 */
exports.getProfilePage = (req, res) => {
    guideModel.findById({_id: req.params.id}).then( guides => {
        res.render('gid_profile.html', {guides: guides});
    });
}