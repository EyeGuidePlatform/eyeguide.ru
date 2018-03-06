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

    let guides = await guideModel.getGuides(
        {visible: 2},
        {rating: -1},
        {select: '_id name img info'},
        {lang: req.query.lang ? [req.query.lang] : undefined},
        {city: req.query.city}, 
        {places: queryPlaces},
        {car: req.query.car == 'on' ? true : false },
        {noPopulate: true}
    );

    let total = guides.length;
    
    guides = guides.slice(0, 9);

    res.render('searchGuides.html', {
        domain: require('./../../config').domain,
        guides: guides,
        cities: cities,
        languages: langs,
        selectedLang: req.query.lang,
        selectedCity: req.query.city,
        selectedCar: req.query.car,
        totalPages: Math.floor(total/9)+1
    })
}

exports.getSearchPagePlaces = async (req,res) => {
    const cities = await staticModel.getCities(req.locale);

    let places = await placeModel.getPlaces(
        {visible: 1},
        {select: '_id name img description'}, 
        {noPopulate: true},
        {place: req.query.place}, 
        {city: req.query.city}
    );

    let total = places.length;

    places = places.slice(0, 9);

    res.render('searchPlaces.html', {
        domain: require('./../../config').domain,
        places: places,
        cities: cities,
        selectedCity: req.query.city,
        totalPages: Math.floor(total/9)+1
    });
}