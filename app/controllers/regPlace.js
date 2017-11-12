const placeModel = require('../models/place').placeModel,
    cityModel = require('../models/city').cityModel,
    mongoose = require('./../../server').mongoose;

/**
 * Страница "Добавление места"
 */
exports.getCreatePlacePage = async (req, res) => {
    let cities = await cityModel.find();
    res.render('createPlace.html', {cities: cities});
}

/**
 * Сохранение объекта "место" в БД
 */
exports.createPlace = (req, res, next) => {
    let newPlace = req.body.place;
    newPlace.img = req.file ? '/img/' + req.file.filename : undefined;
    placeModel.addPlace(newPlace, place => {
        res.redirect('/place/' + place._id);
    });
}