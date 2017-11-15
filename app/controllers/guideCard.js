const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;




/**
 * Страница "Место"
 * @param {String} place
 */
exports.getProfile= async (req, res)=>{
    let id = req.params.id,
    guide = await  guideModel.findById(id),
    places = await placeModel.findById(guide.places);
    console.log(guide);
    // console.log(places);
    res.render('guideView.html',{
        guide:guide,
        places:places
    });
}



// exports.getProfile = (req, res) => {
//     let id = req.params.id;
//     guideModel.findById(id).then( guide => {
//         let query;
//         placeModel.find({}).then( places => {
//             res.render('guideView.html', {
//                 guide: guide, 
//                 places: places
//             });
//             console.log(guide);
//         });
//     });
// }