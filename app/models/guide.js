const mongoose = require('./../../server').mongoose,
    toHash = require('md5'),
    placeModel = require('./place').placeModel,
    trnsModel = require('./translater');

// схема данных - задает структуру объекта, хранимого в БД
guideSchema = mongoose.Schema({
    visible: {
        type: Number, 
        default: 0 // 0 - не подтверждена почта, 1 - на модерации, 2 - одобрен, 3 - откланен
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    activate: String,
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
    city: String,
    img: {
        type: String,
        default: 'http://dummyimage.com/300'
    },
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
    addGuide: async function (guideData) {
        let newGuide = new this(guideData);
        newGuide.password = toHash(guideData.password);

        //Добавить каждому выбранному месту нового гида
        let placeModel = require('./place').placeModel;
        let places = await placeModel.getPlaces({ _id: newGuide.places });
        for(let i = 0; i < places.length; i++) {
            places[i].guides.push(newGuide);
            await places[i].save();
        }
        
        return await newGuide.save();
    },
    /**
     * Добавление в гида выбранное место
     * @param guideId - айди гида
     * @param placeId - айди места
     */
    addPlaceInGuide: async function (guideId ,placeId) {
        let placeModel = require('./place').placeModel;

        let guide = await guideModel.getGuide(guideId);
        let place = await placeModel.getPlace(placeId);

        guide.places.push(place)

        return await guide.save();
    },
    /**
     * Удаление у гида выбранного места
     * @param guideId - айди гида
     * @param placeId - айди места
     */
    removePlaceFromGuide: async function (guideId, placeId) {
        let placeModel = require('./place').placeModel;

        let guide = await guideModel.getGuide(guideId);
        let place = await placeModel.getPlace(placeId);

        guide.places = await guide.places.filter( place => place._id != placeId)

        return await guide.save();
    },
    /**
     * Проверяем введенные данные для аутентификации
     * @param {Object} guideData
     */
    checkGuide: async function(guideData){
        const foundUser = await this.findOne({
            email: guideData.email, 
            password: toHash(guideData.password)
        });
        return foundUser;
    },
    /**
     * Заправшиваем из БД гида по id
     * @param {ObjectId} guideId
     */
    getGuide: async function (guideId) {
        return await this.findById(guideId).populate('places');
    },
    /**
     * Запрашиваем из БД гида по id (список мест в виде id)
     * @param {ObjectId} guideId
     */
    getThisGuide: async function (guideId) {
        return await this.findById(guideId);
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
        });

        let guides = await query.populate('places');
        
        return guides;
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
                
        return this;  
    },
    genEmailConfirmURL: async function () {
        const url = toHash(this._id + this.email);
        this.activate = url;
        await this.save();

        return 'http://localhost:8080/activate/' + url;
    }
}

// модель данных и ее экспорт
let guideModel = mongoose.model('guide', guideSchema);
module.exports.guideModel = guideModel;
