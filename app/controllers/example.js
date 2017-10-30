const personModel = require('../models/example').personModel,
    mongoose = require('./../../server').mongoose;

exports.example = (req, res) => {
    let person = new personModel();

    person.name = 'Ivan';
    person.age = 10;
    person.child = [{name:'Petya', age:7}];

    //сохраняем в БД новый объект
    //person.save();

    //выводим в консоль одного человека с таким же возрастом
    person.findOnePersonWithThisAge((err, result) => {
        console.log(result);
    });

    //выводим в формате json всех пользователей с таким же именем, как у только что созданного
    person.findAllPersonWithThisName((err, result) => {
        res.json(result);
    });
}
