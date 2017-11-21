const orderModel = require('../models/orders').orderModel;


exports.getOrderStatus = async (req, res) => {
    let id = req.params.id,
        orders = await orderModel.getOrders();
        console.log(orders);
    res.render('orderStatus.html');
};