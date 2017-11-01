const mongoose = require('./../../server').mongoose,

// схема данных - задает структуру объекта, хранимого в БД
guideSchema = mongoose.Schema({
    name: {
        type: String,
        default: 'Михаил'
    },
    surname: {
        type: String, 
        default:'Иванов'
    },
    age: {
        type: Number,
        default: 18
    },
    email: {
        type: String,
        default: 'eyeguide@gmail.com'
    },
    phone: {
        type: String,
        default: '8 (900) 500 10 50'
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
