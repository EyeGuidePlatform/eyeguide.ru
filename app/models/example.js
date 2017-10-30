const mongoose = require('./../../server').mongoose,

// схема данных - задает структуру объекта, хранимого в БД
personSchema = mongoose.Schema({
    name: String,
    surname: {
        type: String, 
        default:'Иванов'
    },
    age: Number,
    childrens: [{
        name: String,
        age: {
            type: Number, 
            default:0
        }
    }]
});

// методы применимые к созданному объекту
personSchema.methods = {
    findAllPersonWithThisName: function (err){
        return personModel.find({name: this.name}, err);
    },
    findOnePersonWithThisAge: function (err){
        return personModel.findOne({age: this.age}, err);
    }
}

// модель данных и ее экспорт
let personModel = mongoose.model('person', personSchema);
module.exports.personModel = personModel;
