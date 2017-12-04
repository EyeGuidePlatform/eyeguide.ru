const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;

/**
 * Страница "Место"
 * @param {String} place
 */
exports.getProfile = async (req, res)=>{
    let id = req.params.id,
    guide = await  guideModel.getGuide(id);
    console.log(guide);
    if ((guide == undefined) || (guide == null))
        res.redirect('/error/404');
    else
        res.render('guideView.html',{
            guide: guide,
            places: guide.places
        });
}