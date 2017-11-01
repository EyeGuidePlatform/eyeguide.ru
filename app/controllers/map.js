const placeModel = require('../models/place').placeModel,
    mongoose = require('./../../server').mongoose;

exports.parseCity = (req, res) => {
    // let places = [
    //     {
    //         id: 1, 
    //         name: 'Красная площадь',
    //         imgUrl: 'img/red_square.jpg',
    //         info: 'Главная площадь Москвы, расположенная в центре радиально-кольцевой планировки города между Московским Кремлём и Китай-городом.'
    //     },
    //     {
    //         id: 2, 
    //         name: 'Парк Победы',
    //         imgUrl: 'img/park_pobedy.jpg',
    //         info: 'Один из крупнейших в России и в мире мемориальных комплексов, площадь которого 135 га, посвящен победе в Великой Отечественной войне.'
    //     },
    //     {
    //         id: 3, 
    //         name: 'Александровский сад',
    //         imgUrl: 'img/aleks.jpg',
    //         info: 'Парк в центре Москвы. Расположен с северо-западной стороны от стен Кремля на месте протекавшей здесь ранее реки Неглинной. Площадь сада около 10 гектаров.'
    //     }
    // ];

    // placeModel.create( {
    //     name: 'Пылало',
    //     description: 'ыаыпыпыпыпып',
    //     geo: {
    //         x: 34,
    //         y: 55
    //     }
    // } );

    let city = req.body.city;

    res.redirect('/map/' + city);
}

exports.getCityPage = (req, res) => {
    let city = req.params.city;

    let guides = [
        {
            id: 1, 
            name: 'Игорь',
            imgUrl: '../img/746.jpg',
            info: {
                hours: 120,
                made: 83,
                happy: 12
            }
        },
        {
            id: 2, 
            name: 'Наталья',
            imgUrl: '../img/4066.png',
            info: {
                hours: 230,
                made: 122,
                happy: 87
            }
        },
        {
            id: 3, 
            name: 'Алла',
            imgUrl: '/img/6053.jpg',
            info: {
                hours: 100,
                made: 60,
                happy: 20
            }
        }
    ];

    placeModel.find( {}, (err, places) => {
        res.render('map.html', {guides: guides, places: places, city: city});
    } );
}
