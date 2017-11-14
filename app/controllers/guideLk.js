const guideModel = require('../models/guide').guideModel;
const placeModel = require('../models/place').placeModel;

/**
 * Страница "Смена пароля гида"
 */
exports.getGuideOptionsPage = (req, res) => {
    let id = req.session.guide.id
    res.render('gid_options.html', { id: id});
}

/**
 * Страница "Заказы гида"
 */
exports.getGuideOrdersPage = (req, res) => {
    let id = req.session.guide.id
    res.render('gid_orders.html', { id: id});
}

/**
 * Страница "Места гида"
 */
exports.getGuidePlacesPage = async (req, res) => {
    let id = req.session.guide.id,
        places = await placeModel.getPlaces()
    res.render('gid_places.html', {
        places: places,
        id: id
    });
}

//ToDo
exports.parsePlaces = async (req,res) => {
    let placeId = req.body.value
}

/**
 * Страница "Личный кабинет гида"
 * @param {ObjectId} id
 */

exports.getProfilePage = async (req, res) => {
    let id = req.session.guide.id,
        guide = await guideModel.getGuide(id)
    res.render('gid_profile.html', {guide: guide})
}
