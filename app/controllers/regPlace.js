const placeModel = require('../models/place').placeModel,
    mongoose = require('./../../server').mongoose;

/**
 * Страница "Добавление места"
 */
exports.getCreatePlacePage = (req, res) => {
    res.render('createPlace.html');
}

/**
 * Сохранение объекта "место" в БД
 */
exports.createPlace = (req, res, next) => {
    let newPlace = req.body.place;
    newPlace.img = req.file ? '/img/' + req.file.filename : undefined;
    placeModel.addPlace(newPlace, (err, place) => {
        res.redirect('/place/' + place._id);
    });
}