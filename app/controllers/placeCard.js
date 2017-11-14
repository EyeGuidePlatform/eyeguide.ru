<<<<<<< HEAD
//TODO убрать заглушки!
const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;
=======
const placeModel = require('../models/place').placeModel,
    guideModel = require('../models/guide').guideModel;
>>>>>>> origin/SOLID




/**
 * Страница "Место"
 * @param {String} place
 */
<<<<<<< HEAD
exports.getPlacePage = (req, res) => {
    let id = req.params.id;

    placeModel.findById(id).then( place => {
        //place.guides[]._id;
        //
        let query;
        //

        guideModel.find({}).then( guides => {
            res.render('place.html', {
                guides: guides, 
                place: place
            });
        });
=======
exports.getPlacePage = async (req, res) => {
    let id = req.params.id,
        place = await placeModel.getPlace(id);

    place.guides = await guideModel.trnsGuides(place.guides, req.locale);
    place = await place.trnsPlace(req.locale);

    console.log(place);
    res.render('place.html', {
        guides: place.guides, 
        place: place
>>>>>>> origin/SOLID
    });
}