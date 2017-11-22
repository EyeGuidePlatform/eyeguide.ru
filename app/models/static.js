const mongoose = require('./../../server').mongoose;


let staticSchema = mongoose.Schema({
    userLang: String,
    cities: [String],
    langs: [
        {
            key: String,
            value: String
        }
    ]
    //etc
});

staticSchema.statics = {
    getLangs: async function(userLang){
        let static = await this.findOne({userLang: userLang});
        return static.langs;
    },
    getCities: async function(userLang){
        let static = await this.findOne({userLang: userLang});
        return static.cities;
    }
}

let staticModel = mongoose.model('static', staticSchema);
module.exports.staticModel = staticModel;