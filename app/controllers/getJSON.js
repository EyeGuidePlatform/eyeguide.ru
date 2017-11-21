const placeModel = require('../models/place').placeModel;
const guideModel = require('../models/guide').guideModel;
const toHash = require('md5')

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
        buffer = await placeModel.getPlaces({ not: req.params.id })
    }
}

exports.checkPassJSON = async (req, res) => {
    let id = req.session.guide.id,
        guide = await guideModel.getThisGuide(id),
        pass = guide.password,
        old_pass = req.params.pwd,

        answer = pass === toHash(old_pass) ? true : false
    res.json(JSON.stringify(answer))
}

exports.changePassJSON = async (req, res) => {
    let id = req.session.guide.id,
        pass = toHash(req.params.pwd)
    guide = await guideModel.getThisGuide(id)
    guide.password = pass

    await guide.save()
    res.json(JSON.stringify(true))
}

exports.getMyPlacesJSON = async (req, res) => {
    let places,
        id = req.session.guide.id

    guide = await guideModel.getGuide(id);

    res.json(JSON.stringify(guide.places));
}
