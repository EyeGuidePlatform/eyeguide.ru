const guideModel = require('../models/guide').guideModel;
const placeModel = require('../models/place').placeModel;

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
exports.getGuidePlacesPage = async (req, res) => {
    let places = await placeModel.getPlaces()
    res.render('gid_places.html', {places: places});
}

/**
 * Страница "Личный кабинет гида"
 * @param {ObjectId} id
 */
exports.getProfilePage = async (req, res) => {
    let id = req.param.id,
        guide = await guideModel.getGuide(id)
    
    res.render('gid_profile.html', {guide: guide})
}