/**
 * Страница "Поиск"
 */

const   placeModel = require('../models/place').placeModel,
        guideModel = require('../models/guide').guideModel,
        staticModel = require('../models/static').staticModel;

exports.getSearchPage = async (req, res) => {
    const places = await placeModel.getPlaces({limit: 6}),
          guides = await guideModel.getGuides({limit: 6}),
          langs = await staticModel.getLangs(req.locale),
          cities = await staticModel.getCities(req.locale);

    res.render('search.html', {
        guides: guides,
        places: places,
        langs: langs,
        cities: cities
    });
}