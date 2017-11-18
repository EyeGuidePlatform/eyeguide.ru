const guideModel = require('../models/guide').guideModel;
const placeModel = require('../models/place').placeModel;



exports.getNewOrderPage = async (req, res) => {
    // let id = req.body.guideId,
        // guide = await placeModel.getGuide(id)

        let places = await placeModel.getPlaces()

    // res.render('new_order.html', {guide: guide})
    res.render('new_order.html', {places: places})
}
