//TODO убрать заглушки!
const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;




/**
 * Страница "Место"
 * @param {String} place
 */
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
    });
}