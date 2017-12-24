const mongoose = require('./../../server').mongoose;

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

let orderModel = mongoose.model('order', orderSchema);
module.exports.orderModel = orderModel;