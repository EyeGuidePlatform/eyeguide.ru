const mongoose = require('./../../server').mongoose,

// схема данных - задает структуру объекта, хранимого в БД
guideSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    surname: {
        type: String, 
        default:''
    },
    age: {
        type: Number,
        default: 0
    },
    email: {
        type: String,
        default: 'email отсутствует'
    },
    phone: {
        type: String,
        default: 'телефон отсутствует'
    },
    img: String, 
    info: {
        spec: String,
        types: [String],
        lang: [String],
        hours: Number,
        tours: Number, 
        happy: Number,
    }
});


// модель данных и ее экспорт
let guideModel = mongoose.model('guide', guideSchema);
module.exports.guideModel = guideModel;
