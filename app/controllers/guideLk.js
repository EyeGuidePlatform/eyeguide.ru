const guideModel = require('../models/guide').guideModel;
const placeModel = require('../models/place').placeModel;
const exModel = require('../models/excursions').exModel;

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

// POST запрос на добавление места и экскурсии в гида => обновление страницы
exports.addPlace = async (req,res) => {
    let id = req.session.guide.id,
        placeId = req.body.place,
        excursion = {}

        excursion.place = await placeModel.getPlace(req.body.place)
        excursion.guide = await guideModel.getGuide(id)
        excursion.prices = [{price: req.body.price, people: req.body.people}]
        excursion.lasting = req.body.duration

        let newEx = await exModel.addExcursion(excursion)
        let addEx = await guideModel.addExInGuide(newEx, id)
        let addPlace = await guideModel.addPlaceInGuide(id, placeId)
        
        res.send({redirect: '/guidePlaces'});
    
}
// POST запрос на удаление места и обновление страницы
exports.removePlace = async (req,res) => {
    let id = req.session.guide.id,
        placeId = req.body.placeId
    let placeList = await guideModel.removePlaceFromGuide(id,placeId)
    
    res.redirect('/guidePlaces')
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
