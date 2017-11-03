const placeModel = require('../models/place').placeModel,
    guideModel = require('../models/guide').guideModel;

/**
 * Переход к карте после ввода города на главной
 */
exports.parseCity = (req, res) => {
    let city = req.body.city;

    res.redirect('/map/' + city);
}

/**
 * Страница "Карта"
 * @param {String} city
 */
exports.getCityPage = (req, res) => {
    let city = req.params.city;

    placeModel.find({}).limit(6).then( places => {
        guideModel.find({}).limit(6).then( guides => {
            res.render('map.html', {
                guides: guides, 
                places: places, 
                city: city
            });
        });
    });
}
