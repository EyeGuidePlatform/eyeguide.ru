const guideModel = require('../models/guide').guideModel,
    placeModel = require('../models/place').placeModel,
    touristModel = require('../models/tourist').touristModel,
    orderModel = require('../models/orders').orderModel,
    exModel = require('../models/excursions').exModel,
    emailModel = require('../models/email')



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

    

    const tourist = await regTourist(req);
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
    await order.save()
    // save order in guide
    const guide = await guideModel.getGuide(req.body.guideId)
    guide.orders.push(order);
    await guide.save()
 
    //FIXME:
    async function regTourist (req) {

        let newTourist = req.body,
        tourist = await touristModel.regTourist(newTourist);

        const message = {
            text: 'Ваш пароль для просмотра информации о заказе экскурсии: \n' + tourist.password,
            from: 'no-reply <eyeguidetest@gmail.com>',
            to: tourist.name + ' <' + tourist.email + '>',
            subject: 'Информация о вашем заказе экскурсии',
            attachment: [
                {
                    data: 
                    `
                    <html>
                        <p>Информация о вашем заказе экскурсии доступна по ссылке ниже:</p>
                        <a href="#">Информация о заказе</a>
                        <p>Пароль для входа:</p>
                        <p>${tourist.password}</p>
                    </html>   
                    `,
                    alternative: true
                }
            ]
        };
        emailModel.sendEmail(message);

        return tourist;
    }
}
