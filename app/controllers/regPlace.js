const placeModel = require('../models/place').placeModel,
    staticModel = require('../models/static').staticModel,
    mongoose = require('./../../server').mongoose;


/**
 * Страница "Предложить место"
 */
exports.getSuggestPlacePage = async (req, res) => {
    let cities = await staticModel.getCities(req.locale);
    
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
        places = await placeModel.getPlaces({visible: 1}, {select: '_id name'});

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

    req.flash('success', 'Место успешно создано!');
    res.redirect('back');
}

exports.getEditPlace = async (req, res) => {
    const targetPlace = await placeModel.getPlace(req.params.id),
          cities = await staticModel.getCities(req.locale);

    res.render('editPlace.html', {place: targetPlace, cities: cities});
}

exports.editPlace = async (req, res) => {
    let editPlace = req.body.editPlace;
    editPlace.name = req.sanitize(editPlace.name);
    editPlace.description = req.sanitize(editPlace.description);
    if (req.file) {
        editPlace.img = '/img/' + req.file.filename;
    } else {
        delete editPlace.img;
    }

    editPlace = await placeModel.editPlace(req.params.id, editPlace);

    req.flash('success', 'Место успешно изменено!');
    res.redirect('/admin/create/place');
}

exports.removePlace = async (req, res) => {
    placeModel.removePlace(req.params.id);

    req.flash('success', 'Место успешно удалено!');
    res.redirect('back');
}