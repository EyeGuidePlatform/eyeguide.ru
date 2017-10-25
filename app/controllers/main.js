const nunjucks = require('nunjucks');

exports.getPage = (req, res) => {
    res.render('view/main.html');
    
    let places = [
        {
            id: 1, 
            name: 'Красная площадь',
            imgUrl: 'img/red_square.jpg',
            info: 'Главная площадь Москвы, расположенная в центре радиально-кольцевой планировки города между Московским Кремлём и Китай-городом.'
        },
        {
            id: 2, 
            name: 'Парк Победы',
            imgUrl: 'img/park_pobedy.jpg',
            info: 'Один из крупнейших в России и в мире мемориальных комплексов, площадь которого 135 га, посвящен победе в Великой Отечественной войне.'
        },
        {
            id: 3, 
            name: 'Александровский сад',
            imgUrl: 'img/aleks.jpg',
            info: 'Парк в центре Москвы. Расположен с северо-западной стороны от стен Кремля на месте протекавшей здесь ранее реки Неглинной. Площадь сада около 10 гектаров.'
        }
    ];

 
}



