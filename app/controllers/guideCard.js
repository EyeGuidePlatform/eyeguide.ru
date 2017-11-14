const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;




/**
 * Страница "Место"
 * @param {String} place
 */
exports.getProfile= async (req, res)=>{
    let id = req.params.id,
    guide = await  guideModel.findById(id);
    console.log(guide);
    res.render('guideView.html',{
        guide:guide
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