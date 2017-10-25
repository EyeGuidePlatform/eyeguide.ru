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