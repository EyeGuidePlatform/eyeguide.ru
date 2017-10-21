exports.getHomePage = (req, res) => {
    res.render('view/main.html', {showMap: false});
}

exports.getMapPage = (req, res) => {
    res.render('view/main.html', {showMap: true});
}