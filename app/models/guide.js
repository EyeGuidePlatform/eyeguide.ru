const mongoose = require('./../../server').mongoose,
    toHash = require('md5'),
    placeModel = require('./place').placeModel,
    exModel = require('./excursions').exModel

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
        default: ''
    },
    age: {
        type: Number,
        default: 0
    },
    city: [String],
    phone: {
        type: String,
        default: 'телефон отсутствует'
    },
    img: {
        type: String,
        default: 'http://dummyimage.com/300'
    },
    car: {
        type: Boolean,
        default: false
    },
    info: {
        spec: [String],
        types: [String],
        lang: [String],
        hours: Number,
        tours: Number,
        happy: Number,
    },
    weekends: [Date],
    places: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'place'
        }
    ],
    excursions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'excursion'
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order'
    }],
    description: [{
        status: {
            type: Number, 
            default: 0
        },
        lang: String,
        value: String,
        onModerate: String
    }],
    rating: {
        type: Number,
        default: 4.5
    }
});


guideSchema.statics = {
    /**
     * Добавление нового гида в бд
     * @param guideData - информация о гиде
     */
    addGuide: async function (guideData) {
        let newGuide = new this(guideData);
        newGuide.password = toHash(guideData.password);

        return await newGuide.save();
    },
    /**
     * Добавление в гида выбранное место
     * @param guideId - айди гида
     * @param placeId - айди места
     */
    addPlaceInGuide: async function (guideId, placeId) {
        let placeModel = require('./place').placeModel;
        let guide = await this.getGuide(guideId);
        let place = await placeModel.getPlace(placeId);
        // добавление в место гида 
        place.guides.push(guide)
        await place.save()
        // добавление в гида место
        guide.places.push(place)
        return await guide.save();
    },
    /**
     * Добавление в гида выбранную экскурсию
     * @param guideId - айди гида
     * @param ex - экскурсия
     */
    addExInGuide: async function (ex, guideId) {
        let guide = await this.getGuide(guideId);
        guide.excursions.push(ex)
        return await guide.save();
    },
    /** ОПАСНО ДЛЯ ГИДА, НЕ ТРОГАТЬ!
     * Обнуление у гида ВСЕХ экскурсий
     * @param guideId - айди гида
     */
    RemoveALLExFromGuide: async function (guideId) {
        let guide = await this.getGuide(guideId);

        guide.excursions = [];

        return await guide.save();
    },
    /**
     * Удаление у гида выбранного места и экскурсий места
     * @param guideId - айди гида
     * @param placeId - айди места
     */
    removePlaceFromGuide: async function (guideId, placeId) {
        let placeModel = require('./place').placeModel;
        let guide = await guideModel.getGuide(guideId);
        let place = await placeModel.getPlace(placeId);
        let exs = await exModel.getExs({ guideId: guideId }, { place: placeId });

        await exs.forEach(element => element.remove());

        const [exdata] = exs
        guide.excursions = await guide.excursions.filter(ex => ex._id != exdata._id)
        
        place.guides = await place.guides.filter(guide => guide._id != guideId);
        await place.save()

        guide.places = await guide.places.filter(place => place._id != placeId);
        return await guide.save();
    },
    /**
     * Проверяем введенные данные для аутентификации
     * @param {Object} guideData
     */
    checkGuide: async function (guideData) {
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
    getGuide: async function (guideId, locale = 'ru') {
        let guide = await this.findById(guideId)
            .populate('places')
            .populate('excursions')
            .populate({
                path: 'orders',
                populate: [
                    {
                        path: 'excursion'
                    },
                    {
                        path: 'tourist'
                    },
                    {
                        path: 'place'
                    }
                ]
            });

        guide.description = guide.description.find(desc => desc.lang == locale);
        return guide;
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
    getGuides: async function (...args) {
        let query = this.find(),
            populate = true;

        //парсим аргументы и cоставляем query
        args.map(async arg => {
            let argKey = Object.keys(arg)[0];
            switch (argKey) {
                //FIXME: поиск без учета регистра
                case 'city':
                    if (!arg.city) break;

                    query.where({'city': {$regex: arg.city, $options:'i'}});

                    break;
                case 'limit': query.limit(arg.limit);
                    break;
                case 'select': query.select(arg.select);
                    break;
                case 'places':
                    if (!arg.places) break;

                    query.where('places').in(arg.places);

                    break;
                case 'lang':
                    if (!arg.lang) break;

                    query.where('info.lang').in(arg.lang);

                    break;
                case 'visible':
                    query.where('visible').equals(arg.visible);
                    break;

                case 'page':
                    query.skip((arg.page - 1)*9).limit(9);

                    break;

                case 'noPopulate':
                    populate = false;

                    break;

                case 'rating':
                    query.sort({rating: arg.rating});

                    break;

                case 'onModerate':
                    query.where('description.status').equals(1);
                    break;

                case 'car':
                    if(arg.car)
                        query.where('car').equals(arg.car);

                    break;
                //TODO: остальные криетрии поиска
            }
        });

        let guides;
        if (populate) {
            guides = await query.populate('places');
        } else {
            guides = await query.exec();
        }

        return guides;
    },

    editGuide: async function (guideId, guideData) {
        guideData.car = guideData.car==='on' ? true: false;
        const editGuide = await this.findByIdAndUpdate(guideId, guideData);
        return editGuide;
    },

    removeGuide: async function (guideId) {
        await this.findByIdAndRemove(guideId);
    },

    addWeekends: async function(weekendsData, guideId) {
        let guide = await this.findById(guideId);
        guide.weekends = weekendsData;
        guide.save();
    },

    getWeekends: async function(guideId){
        let guide = await this.findById(guideId);
        return guide.weekends;
    }
}

guideSchema.methods = {
    genEmailConfirmURL: async function () {
        const url = toHash(this._id + this.email);
        this.activate = url;
        await this.save();

        return require('../../config').domain + '/activate/' + url;
    },
    computeRating: async function () {
        let guide = await this.populate('orders'),
            newRating = 0,
            count = 0;

        guide.orders.forEach((order) => {
            if (order.mark) {
                newRating += order.mark;
                count++;
            }
        });

        if (count) {
            newRating /= count;
            guide.rating = newRating;
    
            await guide.save();
        }
    }
}

// модель данных и ее экспорт
let guideModel = mongoose.model('guide', guideSchema);
module.exports.guideModel = guideModel;
