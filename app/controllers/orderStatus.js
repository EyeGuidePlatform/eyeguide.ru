const orderModel = require('../models/orders').orderModel,
    placeModel = require('../models/place').placeModel,
    guideModel = require('../models/guide').guideModel,
    exModel = require('../models/excursions').exModel;

exports.getOrderStatus = async (req, res) => {
    let order = await orderModel.getOrder(req.params.id),
        place = await placeModel.getPlace(order.place),
        guide = await guideModel.getGuide(order.excursion.guide),
        excursion = await exModel.getEx(order.excursion.id);

        let _price;
        for (let i=0; i<excursion.prices.length; i++){
            if (order.people >= excursion.prices[i].people[0] && order.people <= excursion.prices[i].people[1]){
                _price = excursion.prices[i].price;
                break;
            }
        }
        if (order.people >= excursion.prices[excursion.prices.length-1].people[0] && excursion.prices[excursion.prices.length-1].people[1] == 0)
            _price = excursion.prices[excursion.prices.length-1].price;


    res.render('orderStatus.html', {
        place: place,
        order: order,
        guide: guide,
        price: _price
    });
};

exports.rateExcursion = async (req, res) => {
    let order = await orderModel.getOrder(req.params.id),
        guide = await guideModel.getGuide(order.excursion.guide);
    order.mark = req.body.star;
    if (order.mark === 5) {
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
    if (order.status === 0) order.status = 3;
    else if (order.status === 1) order.status = 5;
    await order.save();
    req.flash('error', 'Экскурсия отменена');
    res.redirect('/');
}
