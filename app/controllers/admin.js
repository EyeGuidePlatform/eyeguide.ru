const mongoose = require('mongoose'),
    adminModel = require('../models/admin').adminModel,
    guideModel = require('../models/guide').guideModel,
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