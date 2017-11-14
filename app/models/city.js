const mongoose = require('./../../server').mongoose;


let citySchema = mongoose.Schema({
    name: String
});

citySchema.statics = {
    getCity: async function (cityName) {
        return await this.findOne({name: cityName});
    },

    getCities: async function() {
        return await this.find();
    }
}

let cityModel = mongoose.model('city', citySchema);
module.exports.cityModel = cityModel;