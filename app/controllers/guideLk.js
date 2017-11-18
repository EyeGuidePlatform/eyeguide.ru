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
        guide = await guideModel.getGuide(id),
        thisGuide = await guideModel.getThisGuide(id),
        places = await placeModel.getPlaces({not: thisGuide.places})
    res.render('gid_places.html', {
        myPlaces: guide.places,
        id: id,
        places: places
    });
}

// POST запрос на добавление места и обновление страницы
exports.addPlace = async (req,res) => {
    let id = req.session.guide.id,
        placeId = req.body.places
    if (placeId == "Выберите место") {
        //todo
        res.redirect('/guidePlaces')
    } else {
        let check = await guideModel.addPlaceInGuide(id, ...placeId)
        res.redirect('/guidePlaces')
    }
}
// POST запрос на удаление места и обновление страницы
exports.removePlace = async (req,res) => {
    let id = req.session.guide.id,
        placeId = req.body.placeId
    let placeList = await guideModel.removePlaceFromGuide(id,placeId)
    
    res.redirect('/guidePlaces')
    // res.send(placeList)
    
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
