//TODO убрать заглушки!
const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;

exports.getProfile = (req, res) => { 
    let id = Math.floor(req.params.id);
    guideModel.findById(id).then((err,guides)=>{
       placeModel.find ({}).then(places=>{
           res.render('guideView.html',{
               guides:guide,
               places:place
           });
       });
    });
    
    // res.render('guideView.html', {guides: guides[parseInt(req.params.id)], places: places[parseInt(req.params.id)]});
}