const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;




/**
 * Страница "Место"
 * @param {String} place
 */
exports.getProfile = (req, res) => {
    let id = req.params.id;

    guideModel.findById(id).then( guide => {
        //place.guides[]._id;
        //
        let query;
        placeModel.find({}).then( places => {
            res.render('guideView.html', {
                guide: guide, 
                places: places
            });
        });
    });
}