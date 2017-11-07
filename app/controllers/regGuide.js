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
    let newGuide = req.body.guide;
    newGuide.img = req.file ? '/img/' + req.file.filename : undefined;
    newGuide.places = req.body.places;
    newGuide.info = {
        spec: req.body.spec.split(','),
        types: req.body.types.split(','),
        lang: req.body.lang.split(','),
        hours: 0,
        tours: 0,
        happy: 0
    };
    
    guideModel.addGuide(newGuide, (err, guide) => {
        res.redirect('/guideProfile/' + guide._id);
    });
}