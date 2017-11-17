const mongoose = require('./../../server').mongoose,

excursionSchema = mongoose.Schema({
    conductedExc: Number,
    marks: [{
        tourist: mongoose.Schema.Types.ObjectId,
        mark: Number
    }],
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