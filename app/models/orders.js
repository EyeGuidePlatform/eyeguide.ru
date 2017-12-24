<<<<<<< HEAD
const mongoose = require('./../../server').mongoose;
const domain = require('../../config').domain;
const emailModel = require('../models/email');
const guideModel = require('./guide').guideModel;
=======
const mongoose = require('./../../server').mongoose,
    guideModel = require('./guide').guideModel;
>>>>>>> origin/jz_fin_fixes

orderSchema = mongoose.Schema({
    status: Number, // 0 - подана заявка, 1 - принята гидом, 3 - экскурсия завершена
    tourist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tourist'
    },
    mark: Number,
    excursion: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'excursion'
    },
    people: Number,
    date: Date,
    time: String,
    price: Number,
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place'
    }
});


orderSchema.statics = {
    getOrder: async function(orderId){
        return await this.findById(orderId).populate('excursion').populate('tourist');
    },

    getStatus: async function(order){
        switch(order.status){
            case(0) : return await 'Подана заявка';
            case(1) : return await 'Принята гидом';
            case(2) : return await 'Экскурсия завершена';
        }
    },

    regOrder: async function (orderData, exc) {
        const newOrder = new this(orderData);
        newOrder.status = 0;
        newOrder.excursion = exc;
        return await newOrder.save();
    },

    getOrders: async function(...args) {
        let query = this.find();

        //парсим аргументы и cоставляем query
        args.map(arg => {
            let argKey = Object.keys(arg)[0];
            switch(argKey){
                case 'guideId': query.where('status').equals(arg.guideId);
                    break;
                //TODO: остальные криетрии поиска
            }
        });

        let orders = await query.populate('excursions');

        return orders;
    }
}

orderSchema.pre('save', async function(next){

    let order = this.populate('excursions');
    let guide = await guideModel.getGuide(order.excursion.guide);

    let message = {
        text: '',
        from: 'no-reply <eyeguidetest@gmail.com>',
        to: '',
        subject: 'Новая информация о заказе',
        attachment: [
            {
                data:'',
                alternative: true
            }
        ]
    };
    switch (this.status) {
        case 0:
            message.attachment[0].data = `<html>
            <p>Вы получили новый заказ!</p>
            <a href="${domain}/guideOrders">Информация о заказе</a>
            </html>`;
            message.to = guide.name + ' <' + guide.email + '>';
        break;
        case 1:
            message.attachment[0].data = `<html>
                <p>Гид принял Ваш заказ. Дождитесь его звонка!</p>
                <a href="${domain}/order/${this._id}">Информация о заказе</a>
                </html>`;
            message.to = this.tourist.name + ' <' + this.tourist.email + '>';
        break;
        case 2:
            if (!order.mark) 
                break;
                
            await guide.computeRating();
        break;
        case 4:
            message.attachment[0].data = `<html>
            <p>Гид отменил экскурсию!</p>
            <a href="${domain}/order/${this._id}">Информация о заказе</a>
            </html>`;
            message.to = this.tourist.name + ' <' + this.tourist.email + '>';
        break;
        case 5:
            message.attachment[0].data = `<html>
            <p>Турист отменил свой заказ!</p>
            <a href="${domain}/guideOrders">Информация о заказе</a>
            </html>`;
            message.to = guide.name + ' <' + guide.email + '>';
        break;        
    }

    if(message.to!='')
        emailModel.sendEmail(message);
    
    next();
})

let orderModel = mongoose.model('order', orderSchema);
module.exports.orderModel = orderModel;