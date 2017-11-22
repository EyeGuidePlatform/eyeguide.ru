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
    }
}
let exModel = mongoose.model('excursion', excursionSchema);
module.exports.exModel = exModel;