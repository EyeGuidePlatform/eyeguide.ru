const nunjucks = require('nunjucks');

exports.getPage = (req, res) => {
    let obj = {}
    obj.surname = 'Иванов';
    res.render('main.html', {
        name: req.params.name,
        obj: obj,
        items: [
            'one',
            'two',
            'three'
        ]
    });
}