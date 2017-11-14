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
        places = await placeModel.getPlaces({limit: 6}, {city: city}),
        guides = await guideModel.getGuides({limit: 6}, {city: city});

    places = await placeModel.trnsPlaces(places, req.locale);
    console.log(places);
    guides = await guideModel.trnsGuides(guides, req.locale);

    res.render('map.html', {
        guides: guides, 
        places: places, 
        city: city
    });
}
