/**
 * Страница "Поиск"
 */

const   placeModel = require('../models/place').placeModel,
        guideModel = require('../models/guide').guideModel;

exports.getSearchPage = async (req, res) => {
    places = await placeModel.getPlaces({limit: 6})
    guides = await guideModel.getGuides({limit: 6})
    res.render('search.html', {
        guides: guides,
        places: places
    });
}