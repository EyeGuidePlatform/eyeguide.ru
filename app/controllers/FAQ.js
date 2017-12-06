emailModel = require('../models/email');

exports.getFAQpage = (req, res) => {
    res.render('FAQ.html');
};