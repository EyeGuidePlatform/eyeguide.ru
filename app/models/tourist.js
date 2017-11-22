const mongoose = require('../../server').mongoose;

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

const touristModel = mongoose.model('tourist', touristSchema);
module.exports.touristModel = touristModel;