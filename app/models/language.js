const mongoose = require('./../../server').mongoose;


languageSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    name: String
});

languageSchema.statics = {
    getLang: async function (langCode) {
        return await this.findOne({code: langCode});
    },

    getLangs: async function () {
        return await this.find();
    }
}

let languageModel = mongoose.model('language', languageSchema);
module.exports.languageModel = languageModel;