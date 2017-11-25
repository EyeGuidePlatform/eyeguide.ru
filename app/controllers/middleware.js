exports.isGuideLogged = (req, res, next) => {
    if (req.session.guide) {
        return next();
    }

    res.redirect('back');
}

exports.isAdminLogged = (req, res, next) => {
    if (req.session.admin) {
        return next();
    }

    res.redirect('/admin/login');
}