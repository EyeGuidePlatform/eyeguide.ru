const mongoose = require('./../../server').mongoose,
    toHash = require('md5');

// схема данных - задает структуру объекта, хранимого в БД
guideSchema = mongoose.Schema({
    visible: {
        type: Number, 
        default: 0 // 0 - на модерации, 1 - одобрен, 2 - откланен
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
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
    city: String,
    phone: {
        type: String,
        default: 'телефон отсутствует'
    },
    img: String, 
    info: {
        spec: [String],
        types: [String],
        lang: [String],
        hours: Number,
        tours: Number,
        happy: Number,
    },
    places: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'place'
        }
    ]
});


guideSchema.statics = {
    /**
     * Добавление нового гида в бд
     * @param guideData - информация о гиде
     */
    addGuide: function (guideData, cb) {
        let newGuide = new this(guideData);
        newGuide.password = toHash(guideData.password);

        let placeModel = require('./place').placeModel;
        //Добавить каждому выбранному месту нового гида
        newGuide.places.forEach( placeId => {
            placeModel.findById( placeId ).then( foundPlace => {
                foundPlace.guides.push( newGuide );
                foundPlace.save();
            });
        });

        newGuide.save().then(cb);
    }
}
// модель данных и ее экспорт
let guideModel = mongoose.model('guide', guideSchema);
module.exports.guideModel = guideModel;
