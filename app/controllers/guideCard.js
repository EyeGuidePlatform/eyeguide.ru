const placeModel = require('../models/place').placeModel;
const guideModel = require('../models/guide').guideModel;
const exModel = require('../models/excursions').exModel;

/**
 * Страница "Место"
 * @param {String} place
 */
exports.getProfile = async (req, res)=>{
    let id = req.params.id,
    guide = await  guideModel.getGuide(id);
    if ((guide == undefined) || (guide == null) || ((guide.visible==0 || guide.visible==1) && !req.session.admin))
        res.redirect('/error/404/');
    else{
        let eXs = await exModel.getExs({guideId:id});
        res.render('guideView.html',{
            place: guide.place,
            guide,
            eXs
        });
    }
}