const mongoose = require('mongoose'),
    adminModel = require('../models/admin').adminModel,
    guideModel = require('../models/guide').guideModel,
    exModel = require('../models/excursions').exModel,
    placeModel = require('../models/place').placeModel;

exports.getPage = (req, res) => {
    res.redirect('/admin/create/place');
}

exports.login = async (req, res) => {
    if (req.session.admin)
        res.redirect('/admin/main');

    let admin = await adminModel.checkAdmin(req.body);

    if (admin != null) {
        req.session.admin = {id: admin._id, username: admin.username}
        res.redirect('/admin/main');
    }
    else
        res.send('не удалось');
}

exports.logout = (req, res) => {
    delete req.session.admin;
    res.redirect('/admin/login');
}

exports.create = (req, res) => {
    let admin = {};
    admin.username = req.body.username;
    admin.password = req.body.password;

    adminModel.createAdmin(admin);
    res.redirect('/admin/main');
}

exports.loginPage = (req, res) => {
    res.render('adminLogin.html');
}

exports.createPage = (req, res) => {
    res.render('adminCreate.html');
}

exports.getConfirmGuidesPage = async (req, res) => {
    const newGuides = await guideModel.getGuides({visible: 1});

    res.render('confirmGuides.html', {newGuides: newGuides});
}

exports.getConfirmPlacesPage = async (req, res) => {
    const newPlaces = await placeModel.getPlaces({visible: 0});

    res.render('confirmPlaces.html', {newPlaces: newPlaces});
}

exports.confirmGuide = async (req, res) => {
    const foundGuide = await guideModel.getGuide(req.params.id);

    foundGuide.visible = 2;
    await foundGuide.save();

    req.flash('success', 'Гид подтвержден!');
    res.redirect('/admin/confirm/guides');
}

exports.confirmPlace = async (req, res) => {
    const foundPlace = await placeModel.getPlace(req.params.id);

    foundPlace.visible = 1;
    await foundPlace.save();

    req.flash('success', 'Место подтверждено!');
    res.redirect('/admin/confirm/places');
}

exports.getOnModerate = async (req, res) => {
    const foundModetate = await guideModel.getGuides({onModerate:0});

    res.render('onModerate.html', {guides: foundModetate});
}

exports.agreeOnModerate = async (req, res) => {
    let guide = await guideModel.getGuide(req.params.id);

    guide.description[0].status = 0;
    guide.description[0].value = guide.description[0].onModerate;
    guide.description[0].onModerate = '';
    
    guide.save();
    res.redirect('/onModerate');
}

exports.desagreeOnModerate = async (req, res) => {
    let guide = await guideModel.getGuide(req.params.id);

    guide.description[0].status = 0;
    guide.description[0].onModerate = 'Последнее изменение отклонено';
    
    guide.save();
    res.redirect('/onModerate');
}

exports.getGuides = async (req, res) => {
    let guides = await guideModel.getGuides({visible: 2}),
    bannedGuides = await guideModel.getGuides({visible: 4});
    guides = guides.concat(bannedGuides);
    res.render('adminGuides.html', {guides: guides});
}

exports.deleteGuide = async (req, res) => {
    let id = req.params.id,
    guide = await guideModel.getGuide(id);
    await guide.remove();

    let exs = await exModel.getExs({guideId: id});
    for (let i=0; i<exs.length; i++){
        exs[i].remove();
    }

    res.redirect('/admin/update/guides');
}

exports.banGuide = async (req, res) => {
    let id = req.params.id,
    guide = await guideModel.getGuide(id);
    guide.visible = 4;
    guide.save();

    res.redirect('/admin/update/guides');
}

exports.unBanGuide = async (req, res) => {
    let id = req.params.id,
    guide = await guideModel.getGuide(id);
    guide.visible = 2;
    guide.save();

    res.redirect('/admin/update/guides');
}

exports.updateRaiting = async (req, res) => {
    let guide = await guideModel.getGuide(req.body.guideId);
    guide.info.tours = req.body.tours;
    guide.info.hours = req.body.hours;
    guide.info.happy = req.body.happy;

    guide.save();
    res.redirect('/admin/update/guides');
}