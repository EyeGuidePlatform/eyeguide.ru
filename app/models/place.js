const mongoose = require('./../../server').mongoose;

placeSchema = mongoose.Schema({
    name: String,
    description: String,
    img: {
        type: String,
        default: 'http://dummyimage.com/300'
    },
    geo: {
        x: Number,
        y: Number
    }
});

let placeModel = mongoose.model('place', placeSchema);
module.exports.placeModel = placeModel;