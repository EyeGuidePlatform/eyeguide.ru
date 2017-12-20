const orderModel = require('../models/orders').orderModel,
        placeModel = require('../models/place').placeModel;
        guideModel = require('../models/guide').guideModel;
        exModel = require('../models/excursions').exModel;

exports.getOrderStatus = async (req, res) => {
    let order = await orderModel.getOrder(req.params.id),
        place = await placeModel.getPlace(order.place),
        guide = await guideModel.getGuide(order.excursion.guide),
        excursion = await exModel.getEx(order.excursion.id);
    res.render('orderStatus.html', {
        place: place,
        order: order,
        guide: guide,
        price: excursion.prices[0].price
    });
};

exports.rateExcursion = async (req, res) => {
    let order = await orderModel.getOrder(req.params.id),
        guide = await guideModel.getGuide(order.excursion.guide);
    order.mark = req.body.star;
    if(order.mark === 5){
        guide.info.happy++;
        await guide.save();
    }
    await order.save();
    req.flash('success', 'Спасибо за оценку!');
    res.redirect('/');
}

exports.cancelExcursion = async (req, res) => {
    let order = await orderModel.getOrder(req.body._id);
    order.mark = 0;
    if(order.status === 0) order.status = 3;
    else if(order.status === 1) order.status = 5;
    console.log(order.mark);
    await order.save();
    req.flash('error', 'Экскурсия отменена');
    res.redirect('/');
}
