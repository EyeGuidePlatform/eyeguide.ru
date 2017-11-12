const placeModel = require('../models/place').placeModel,
    guideModel = require('../models/guide').guideModel;




/**
 * Страница "Место"
 * @param {String} place
 */
exports.getPlacePage = async (req, res) => {
    let id = req.params.id,
        place = await placeModel.getPlace(id);

    place.guides = await guideModel.trnsGuides(place.guides, req.locale);
    place = await place.trnsPlace(req.locale);

    console.log(place);
    res.render('place.html', {
        guides: place.guides, 
        place: place
    });
}