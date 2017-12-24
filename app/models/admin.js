const mongoose = require('./../../server').mongoose,
    toHash = require('md5'),

adminSchema = mongoose.Schema({
    username : {
        type: String,
        unique: true,
        required: true
    },
    password : {
        type: String,
        required: true
    }
});

adminSchema.statics = {
    createAdmin: function(adminData){
        let admin = {
            username: adminData.username,
            password: toHash(adminData.password)
        }
        let _model = mongoose.model('admin', adminSchema);
        return new _model(admin).save();
    },
    getAdmin: async function(id){
        return await mongoose.model('admin', adminSchema).findById(id);
    },
    checkAdmin: async function(adminData){
        let foundUser = await mongoose.model('admin', adminSchema).findOne({username: adminData.username});
        foundUser = (foundUser.password == toHash(adminData.password)) ? foundUser : null;
        return foundUser;
    }
}

let adminModel = mongoose.model('admin', adminSchema);
module.exports.adminModel = adminModel;