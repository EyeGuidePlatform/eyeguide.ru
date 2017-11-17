const placeModel = require('../models/place').placeModel;
const guideModel = require('../models/guide').guideModel;

exports.getPlacesJSON = async (req, res) => {
    let places;
    if (req.params.city == 'none') {
        places = await placeModel.getPlaces({visible: 1});
    } else {
        places = await placeModel.getPlaces({ city: req.params.city }, {visible: 1});
    }
    
    res.json(JSON.stringify(places));
}

exports.editPlacesJSON = async (req, res) => {
    let buffer;
    if (req.params.id === 'none') {
        buffer = await placeModel.getPlaces({not: req.params.id})
    }
}
