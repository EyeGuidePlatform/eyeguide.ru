const placeModel = require('../models/place').placeModel;
const guideModel = require('../models/guide').guideModel;
const toHash = require('md5')

exports.getPlacesJSON = async (req, res) => {
    const [query, parameter] = req.params.query.split('=');
    let response;

    switch (query) {
<<<<<<< HEAD
=======
        case 'guides':
            const guides = await guideModel.getGuides({city: parameter}, {limit: 6});
            let foundPlaces = [];

            //FIXME: Оптимизировать выбор
            guides.forEach(guide => {
                guide.places.forEach(place => {
                    if (place.city == parameter && foundPlaces.indexOf(place) === -1) {
                        foundPlaces.push(place);
                    }
                });
            });
            
            response = foundPlaces;
            break;
>>>>>>> origin/newBranch
        case 'city':
            if (parameter !== 'none')
                response = await placeModel.getPlaces({ city: parameter }, {visible: 1});
            else
                response = await placeModel.getPlaces({visible: 1});
            break;

        case 'allPlaces':
<<<<<<< HEAD
                response = await placeModel.getPlaces({visible: 1});
            break;
        
        case 'id':
            response = await placeModel.getPlace(parameter);

=======
                response = await placeModel.getPlaces();
>>>>>>> origin/newBranch
            break;
    }
      
    res.json(JSON.stringify(response));
}

<<<<<<< HEAD
exports.getPlaces = async (req, res) => {
    let queries = [];

    for (let query in req.query) {
        let queryObj = {};
        queryObj[query] = req.query[query];

        queries.push(queryObj);
    }

    let response = await placeModel.getPlaces(...queries);
    
    res.json(response);
}

exports.getGuides = async (req, res) => {
    let queries = [];

    for (let query in req.query) {
        let queryObj = {};
        queryObj[query] = query == 'lang' ? [req.query[query]] : req.query[query];

        queries.push(queryObj);
    }

    let response = await guideModel.getGuides({select: '_id name img info'}, ...queries);
    
    res.json(response);
}

=======
>>>>>>> origin/newBranch
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

exports.getPlacesByGuideId = async (req, res) => {
    let id = req.params.id
    guide = await guideModel.getGuide(id);
    res.json(JSON.stringify(guide.places));
}

exports.getGuidesByPlaceId = async (req, res) => {
    let id = req.params.id
    place = await placeModel.getPlace(id);
    res.json(JSON.stringify(place.guides));
}
