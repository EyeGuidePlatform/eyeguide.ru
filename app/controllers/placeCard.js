const placeModel = require('../models/place').placeModel;
const guideModel = require('../models/guide').guideModel;
const exModel = require('../models/excursions').exModel;




/**
 * Страница "Место"
 * @param {String} place
 */


 exports.getPlacePage = async (req, res) => {
    let id = req.params.id,
        place = await placeModel.getPlace(id);
    if ((place == undefined) || (place == null))
        res.redirect('/error/404');
    else {
        let eXs = await exModel.getExs({place:id});
        eXs = shuffle(eXs);
        res.render('place.html', {
            eXs, 
            place: place,
            domain: require('./../../config').domain
        });
    }
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}










 



