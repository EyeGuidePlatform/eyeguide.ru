const   guideModel = require('../models/guide').guideModel,
        mongoose = require('./../../server').mongoose;

        exports.getProfilePage = (req, res) => {
            
            // let guide = new guideModel();
            // guide.name = 'Ivan';
            // guide.age = 10;
            // guide.info = {
            //     spec: 'Гид-экскурсовод',
            //     types: ['Пешеходные', 'Автобусные'],
            //     lang: ['Русский'],
            //     hours: 200,
            //     tours: 30, 
            //     happy: 30
            // };
        

            guideModel.findById({_id: req.params.id}, (err, guides) => {
                res.render('gid_profile.html', {guides: guides})
            });


            //сохраняем в БД новый объект
            // guide.save();
        
            //выводим в консоль одного человека с таким же возрастом
            // guide.findOnePersonWithThisAge((err, result) => {
            //     console.log(result);
            // });
        
            //выводим в формате json всех пользователей с таким же именем, как у только что созданного
            // guide.findAllPersonWithThisName((err, result) => {
            //     res.json(result);
            // });
            
            // guide.findById({_id: req.params.id}).then( gid => {
            //     res.render('gid_profile.html', {
            //         name: gid.name
            //     })
            // })
    
        }
        