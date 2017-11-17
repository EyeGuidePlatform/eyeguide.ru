const placeModel = require('../models/place').placeModel,
    guideModel = require('../models/guide').guideModel;

/**
 * Переход к карте после ввода города на главной
 * @param {String} city
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
    let city = req.params.city;
        places = await placeModel.getPlaces({limit: 6}, {city: city}, {visible: 1}),
        guides = await guideModel.getGuides({limit: 6}, {city: city});

    res.render('map.html', {
        guides: guides, 
        places: places, 
        city: city
    });
}
