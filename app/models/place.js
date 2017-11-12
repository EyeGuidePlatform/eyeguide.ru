const mongoose = require('./../../server').mongoose,
    trnsModel = require('./translater');

placeSchema = mongoose.Schema({
    visible: {
        type: Number, 
        default: 0 // 0 - на модерации, 1 - одобрено, 2 - откланено
    },
    name: String,
    description: String,
    city: String,
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
    },
    getPlace: async function(placeId, lang){
        let place = await mongoose.model('place', placeSchema).findById(placeId),
            name = await trnsModel.translitWord(place.name, lang),
            description = await trnsModel.translateText(place.description, lang);

        place.description = description;
        place.name = name;
                
        return place;  
    },
    getPlaces: async function(lang) {
        let places = await mongoose.model('place', placeSchema).find({});
        
        for(let place of places) {
            place.name = await trnsModel.translitWord(place.name, lang);
            place.description = await trnsModel.translateText(place.description, lang);
        };

        return places;
    }
}

let placeModel = mongoose.model('place', placeSchema);
module.exports.placeModel = placeModel;