emailModel = require('../models/email'),
guideModel = require('../models/guide').guideModel;

exports.getGuideFAQpage = (req, res) => {
    
    if(req.session.guide){
        res.render('guideFAQ.html',{
            guideName: req.session.guide.name,
            domain: require('./../../config').domain
        });
    } 
    else res.redirect('/FAQ');
};

exports.sendSupportEmail = async (req, res) => {
    if (!req.recaptcha.error){
    let thisGuide = await guideModel.getGuide(req.session.guide.id);  
    const message = {
        from: `no-reply <${require('../../config').email}>`,
        to: 'Гид FAQ <' + require('../../config').email + '>',
        subject: req.body.subject,
        text: `${req.body.message} \n${thisGuide.name} ${thisGuide.surname} <${thisGuide.email}>`
    };
    emailModel.sendEmail(message);
    req.flash('success', 'Ваше сообщение успешно отправлено!');
    } else
        req.flash('error', 'Неверная капча!');
    res.redirect('/guideProfile/');
}