let guideModel = require('../models/guide').guideModel;

exports.login = async (req, res) => {
    if (req.session.guide)
        return res.redirect('/guideProfile/' + req.session.guide.id);

    let guide = await guideModel.checkGuide(req.body);

    if (guide) {
        req.session.guide = {id: guide._id, email: guide.email, name: guide.name};
        return res.redirect('/guideProfile/' + guide._id);
    }

    res.redirect('back');
}

exports.logout = (req, res) => {
    if (req.session.guide) {
        delete req.session.guide;
        res.redirect('/');
    }
}