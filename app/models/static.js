const mongoose = require('./../../server').mongoose;


let staticSchema = mongoose.Schema({
    userLang: String,
    cities: [String],
    langs: [String],
    //etc
});

staticSchema.statics = {
    getLangs: async function(){
        let static = await this.findOne();
        return static.langs;
    },
    getCities: async function(userLang){
        let static = await this.findOne({userLang: userLang});
        return static.cities;
    }
}

let staticModel = mongoose.model('static', staticSchema);
module.exports.staticModel = staticModel;