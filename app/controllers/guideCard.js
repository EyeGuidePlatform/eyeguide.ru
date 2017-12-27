const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;

/**
 * Страница "Место"
 * @param {String} place
 */
exports.getProfile = async (req, res)=>{
    let id = req.params.id,
    guide = await  guideModel.getGuide(id);
    if ((guide == undefined) || (guide == null) || ((guide.visible==0 || guide.visible==1) && !req.session.admin))
        res.redirect('/error/404/');
    else
        res.render('guideView.html',{
            guide: guide,
            places: guide.places
        });
}