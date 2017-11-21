const orderModel = require('../models/orders').orderModel;


exports.getOrderStatus = async (req, res) => {
    let orderId = req.params.id,
        order = await orderModel.getOrder(orderId),
        status = await orderModel.getStatus(order),
        checkCase = await orderModel.getCase(order);

        orderModel.getCase(order);
    res.render('orderStatus.html', {
        order: order,
        status: status
    });
};