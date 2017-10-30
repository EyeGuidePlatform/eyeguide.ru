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
    