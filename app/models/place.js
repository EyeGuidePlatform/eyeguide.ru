const mongoose = require('./../../server').mongoose,
    trnsModel = require('./translater');

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
    }
});

placeSchema.statics = {
    getPlace: function(placeId, lang){
        //TODO в async/await
        return new Promise(function(resolve, reject){
            mongoose.model('place', placeSchema).findById(placeId).then( function(place, err){
                trnsModel.translitWord(place.name, lang)
                    .then(function (name) {
                        place.name = name;
                        return place;
                    })
                    .then(function (place) {
                        trnsModel.translateText(place.description, lang)
                            .then( function (description) {
                                place.description = description;
                                resolve(place);
                            });
                    });
            });
        });
    },
    getPlaces: function(lang) {
        //TODO
    }
}

let placeModel = mongoose.model('place', placeSchema);
module.exports.placeModel = placeModel;