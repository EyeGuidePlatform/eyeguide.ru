let guideModel = require('../models/guide').guideModel,
    placeModel = require('../models/place').placeModel;

/**
 * Страница "регистрация нового гида"
 */
exports.getNewGuide = (req, res) => {
    placeModel.find({}).then( places => {
        res.render('gid_newGuide.html', {places: places});
    } );
}

exports.addNewGuide = (req, res, next) => {
    let newGuide = new guideModel(req.body.guide);
    newGuide.img = req.file ? '/img/' + req.file.filename : undefined;
    newGuide.places = req.body.places;
    newGuide.info.spec = req.body.spec.split(',');
    newGuide.info.types = req.body.types.split(',');
    newGuide.info.lang = req.body.lang.split(',');
    newGuide.info.hours = newGuide.info.tours = newGuide.info.happy = 0;
    newGuide.save();

    //Добавить каждому выбранному месту нового гида
    req.body.places.forEach( placeId => {
        placeModel.findById( placeId ).then( foundPlace => {
            foundPlace.guides.push( newGuide );
            foundPlace.save();
        });
    });

    res.redirect('/');
}