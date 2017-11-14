const guideModel = require('../models/guide').guideModel,
    placeModel = require('../models/place').placeModel,
    cityModel = require('../models/city').cityModel,
    languageModel = require('../models/language').languageModel,
    config = require('../../config'),
    
    email = require('emailjs/email'),
    server = email.server.connect({
        user: 'eyeguidetest',
        password: config.emailPass,
        host: 'smtp.gmail.com',
        ssl: true
    });

/**
 * Страница "регистрация нового гида"
 */
exports.getNewGuide = async (req, res) => {
    let cities = await cityModel.getCities(),
        languages = await languageModel.getLangs();
    
    res.render('gid_newGuide.html', {cities: cities, languages: languages});
}

exports.addNewGuide = async (req, res, next) => {
    //При несовпадении паролей возвращаем обратно
    if (req.body.guide.password != req.body.confirmPassword) {
        return res.redirect('back');
    }

    let newGuide = req.body.guide;
    newGuide.img = req.file ? '/img/' + req.file.filename : undefined;
    newGuide.info = {
        spec: req.body.spec ? req.body.spec.split(',') : undefined,
        types: req.body.types ? req.body.types.split(',') : undefined,
        lang: req.body.lang,
        hours: 0,
        tours: 0,
        happy: 0
    };
    
    const guide = await guideModel.addGuide(newGuide);
    //Сразу логиним гида
    req.session.guide = {
        id: guide._id, 
        email: guide.email, 
        name: guide.name
    };

    //Генерируем ссылку для подтверждения регистрации
    const confirmURL = await guide.genEmailConfirmURL();

    const message = {
        text: 'Перейдите по ссылке ниже, чтобы подтвердить почту: \n' + confirmURL,
        from: 'no-reply <eyeguidetest@gmail.com>',
        to: guide.name + ' <' + guide.email + '>',
        subject: 'Пожалуйста подтвердите почту',
        attachment: [
            {
                data: 
                `
                 <html>
                    <p>Перейдите по ссылке ниже, чтобы подтвердить почту:</p>
                    <a href="${confirmURL}">Подтвердить</a>
                 </html>   
                `,
                alternative: true
            }
        ]
    };
    server.send(message, function(err, message) { console.log(err || message); });

    res.redirect('/guideProfile/' + guide._id);
}

exports.confirmEmail = async (req, res) => {
    let guide = await guideModel.findOne({ activate: req.params.url });
    if (guide) {
        guide.visible = 1;
        await guide.save();

        return res.redirect('/guideProfile/' + guide._id);
    }

    res.redirect('/');
}