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
    getOrders: async function(){
        return await this.find();
    }
}

let orderModel = mongoose.model('order', orderSchema);
module.exports.orderModel = orderModel;