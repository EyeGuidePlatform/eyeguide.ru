const mongoose = require('./../../server').mongoose;


let citySchema = mongoose.Schema({
    name: String
});

let cityModel = mongoose.model('city', citySchema);
module.exports.cityModel = cityModel;