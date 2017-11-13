let guideModel = require('../models/guide').guideModel,
    placeModel = require('../models/place').placeModel,
    cityModel = require('../models/city').cityModel,
    languageModel = require('../models/language').languageModel;

/**
 * Страница "регистрация нового гида"
 */
exports.getNewGuide = async (req, res) => {
    let cities = await cityModel.find(),
        languages = await languageModel.find();
    
    res.render('gid_newGuide.html', {cities: cities, languages: languages});
}

//FIXME
//Перенести в отдельный контроллер
exports.getPlacesJSON = async (req, res) => {
    let places = await placeModel.getPlaces();

    let placesJSON = JSON.stringify(places);
    res.json(placesJSON);
}

exports.addNewGuide = async (req, res, next) => {
    let newGuide = req.body.guide;
    newGuide.img = req.file ? '/img/' + req.file.filename : undefined;
    // newGuide.places = req.body.places;
    newGuide.info = {
        spec: req.body.spec ? req.body.spec.split(',') : undefined,
        types: req.body.types ? req.body.types.split(',') : undefined,
        lang: req.body.lang,
        hours: 0,
        tours: 0,
        happy: 0
    }
    
    let guide = await guideModel.addGuide(newGuide);
    res.redirect('/guideProfile/' + guide._id);
}