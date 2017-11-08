//TODO убрать заглушки!
const placeModel = require('../models/place').placeModel,
guideModel = require('../models/guide').guideModel;

exports.getProfile = (req, res) => { 
    // let guides = guideModel.find({_id: parseInt(req.params.id)}).then
    // (res.render('guideView.html', {guides: guides[_id], places: places[_id]}));
    let guides = [{
            id: 1, 
            name: 'Светлана Сладкова',
            img: '../img/guides/guide1.jpg',
            info: {
                spec:'Гид-экскурсовод',
                types:'Пешеходные, автобусные',
                languages:'Русский',
                hours: 200,
                made: 30,
                happy: 30
            },
            desc: "Описание Светланы"
        },
        {
            id: 2, 
            name: 'Зинаида Петровна',
            img: '../img/guides/guide2.jpg',
            info: {
                spec:'Гид-экскурсовод',
                types:'Пешеходные',
                languages:'Русский',
                hours: 212,
                made: 143,
                happy: 234
            },
            desc: "Описание Зинаиды"
        },
        {
            id: 3, 
            name: 'Елена Полено',
            img: '../img/guides/guide3.jpg',
            info: {
                spec:'Гид-экскурсовод',
                types:'Автобусные',
                languages:'Английский',
                hours: 512,
                made: 128,
                happy: 51
            },
            desc: "Описание Елены"
        }
    ];

    let places = [
        {
            id: 1, 
            name: 'Александровский сад',
            img: '../img/places/alexander.jpg',
            info: 'Какой-то там сад.'
        },
        {
            id: 2, 
            name: 'Ботанический сад МГУ',
            img: '../img/places/botanic.jpg',
            info: 'Какой-то там сад.'
        },
        {
            id: 3, 
            name: 'Кремль',
            img: '../img/places/kremlin.jpg',
            info: 'Какие-то там башни.'
        }
    ];
    
    res.render('guideView.html', {guides: guides[parseInt(req.params.id)], places: places[parseInt(req.params.id)]});
}