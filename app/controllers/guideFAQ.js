emailModel = require('../models/email'),
guideModel = require('../models/guide').guideModel;

exports.getGuideFAQpage = (req, res) => {
    
    if(req.session.guide){
        res.render('guideFAQ.html',{
            guideName: req.session.guide.name
        });
    } 
    else{
        req.flash('')
        res.redirect('back');
    }
};

exports.sendSupportEmail = async (req, res) => {
    let thisGuide = await guideModel.getGuide(req.session.guide.id);  
    const message = {
        from: thisGuide.name + ' ' + thisGuide.surname + ' <' + thisGuide.email + '>',
        to: '<devilishchuck@gmail.com>',
        subject: req.body.subject,
        text: req.body.message
    };
    emailModel.sendEmail(message);
    req.flash('success', 'Ваше сообщение успешно отправлено!');
    res.redirect('/guideProfile/');
}