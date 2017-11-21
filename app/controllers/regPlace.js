const placeModel = require('../models/place').placeModel,
    staticModel = require('../models/static').staticModel,
    mongoose = require('./../../server').mongoose;

/**
 * Страница "Добавление места"
 */
exports.getCreatePlacePage = async (req, res) => {
    let cities = await staticModel.getCities(req.locale);
    res.render('createPlace.html', {cities: cities});
}

/**
 * Сохранение объекта "место" в БД
 */
exports.createPlace = async (req, res, next) => {
    let newPlace = req.body.place;
    newPlace.img = req.file ? '/img/' + req.file.filename : undefined;

    newPlace = await placeModel.addPlace(newPlace);
    res.redirect('/place/' + newPlace._id);
}