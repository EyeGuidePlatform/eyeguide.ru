const placeModel = require('../models/place').placeModel,
    guideModel = require('../models/guide').guideModel;

/**
 * Переход к карте после ввода города на главной
 * @param {String} city
 */
exports.parseCity = (req, res) => {
    let city = req.body.city;

    res.redirect('/map/' + city);
}

/**
 * Страница "Карта"
 * @param {String} city
 */
exports.getCityPage = async (req, res) => {
    let city = req.params.city;

    let places = await placeModel.getPlaces({limit: 6}, {city: city}, {visible: 1}),
        guides = await guideModel.getGuides({city: city});

    if (!guides.length) {
        const place = await placeModel.getPlaceByName(city);
        
        if (place) {
            return res.redirect('/place/' + place._id);
        }

        return res.render('404notfound.html', {error: 'Ничего не найдено'});
    }

    guides = shuffle(guides).slice(0, 6);

    res.render('map.html', {
        guides: guides, 
        places: places,
        lang: req.locale,
        city: city
    });
}

function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
