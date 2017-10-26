exports.getProfile = (req, res) => {
    let guides = [
        {
            id: 1, 
            name: 'Светлана Сладкова',
            img: '../img/guide1.jpg',
            info: {
                spec:'Гид-экскурсовод',
                types:'Пешеходные, автобусные',
                languages:'Русский',
                hours: 200,
                made: 30,
                happy: 30
            }
        },
        {
            id: 2, 
            name: 'Зинаида Петровна',
            img: '../img/guide2.jpg',
            info: {
                spec:'Гид-экскурсовод',
                types:'Пешеходные',
                languages:'Русский',
                hours: 212,
                made: 143,
                happy: 234
            }
        },
        {
            id: 3, 
            name: 'Елена Полено',
            img: '../img/guide3.jpg',
            info: {
                spec:'Гид-экскурсовод',
                types:'Автобусные',
                languages:'Английский',
                hours: 512,
                made: 128,
                happy: 51
            }
        }
    ];

    let places = [
        {
            id: 1, 
            name: 'Александровский сад',
            img: 'img/places/alexander.jpg',
            info: 'Какой-то там сад.'
        },
        {
            id: 2, 
            name: 'Ботанический сад МГУ',
            img: 'img/places/botanic.jpg',
            info: 'Какой-то там сад.'
        },
        {
            id: 3, 
            name: 'Кремль',
            img: 'img/places/kremlin.jpg',
            info: 'Какие-то там башни.'
        }
    ];
    
    if (req.params.id == '1'){
        res.render('view/guideView.html', {guides: guides[0], places: places[0]});
    } else if(req.params.id == '2'){
        res.render('view/guideView.html', {guides: guides[1], places: places[1]});
    } else if(req.params.id == '3'){
        res.render('view/guideView.html', {guides: guides[2], places: places[2]});
    }
    
}

exports.getPlacePage = (req, res) => {
    let places = [
        {
            id: 1, 
            name: 'Красная площадь',
            imgUrl: 'img/red_square.jpg',
            info: 'Главная площадь Москвы, расположенная в центре радиально-кольцевой планировки города между Московским Кремлём (к западу) и Китай-городом (на восток). Также неофициально является главной площадью страны. От площади к берегу Москвы-реки ведёт покатый Васильевский спуск.            Площадь расположена вдоль северо-восточной стены Кремля, между Кремлёвским проездом, проездом Воскресенские Ворота, Никольской улицей, Ильинкой, Варваркой и Васильевским спуском к Кремлёвской набережной. Выходящие с площади улицы далее разветвляются и вливаются в основные магистрали города, ведущие в разные концы России.'
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

    res.render('view/main.html', { place: places[req.params.id]} );
}

exports.getHomePage = (req, res) => {
    res.render('view/main.html');
}

exports.getMapPage = (req, res) => {
    let guides = [
        {
            id: 1, 
            name: 'Игорь',
            imgUrl: 'img/746.jpg',
            info: {
                hours: 120,
                made: 83,
                happy: 12
            }
        },
        {
            id: 2, 
            name: 'Наталья',
            imgUrl: 'img/4066.png',
            info: {
                hours: 230,
                made: 122,
                happy: 87
            }
        },
        {
            id: 3, 
            name: 'Алла',
            imgUrl: 'img/6053.jpg',
            info: {
                hours: 100,
                made: 60,
                happy: 20
            }
        }
    ];

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

    res.render('view/map.html', {guides: guides, places: places});
}