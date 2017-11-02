const placeModel = require('../models/place').placeModel,
    guideModel = require('../models/guide').guideModel,
    mongoose = require('./../../server').mongoose;

exports.parseCity = (req, res) => {
    let city = req.body.city;

    res.redirect('/map/' + city);
}

exports.getCityPage = (req, res) => {
    let city = req.params.city;

    placeModel.find( {}, (err, places) => {
        guideModel.find( {}, (err, guides) => {
            res.render('map.html', {guides: guides, places: places, city: city});
        });
    } );
}
