//TODO убрать заглушки!
const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;




/**
 * Страница "Место"
 * @param {String} place
 */
exports.getPlacePage = (req, res) => {
    let id = req.params.id;

    placeModel.findById(id).then((err, places) => {
        guideModel.find({}).then( guides => {
            res.render('place.html', {
                guides: guides, 
                places: places
            });
        });
    });
}