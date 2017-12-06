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

exports.getSearchPageGuides = async (req,res) => {
    guides = await guideModel.getGuides({limit: 9})

    res.render('searchGuides.html', {
        guides: guides
    })
}

exports.getSearchPagePlaces = async (req,res) => {
    places = await placeModel.getPlaces()

    res.render('searchPlaces.html', {
        places: places
    })
}