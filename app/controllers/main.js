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
                happy: 57
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
    
    if(req.params.id === '1') {res.render('view/gid_profile.html', {guides: guides[0]})};
    if(req.params.id === '2') {res.render('view/gid_profile.html', {guides: guides[1]})};
    if(req.params.id === '3') {res.render('view/gid_profile.html', {guides: guides[2]})};
    
}