const placeModel = require('../models/place').placeModel,
    mongoose = require('./../../server').mongoose;

exports.getCreatePlacePage = (req, res) => {
    res.render('createPlace.html');
}

exports.createPlace = (req, res) => {
    if (!req.body.place.img) {
        req.body.place.img = undefined;
    }
    
    placeModel.create( req.body.place );

    res.redirect('back');
}