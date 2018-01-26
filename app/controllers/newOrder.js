const guideModel = require('../models/guide').guideModel,
    placeModel = require('../models/place').placeModel,
    touristModel = require('../models/tourist').touristModel,
    orderModel = require('../models/orders').orderModel,
    exModel = require('../models/excursions').exModel,
    emailModel = require('../models/email');



exports.getNewOrderPage = async (req, res) => {
    if (req.body.guideId) {
        let guide = await guideModel.getGuide(req.body.guideId)
        res.render('new_orderG.html', {guide: guide})
    }
    if (req.body.placeId) {
        let place = await placeModel.getPlace(req.body.placeId)
        res.render('new_orderP.html', {place: place})
    }
}

exports.createOrder = async (req, res) => {

    if (!req.recaptcha.error) {
    const tourist = await touristModel.regTourist(req.body);
    const place = await placeModel.getPlace(req.body.placeId);
    const exc = await exModel.getExs({place: req.body.placeId}, {guideId: req.body.guideId});
    const [excData] = exc
    const order = await orderModel.regOrder(req.body, excData);
    res.send(order._id);
    //save in tourist new order
    tourist.orders.push(order);
    await tourist.save()
    // save in order our tourist 
    order.place = place
    order.tourist = tourist
    order.status = 0;
    await order.save()
    // save order in guide
    const guide = await guideModel.getGuide(req.body.guideId)
    guide.orders.push(order);
    await guide.save()

        return tourist;
    }
    else 
        return null;
}
