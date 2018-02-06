const guideModel = require('../models/guide').guideModel;
const placeModel = require('../models/place').placeModel;
const exModel = require('../models/excursions').exModel;
const orderModel = require('../models/orders').orderModel;
const staticModel = require('../models/static').staticModel;

/**
 * Страница "Смена пароля гида"
 */
exports.getGuideOptionsPage = async (req, res) => {
    let id = req.session.guide.id,
        weekendsData = await guideModel.getWeekends(id);
    res.render('gid_options.html', { id: id, weekends: weekendsData});
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
            case 1 :
            case 5 : ordersNow.push(order);
                break;
            case 2 : ordersDone.push(order);
                break;
        }
    });
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
        places: places,
        guide: guide
    });
}

// POST запрос на добавление места и экскурсии в гида => обновление страницы
exports.addPlace = async (req,res) => {
    let id = req.session.guide.id,
        placeId = req.body.place,
        excursion = {}
        excursion.guide = await guideModel.getGuide(id)

        if (excursion.guide.visible === 2){
            excursion.place = await placeModel.getPlace(req.body.place)
            excursion.prices = req.body.price
            excursion.lasting = req.body.duration
            excursion.text = req.body.text
            let newEx = await exModel.addExcursion(excursion)
            let addEx = await guideModel.addExInGuide(newEx, id)
            let addPlace = await guideModel.addPlaceInGuide(id, placeId)
            res.send({redirect: '/guidePlaces'});
        }
        else {
            res.redirect('/error/404');
        }
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
        guide = await guideModel.getGuide(id),
        cities = await staticModel.getCities(req.locale),
        languages = await staticModel.getLangs(req.locale);
    res.render('gid_profile.html', {guide: guide, cities: cities, languages});
}

// PUT запрос на обновление статуса заказа до 1 (взят)
exports.confirmOrder = async (req, res) => {
    const order = await orderModel.getOrder(req.params.id)
    order.status = 1;
    await order.save();
    res.send();
}

// PUT запрос на обновление статуса заказа до 2 (закончен)
exports.finishOrder = async (req, res) => {
    const order = await orderModel.getOrder(req.params.id)
    order.status = 2;

    const guide = await guideModel.getGuide(req.session.guide.id);
    const excursion = await exModel.getEx(order.excursion);
    guide.info.tours++;
    guide.info.hours += excursion.lasting;
    await guide.save();
    
    await order.save()
    res.send()
}
// PUT запрос на обновление статуса заказа до 4 (отменен гидом)
exports.deleteOrder = async (req, res) => {
    const order = await orderModel.getOrder(req.params.id)
    order.status = 4;
    await order.save()
    res.send()
}

// Обновление личных данных гида
exports.guideChangeInfo = async(req,res) => {
    let id = req.session.guide.id,
    info = {
        spec: [req.body.spec],
        types: [req.body.types],
        lang: typeof req.body.lang == 'string'? [req.body.lang] : req.body.lang
    };
    let guide = await guideModel.getGuide(id)

    await guideModel.editGuide(id, req.body)
    //todo?
    guide.info.spec = info.spec
    guide.info.types = info.types
    guide.info.lang = info.lang
    
    if (req.body.desc !== guide.description[0].value) {
        guide.description[0].onModerate = req.body.desc
        guide.description[0].status = 1;
    }
    
    await guide.save()
    req.flash('success', 'Ваши данные успешно изменены');
    res.redirect('/guideProfile')
}

exports.guideChangePhoto = async(req, res) => {
    let id = req.session.guide.id,
    guide = await guideModel.getGuide(id)

    if (req.file) guide.img = `/img/${req.file.filename}`

    await guide.save()
    req.flash('success', 'Ваше фото успешно загружено');
    res.redirect('/guideProfile')
}

exports.saveWeekends = async (req,res) => {
    let guideId = req.session.guide.id;
    let weekendData = req.body.weekends;
    guideModel.addWeekends(weekendData, guideId);
    req.flash('success', 'Выходные успешно сохранены');
    res.redirect('/guideProfile');
}

exports.deleteGuide = async (req, res) => {
    let id = req.session.guide.id,
    guide = await guideModel.getGuide(id);
    await guide.remove();

    let exs = await exModel.getExs({guideId: id});
    for (let i=0; i<exs.length; i++){
        exs[i].remove();
    }

    delete req.session.guide;
    res.redirect('/');
}