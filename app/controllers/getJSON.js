const placeModel = require('../models/place').placeModel;
const guideModel = require('../models/guide').guideModel;

exports.getPlacesJSON = async (req, res) => {
    const [query, parameter] = req.params.query.split('=');
    let response;
    
    switch (query) {
        case 'guides':
            const guides = await guideModel.getGuides({limit: 6}, {city: parameter});
            let foundPlaces = [];

            guides.forEach(guide => {
                foundPlaces = guide.places.filter(place => {
                    if (foundPlaces.indexOf(place) == -1)
                        return place.city == parameter;
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
