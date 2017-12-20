const guideModel = require('../models/guide').guideModel;
const placeModel = require('../models/place').placeModel;
const exModel = require('../models/excursions').exModel;
const orderModel = require('../models/orders').orderModel;

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
exports.getGuideOrdersPage = async (req, res) => {
    let id = req.session.guide.id,
    guide = await guideModel.getGuide(id)
    
    const ordersNew = [];
    const ordersDone = [];
    const ordersNow = [];

    guide.orders.forEach( (order) => {
        switch(order.status) {
            case 0 : ordersNew.push(order);
                break;
<<<<<<< HEAD
            case 1 :
            case 5 : ordersNow.push(order);
=======
            case 1 : ordersNow.push(order);
>>>>>>> origin/newBranch
                break;
            case 2 : ordersDone.push(order);
                break;
        }
    });

<<<<<<< HEAD
=======
    // console.log(guide)
    // console.log(ordersNow)

>>>>>>> origin/newBranch
    res.render('gid_orders.html', {
         id: id,
         ordersNew: ordersNew,
         ordersNow: ordersNow,
         ordersDone: ordersDone
        });
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
<<<<<<< HEAD
        guide = await guideModel.getGuide(id)
    res.render('gid_profile.html', {guide: guide})
=======
        guide = await guideModel.getGuide(id);
    res.render('gid_profile.html', {guide: guide});
>>>>>>> origin/newBranch
}

// PUT запрос на обновление статуса заказа до 1 (взят)
exports.confirmOrder = async (req, res) => {
    const order = await orderModel.getOrder(req.params.id)
    order.status = 1;
<<<<<<< HEAD
    await order.save()
    res.send()
=======
    await order.save();
    res.send();
>>>>>>> origin/newBranch
}

// PUT запрос на обновление статуса заказа до 2 (закончен)
exports.finishOrder = async (req, res) => {
<<<<<<< HEAD
    const order = await orderModel.getOrder(req.params.id)
    order.status = 2;
    await order.save()
    res.send()
}
// PUT запрос на обновление статуса заказа до 4 (отменен гидом)
exports.deleteOrder = async (req, res) => {
    const order = await orderModel.getOrder(req.params.id)
    order.status = 4;
=======
    const order = await orderModel.getOrder(req.params.id);
    order.status = 2;
    const guide = await guideModel.getGuide(req.session.guide.id);
    const excursion = await exModel.getEx(order.excursion);
    guide.info.tours++;
    guide.info.hours += excursion.lasting;
    await guide.save();
>>>>>>> origin/newBranch
    await order.save()
    res.send()
}
