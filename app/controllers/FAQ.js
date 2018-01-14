emailModel = require('../models/email');

exports.getFAQpage = (req, res) => {
    if(!req.session.guide)
    res.render('FAQ.html');
    else res.redirect('/guideFAQ');
};

exports.sendSupportEmail = (req, res) => {
    if (!req.recaptcha.error) {
    const message = {
        from: `no-reply <${require('../../config').email}>`,
        to: 'Общий FAQ <' + require('../../config').email + '>',
        subject: req.body.subject,
        text: `${req.body.message} \nОт ${req.body.name} <${req.body.email}>`
    };
    emailModel.sendEmail(message);
    req.flash('success', 'Ваше сообщение успешно отправлено!');
    }
    else
        req.flash('error', 'Неверная капча!');
    res.redirect('/');
}

