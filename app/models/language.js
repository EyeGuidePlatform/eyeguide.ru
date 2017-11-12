const mongoose = require('./../../server').mongoose;


languageSchema = mongoose.Schema({
    code: {
        type: String,
        unique: true
    },
    name: String
});

let languageModel = mongoose.model('language', languageSchema);
module.exports.languageModel = languageModel;