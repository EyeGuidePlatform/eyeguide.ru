const placeModel = require('../models/place').placeModel,
    staticModel = require('../models/static').staticModel,
    mongoose = require('./../../server').mongoose;


/**
 * Страница "Предложить место"
 */
exports.getSuggestPlacePage = async (req, res) => {
    let cities = await cityModel.getCities();
    res.render('suggestPlace.html', {cities: cities});
}

/**
 * Сохранение объекта "место" в БД
 */
exports.suggestPlace = async (req, res, next) => {
    let newPlace = req.body.place;
    newPlace.lang = req.locale;
    newPlace.name = req.sanitize(newPlace.name);
    newPlace.description = req.sanitize(newPlace.description);
    newPlace.img = req.file ? '/img/' + req.file.filename : undefined;

    newPlace = await placeModel.addPlace(newPlace);
    res.redirect('/place/' + newPlace._id);
}

/**
 * Страница "Добавление места"
 */
exports.getCreatePlacePage = async (req, res) => {
    let cities = await staticModel.getCities(req.locale),
        places = await placeModel.getPlaces({select: '_id name'});

    res.render('createPlace.html', {
        addedPlaces: places,
        cities: cities
    });
}

/**
 * Сохранение объекта "место" в БД
 */
exports.createPlace = async (req, res, next) => {
    let newPlace = req.body.place;
    newPlace.lang = req.locale;
    newPlace.name = req.sanitize(newPlace.name);
    newPlace.description = req.sanitize(newPlace.description);
    newPlace.img = req.file ? '/img/' + req.file.filename : undefined;
    newPlace.visible = 1;

    newPlace = await placeModel.addPlace(newPlace);
    res.redirect('/place/' + newPlace._id);
}

exports.removePlace = async (req, res) => {
    placeModel.removePlace(req.params.id);

    res.redirect('back');
}