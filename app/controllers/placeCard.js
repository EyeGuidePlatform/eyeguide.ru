const placeModel = require('../models/place').placeModel,
    guideModel = require('../models/guide').guideModel;




/**
 * Страница "Место"
 * @param {String} place
 */


 exports.getPlacePage = async (req, res) => {
    let id = req.params.id,
        place = await placeModel.getPlace(id);
    if ((place == undefined) || (place == null))
        res.redirect('/error/404');
    else
    res.render('place.html', {
        guides: place.guides, 
        place: place
        });
}











 



