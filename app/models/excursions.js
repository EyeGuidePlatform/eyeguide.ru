const mongoose = require('./../../server').mongoose,

excursionSchema = mongoose.Schema({
    conductedExc: {type: Number, default:0},
    totalMark: {type: Number, default:0},
    prices: [{
        price: Number,
        people: String
    }],
    lasting: Number,
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place'
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guide'
    }
});

let exModel = mongoose.model('excursion', excursionSchema);
module.exports.exModel = exModel;