const mongoose = require('./../../server').mongoose,
    guideModel = require('./guide').guideModel,
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
    city: String,
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
     * @param {Object} placeData - информация о месте
     */
    addPlace: async function (placeData) {
        let newPlace = new this(placeData);
        return await newPlace.save();
    },
    /**
     * Заправшиваем из БД место по id
     * @param {ObjectId} placeId
     */
    getPlace: async function(placeId){        
        return await this.findById(placeId).populate('guides');
    },
    /**
     * Запрашиваем из БД места по критериям
     * @param {[Object]} args (критерии поиска)
     */
    getPlaces: async function(...args) {
        let query = this.find();

        //парсим аргументы и cоставляем query
        args.map(arg => {
            let argKey = Object.keys(arg)[0];
            switch(argKey){
                //FIXME: поиск без учета регистра
                case 'city': query.where('city').equals(arg.city);
                    break;
                case 'limit': query.limit(arg.limit);
                    break;
                case '_id': query.where('_id').in(arg._id);
                    break;
                //TODO: остальные криетрии поиска
            }
        })

        let places = await query.populate('guides');

        return places;
    },
    /**
     * Перевод списка мест
     * @param {[Object]} places
     * @param {String} lang
     */
    trnsPlaces: async function(places, lang){
        for(let i=0; i<places.length; i++){
            await places[0].trnsPlace(lang)
        }
        return places;
    }
}

placeSchema.methods = {
    /**
     * @param {String} lang
     */
    trnsPlace: async function(lang){
        this.name = await trnsModel.translitWord(this.name, lang),
        this.description = await trnsModel.translateText(this.description, lang);
                
        return this;  
    } 
}

let placeModel = mongoose.model('place', placeSchema);
module.exports.placeModel = placeModel;