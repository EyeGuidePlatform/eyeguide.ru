emailModel = require('../models/email');

exports.getFAQpage = (req, res) => {
<<<<<<< HEAD
    if(!req.session.guide)
    res.render('FAQ.html');
    else res.redirect('/guideFAQ');
=======
    res.render('FAQ.html');
>>>>>>> origin/newBranch
};

exports.sendSupportEmail = (req, res) => {
    const message = {
        from: req.body.name + ' <' + req.body.email + '>',
        to: ' <' + require('../../config').emailSender + '>',
        subject: req.body.subject,
        text: req.body.message
    };
    emailModel.sendEmail(message);
    req.flash('success', 'Ваше сообщение успешно отправлено!');
    res.redirect('/');
<<<<<<< HEAD
}

=======
}
>>>>>>> origin/newBranch
