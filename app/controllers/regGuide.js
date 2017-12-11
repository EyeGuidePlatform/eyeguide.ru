const guideModel = require('../models/guide').guideModel,
    placeModel = require('../models/place').placeModel,
    emailModel = require('../models/email'),
    staticModel = require('../models/static').staticModel;

/**
 * Страница "регистрация нового гида"
 */
exports.getNewGuide = async (req, res) => {
    let cities = await staticModel.getCities(req.locale),
        languages = await staticModel.getLangs(req.locale);

    res.render('gid_newGuide.html', {cities: cities, languages: languages});
}

exports.addNewGuide = async (req, res, next) => {
    //При несовпадении паролей возвращаем обратно
    if (req.body.guide.password != req.body.confirmPassword) {
        req.flash('error', 'Пароли не совпадают!');
        return res.redirect('back');
    }

    let newGuide = req.body.guide;
    newGuide.name = req.sanitize(newGuide.name);
    newGuide.surname = req.sanitize(newGuide.surname);
    newGuide.description = [];
    newGuide.description.push({
        value: req.sanitize(req.body.description),
        lang: req.locale
    });
    newGuide.img = req.file ? '/img/' + req.file.filename : undefined;
    newGuide.info = {
        spec: req.body.spec ? req.body.spec.split(',') : undefined,
        types: req.body.types ? req.body.types.split(',') : undefined,
        lang: req.body.lang,
        hours: 0,
        tours: 0,
        happy: 0
    };
    
    let guide;
    try {
        guide = await guideModel.addGuide(newGuide);
    } catch (e) {
        req.flash('error', 'Пользователь с данным адресом почты уже зарегистрирован!');
        return res.redirect('back');
    }
    //Сразу логиним гида
    req.session.guide = {
        id: guide._id, 
        email: guide.email, 
        name: guide.name
    };

    //Генерируем ссылку для подтверждения регистрации
    const confirmURL = await guide.genEmailConfirmURL();

    const message = {
        text: `Перейдите по ссылке ниже, чтобы подтвердить почту: \n ${confirmURL}`,
        from: `no-reply <${require('../../config').email}>`,
        to: `${guide.name} <${guide.email}>`,
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
    emailModel.sendEmail(message);

    req.flash('success', 'Вы успешно зарегистрировались!');
    res.redirect('/guideProfile/');
}

exports.confirmEmail = async (req, res) => {
    let guide = await guideModel.findOne({ activate: req.params.url });
    if (guide) {
        guide.visible = 1;
        await guide.save();

        req.flash('success', 'Почта успешно подтверждена!');
    }

    res.redirect('/');
}

exports.removeGuide = async (req, res) => {
    guideModel.removeGuide(req.params.id);

    req.flash('success', 'Гид успешно удален!');
    res.redirect('/admin/confirm/guides');
}

exports.getEditGuidePage = async (req, res) => {
    const guideId = req.params.id,
        foundGuide = await guideModel.getGuide(guideId, req.locale);

    res.render('editGuide.html', {guide: foundGuide});
}

exports.editGuide = async (req, res) => {
    let editGuide = req.body.editGuide;
    editGuide.name = req.sanitize(editGuide.name);
    editGuide.description = {
        lang: req.locale,
        value: req.sanitize(req.body.description)
    }

    editGuide = await guideModel.editGuide(req.params.id, editGuide);

    req.flash('success', 'Данные гида успешно изменены!');
    res.redirect('/admin/confirm/guides');
}
