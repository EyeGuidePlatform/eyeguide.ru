const mongoose = require('./../../server').mongoose;

placeSchema = mongoose.Schema({
    visible: {
        type: Number, 
        default: 0 // 0 - на модерации, 1 - одобрено, 2 - откланено
    },
    name: String,
    description: String,
    img: {
        type: String,
        default: 'http://dummyimage.com/300'
    },
    geo: {
        x: Number,
        y: Number
    },
    guides: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'guide'
        }
    ]
});

placeSchema.statics = {
    /**
     * Добавление нового гида в бд
     * @param placeData - информация о месте
     */
    addPlace: function (placeData, cb) {
        let newPlace = new this(placeData);
        newPlace.save().then(cb);
    }
}

let placeModel = mongoose.model('place', placeSchema);
module.exports.placeModel = placeModel;