const placeModel = require('../models/place').placeModel;
const guideModel = require('../models/guide').guideModel;

exports.getPlacesJSON = async (req, res) => {
    const [query, parameter] = req.params.query.split('=');
    let response;
    
    switch (query) {
        case 'guides':
            const guides = await guideModel.getGuides({city: parameter}, {limit: 6});
            let foundPlaces = [];

            guides.forEach(guide => {
                guide.places.forEach(place => {
                    if (place.city == parameter && foundPlaces.indexOf(place) === -1) {
                        foundPlaces.push(place);
                    }
                });
            });
            
            response = foundPlaces;
            break;
        case 'city':
            if (parameter !== 'none')
                response = await placeModel.getPlaces({limit: 6}, { city: parameter }, {visible: 1});
            else
                response = await placeModel.getPlaces({limit: 6}, {visible: 1});
            break;
    }
    
    res.json(JSON.stringify(response));
}

exports.editPlacesJSON = async (req, res) => {
    let buffer;
    if (req.params.id === 'none') {
        buffer = await placeModel.getPlaces({not: req.params.id})
    }
}
