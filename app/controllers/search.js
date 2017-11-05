/**
 * Страница "Поиск"
 */

const   placeModel = require('../models/place').placeModel,
        guideModel = require('../models/guide').guideModel;

exports.getSearchPage = (req, res) => {
    placeModel.find({}).then( places => {
        guideModel.find({}).then( guides => {
            res.render('search.html', {
                guides: guides, 
                places: places, 
            });
        });
    });
}