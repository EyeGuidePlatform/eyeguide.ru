const mongoose = require('../../server').mongoose,
    toHash = require('md5');

touristSchema = mongoose.Schema({
    name: String,
    surname: String,
    email: String,
    phone: String,
    password: String,
    orders: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'order'
        }
    ]
});

touristSchema.statics = {
    regTourist: async function (touristData) {
        const newTourist = new this(touristData);
        newTourist.password = await newTourist.genPassword()
        return await newTourist.save();
    }
}

touristSchema.methods = {
    genPassword: function () {
        const randomString = Math.random().toString(36).slice(-8);
        this.password = toHash(randomString);

        return randomString;
    }
}

const touristModel = mongoose.model('tourist', touristSchema);
module.exports.touristModel = touristModel;