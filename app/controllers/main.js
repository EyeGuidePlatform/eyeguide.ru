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
            },
            desc: "Описание Светланы"
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
            },
            desc: "Описание Зинаиды"
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
            },
            desc: "Описание Елены"
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
        res.render('guideView.html', {guides: guides[0], places: places[0]});
    } else if(req.params.id == '2'){
        res.render('guideView.html', {guides: guides[1], places: places[1]});
    } else if(req.params.id == '3'){
        res.render('guideView.html', {guides: guides[2], places: places[2]});
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

    res.render('main.html', { place: places[req.params.id]} );
}

exports.getHomePage = (req, res) => {
    res.render('main.html');
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

    res.render('map.html', {guides: guides, places: places});
}

exports.getGidOptionsPage = (req, res) => {
    res.render('gid_options.html');
}
exports.getGidOrdersPage = (req, res) => {
    res.render('gid_orders.html');
}
exports.getGidPlacesPage = (req, res) => {
    res.render('gid_places.html');
}


exports.getProfilePage = (req, res) => {

    let guides = [
        {
            id: 1, 
            name: 'Михаил',
            surname: 'Федяев',
            imgUrl: 'img/746.jpg',
            spec: 'Гид-экскурсовод',
            type: 'Пешеходные, автобусные',
            lang: 'Русский, Английский',
            phone: '8(900)123-45-67',
            email: 'asdqq@gmail.com',
            info: {
                hours: 100,
                done: 42,
                happy: 55
            }
        },
        {
            id: 2, 
            name: 'Сергей',
            surname: 'Булшикин',
            imgUrl: 'img/746.jpg',
            spec: 'Гид-экскурсовод',
            type: 'Пешеходные, автобусные',
            lang: 'Русский, Английский',
            phone: '8(900)123-45-67',
            email: 'asdqq@gmail.com',
            info: {
                hours: 100,
                done: 42,
                happy: 57
            }
        },
        {
            id: 3, 
            name: 'Александра',
            surname: 'Невская',
            imgUrl: 'img/746.jpg',
            spec: 'Гид-экскурсовод',
            type: 'Пешеходные, автобусные',
            lang: 'Русский, Английский',
            phone: '8(900)123-45-67',
            email: 'asdqq@gmail.com',
            info: {
                hours: 100,
                done: 42,
                happy: 57
            }
        }
    ];
    
    if(req.params.id === '1') {res.render('gid_profile.html', {guides: guides[0]})};
    if(req.params.id === '2') {res.render('gid_profile.html', {guides: guides[1]})};
    if(req.params.id === '3') {res.render('gid_profile.html', {guides: guides[2]})};
    
}

