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

exports.getSearchPageGuides = async (req,res) => {
    guides = await guideModel.getGuides({limit: 9})

    res.render('searchGuides.html', {
        guides: guides
    })
}

exports.getSearchPagePlaces = async (req,res) => {
    places = await placeModel.getPlaces({limit: 9})

    res.render('searchPlaces.html', {
        places: places
    })
}