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
    let newPlace = new placeModel(req.body.place);
    newPlace.img = req.file ? req.file.filename : undefined;
    newPlace.save();

    res.redirect('back');
}