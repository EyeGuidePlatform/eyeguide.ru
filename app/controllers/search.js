/**
 * Страница "Поиск"
 */

const   placeModel = require('../models/place').placeModel,
        guideModel = require('../models/guide').guideModel,
        staticModel = require('../models/static').staticModel;

exports.getSearchPageGuides = async (req,res) => {
    const langs = await staticModel.getLangs(req.query.lang || req.locale),
        cities = await staticModel.getCities(req.query.lang || req.locale),
        queryPlaces = [];

    if (req.query.places.splice) {
        queryPlaces = req.query.places; 
    } else {
        queryPlaces.push(req.query.places);
    }

    const guides = await guideModel.getGuides(
        {city: req.query.city}, 
        {places: queryPlaces}, 
        {limit: 9}
    );

    res.render('searchGuides.html', {
        guides: guides,
        cities: cities,
        languages: langs
    })
}

exports.getSearchPagePlaces = async (req,res) => {
    places = await placeModel.getPlaces({limit: 9})

    res.render('searchPlaces.html', {
        places: places
    })
}