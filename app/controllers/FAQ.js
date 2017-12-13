emailModel = require('../models/email');

exports.getFAQpage = (req, res) => {
    res.render('FAQ.html');
};

exports.sendSupportEmail = (req, res) => {
    const message = {
        from: req.body.name + ' <' + req.body.email + '>',
        to: '<devilishchuck@gmail.com>',
        subject: req.body.subject,
        text: req.body.message
    };
    emailModel.sendEmail(message);
    req.flash('success', 'Ваше сообщение успешно отправлено!');
    res.redirect('/');
}