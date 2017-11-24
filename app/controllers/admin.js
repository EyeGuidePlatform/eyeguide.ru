const mongoose = require('mongoose'),
    adminModel = require('../models/admin').adminModel;

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