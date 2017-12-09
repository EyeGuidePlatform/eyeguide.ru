/**
 * Страница "Поиск"
 */

const   placeModel = require('../models/place').placeModel,
        guideModel = require('../models/guide').guideModel,
        staticModel = require('../models/static').staticModel;

exports.getSearchPageGuides = async (req,res) => {
    const langs = await staticModel.getLangs(req.locale),
        cities = await staticModel.getCities(req.locale);
    
    let queryPlaces = undefined;

    if (req.query.places) {
        if (req.query.places.splice) {
            queryPlaces = req.query.places; 
        } else {
            queryPlaces = [];
            queryPlaces.push(req.query.places);
        }
    }

    const guides = await guideModel.getGuides(
        {lang: req.query.lang ? [req.query.lang] : undefined},
        {city: req.query.city}, 
        {places: queryPlaces}
    );

    res.render('searchGuides.html', {
        guides: guides,
        cities: cities,
        languages: langs,
        selectedLang: req.query.lang,
        selectedCity: req.query.city
    })
}

exports.getSearchPagePlaces = async (req,res) => {
    places = await placeModel.getPlaces()

    res.render('searchPlaces.html', {
        places: places
    })
}