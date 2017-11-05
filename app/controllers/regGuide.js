let guideModel = require('../models/guide').guideModel;

/**
 * Страница "регистрация нового гида"
 */
exports.getNewGuide = (req, res) => {
    res.render('gid_newGuide.html');
}

exports.addNewGuide = (req, res, next) => {
    let newGuide = new guideModel(req.body.guide);
    newGuide.img = req.file.filename;
    newGuide.save();

    res.redirect('back');
}