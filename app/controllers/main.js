/**
 * Страница "Главная"
 */
exports.getHomePage = (req, res) => {
    res.render('main.html', {
        domain: require('./../../config').domain
    });
};
