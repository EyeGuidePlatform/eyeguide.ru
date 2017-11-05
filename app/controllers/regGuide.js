let guideModel = require('../models/guide').guideModel,
    placeModel = require('../models/place').placeModel;

/**
 * Страница "регистрация нового гида"
 */
exports.getNewGuide = (req, res) => {
    placeModel.find({}).then( (places) => {
        res.render('gid_newGuide.html', {places: places});
    } );
}

exports.addNewGuide = (req, res, next) => {
    let newGuide = new guideModel(req.body.guide);
    newGuide.img = req.file.filename;
    newGuide.save();

    res.redirect('back');
}