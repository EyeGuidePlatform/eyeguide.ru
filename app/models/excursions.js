const mongoose = require('./../../server').mongoose,

excursionSchema = mongoose.Schema({
    conductedExc: {type: Number, default:0},
    totalMark: {type: Number, default:0},
    prices: [{
        price: Number,
        people: String
    }],
    lasting: Number,
    place: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'place'
    },
    guide: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'guide'
    }
});

excursionSchema.statics = {
    /**
     * Добавление экскурсии в гида
     * @param excursionData - информация об экскурсии
     */
    addExcursion: async function (excursionData, guideId) {
        let excursion = new this(excursionData)
        // await excursion.save()
        return await excursion.save();
    },
    /**
     * Заправшиваем из БД экскурсию по id
     * @param {ObjectId} exId
     */
    getEx: async function (exId) {
        return await this.findById(exId).populate('place').populate('guide');
    },
    /**
     * Заправшиваем из БД экскурсию по id
     * @param {ObjectId} exId
     */
    getExs: async function (...args) {
        let query = this.find();

        //парсим аргументы и cоставляем query
        args.map(arg => {
            let argKey = Object.keys(arg)[0];
            switch (argKey) {
                case 'place': query.where('place').equals(arg.place);
                    break;
                case 'guideId': query.where('guide').equals(arg.guideId);
                    break;
                case 'lastings': query.where('lasting').equals(arg.lastings);
                    break;
            }
        });

        let exs = await query.populate('place').populate('guide');

        return exs;
    }
}
let exModel = mongoose.model('excursion', excursionSchema);
module.exports.exModel = exModel;