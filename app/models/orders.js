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
    price: Number,
});


orderSchema.statics = {
    getOrder: async function(orderId){
        return await this.findById(orderId);
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
        newOrder.excursion = exc;
        return await newOrder.save();
    }
}

let orderModel = mongoose.model('order', orderSchema);
module.exports.orderModel = orderModel;