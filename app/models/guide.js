const mongoose = require('./../../server').mongoose,
    placeModel = require('./place').placeModel,
    trnsModel = require('./translater');

// схема данных - задает структуру объекта, хранимого в БД
guideSchema = mongoose.Schema({
    visible: {
        type: Number, 
        default: 0 // 0 - на модерации, 1 - одобрен, 2 - откланен
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
    email: {
        type: String,
        default: 'email отсутствует'
    },
    phone: {
        type: String,
        default: 'телефон отсутствует'
    },
    city: String,
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
 
        //Добавить каждому выбранному месту нового гида
        //FIXME: одним запросом всех!
        newGuide.places.forEach( placeId => {
            placeModel.findById( placeId ).then( foundPlace => {
                foundPlace.guides.push( newGuide );
                foundPlace.save();
            });
        });

        newGuide.save().then(cb);
    },
    /**
     * Заправшиваем из БД гида по id
     * @param {ObjectId} guideId
     */
    getGuide: async function (guideId) {
        return await this.findById(guideId).populate('places');
    },
    /**
     * Запрашиваем из БД гидов по критериям
     * @param {[Object]} args (критерии поиска)
     */
    getGuides: async function(...args) {
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
                //TODO: остальные криетрии поиска
            }
        })

        let guides = await query.populate('places');
        
        return guides
    },
    /**
     * Перевод списка гидов
     * @param {[Object]} guides
     * @param {String} lang
     */
    trnsGuides: async function(guides, lang){
        for(let i=0; i<guides.length; i++){
            await guides[0].trnsGuide(lang)
        }
        return guides;
    }
}

guideSchema.methods = {
    /**
     * Перевод данных гида
     * @param {String} lang
     */
    trnsGuide: async function (lang) {
        this.name = await trnsModel.translitWord(this.name, lang);
        this.surname = await trnsModel.translitWord(this.surname, lang);
        //TODO: info
                
        return guide;  
    }
}

// модель данных и ее экспорт
let guideModel = mongoose.model('guide', guideSchema);
module.exports.guideModel = guideModel;
