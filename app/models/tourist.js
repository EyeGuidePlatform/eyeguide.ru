const mongoose = require('../../server').mongoose,
    emailModel = require('../models/email');
    toHash = require('md5');

touristSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    password: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order'
        }
    ]
});

touristSchema.statics = {
    regTourist: async function (touristData) {
        const newTourist = new this(touristData);
        newTourist.password = await newTourist.genPassword()
        return await newTourist.save();
    }
}

touristSchema.methods = {
    genPassword: function () {
        const randomString = Math.random().toString(36).slice(-8);
        this.password = toHash(randomString);

        return randomString;
    },
    sendEmail: function (orderId) {
        let domain = require('../../config').domain;
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
                        <a href="${domain}/order/${orderId}">Информация о заказе</a>
                        <p>Пароль для входа:</p>
                        <p>${tourist.password}</p>
                    </html>   
                    `,
                    alternative: true
                }
            ]
        };

        emailModel.sendEmail(message);
    }
}

const touristModel = mongoose.model('tourist', touristSchema);
module.exports.touristModel = touristModel;