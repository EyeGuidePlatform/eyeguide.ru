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
    getCities: async function(userLang, name){
        let static = await this.findOne({
            userLang: userLang,
        });

        if (name) {
            static = static.cities.filter((city) => {
                city = city.toLowerCase();

                if (city.indexOf(name.toLowerCase()) != -1) return true;
    
                return false;
            });
        } else {
            static = static.cities;
        }

        return static;
    }
}

let staticModel = mongoose.model('static', staticSchema);
module.exports.staticModel = staticModel;