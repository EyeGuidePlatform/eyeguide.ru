exports.getPage = (req, res) => {
    res.render('main.html', {
        name: req.params.name,
        surname: 'Иванов'
    });
}