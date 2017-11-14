const placeModel = require('../models/place').placeModel;

exports.getPlacesJSON = async (req, res) => {
    let places = await placeModel.getPlaces();

    let placesJSON = JSON.stringify(places);
    res.json(placesJSON);
}
