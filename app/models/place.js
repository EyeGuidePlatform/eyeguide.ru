const mongoose = require('./../../server').mongoose,
    guideModel = require('./guide').guideModel;

placeSchema = mongoose.Schema({
    lang: {
        type: String,
        default: 'ru'
    },
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
                case 'not': query.where('_id').nin(arg.not);
                    break;
                case 'visible': query.where('visible').equals(arg.visible);
                    break;
                case 'guides': query.where('guides').in(arg.guides);
                    break;
                case 'select': query.select(arg.select);
                    break;
                //TODO: остальные криетрии поиска
            }
        })

        let places = await query.populate('guides');

        return places;
    },

    editPlace: async function (placeId, placeData) {
        const editPlace = await this.findByIdAndUpdate(placeId, placeData);
        return editPlace;
    },

    removePlace: async function (placeId) {
        await this.findByIdAndRemove(placeId);
    }
}

let placeModel = mongoose.model('place', placeSchema);
module.exports.placeModel = placeModel;