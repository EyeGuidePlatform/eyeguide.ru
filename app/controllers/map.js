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
exports.getCityPage = async (req, res) => {
    let places = await placeModel.getPlaces(req.locale),
        guides = await guideModel.find({}),
        city = req.params.city;
    
    res.render('map.html', {
        guides: guides, 
        places: places, 
        city: city
    });
}
