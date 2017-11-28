const guideModel = require('../models/guide').guideModel,
    placeModel = require('../models/place').placeModel,
    touristModel = require('../models/tourist').touristModel,
    emailModel = require('../models/email');



exports.getNewOrderPage = async (req, res) => {
    // let id = req.body.guideId
        // guide = await placeModel.getGuide(id)

        let places = await placeModel.getPlaces()

    // res.render('new_order.html', {guide: guide})
    res.render('new_order.html', {places: places})
}

exports.createOrder = async (req, res) => {
    const tourist = await regTourist(req);

    res.redirect('/');


    async function regTourist (req) {
        let newTourist = req.body.tourist;

        let tourist = await touristModel.regTourist(newTourist);

        tourist.password = tourist.genPassword();

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
