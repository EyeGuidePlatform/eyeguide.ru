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
<<<<<<< HEAD
exports.createPlace = (req, res) => {
    if (!req.body.place.img) {
        req.body.place.img = undefined;
    }

    /**
     * TODO
     * при усложнении реализации, вынести в статический метод модели и передавать
     * в метод сформированный в контроллере объект
     */
    placeModel.create( req.body.place );

    res.redirect('back');
=======
exports.createPlace = (req, res, next) => {
    let newPlace = req.body.place;
    newPlace.img = req.file ? '/img/' + req.file.filename : undefined;
    placeModel.addPlace(newPlace, place => {
        res.redirect('/place/' + place._id);
    });
>>>>>>> origin/SOLID
}