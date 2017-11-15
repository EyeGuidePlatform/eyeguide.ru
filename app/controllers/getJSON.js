const placeModel = require('../models/place').placeModel;

exports.getPlacesJSON = async (req, res) => {
    let places;
    if (req.params.city == 'none') {
        places = await placeModel.getPlaces();
    } else {
        places = await placeModel.getPlaces({ city: req.params.city });
    }
    
    res.json(JSON.stringify(places));
}
