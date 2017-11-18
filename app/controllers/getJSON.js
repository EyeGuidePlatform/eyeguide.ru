const placeModel = require('../models/place').placeModel;
const guideModel = require('../models/guide').guideModel;

exports.getPlacesJSON = async (req, res) => {
    let places;
    if (req.params.city == 'none') {
        places = await placeModel.getPlaces();
    } else {
        places = await placeModel.getPlaces({ city: req.params.city });
    }
    
    res.json(JSON.stringify(places));
}

exports.getPlaceByIdJSON = async (req, res) => {
    let place = await placeModel.getPlace(req.params.id);
    res.json(JSON.stringify(place));
}

exports.editPlacesJSON = async (req, res) => {
    let buffer;
    if (req.params.id === 'none') {
        buffer = await placeModel.getPlaces({not: req.params.id})
    }
}

