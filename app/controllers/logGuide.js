let guideModel = require('../models/guide').guideModel;

exports.login = async (req, res) => {
    if (req.session.guide)
        res.redirect('/guideProfile/' + req.session.guide._id);

    let guide = await guideModel.checkGuide(req.body);

    if (guide != null) {
        req.session.guide = {id: guide._id, email: guide.email};
        res.redirect('/guideProfile/' + guide._id);
    } else {
        res.redirect('back');
    }
}

exports.logout = (req, res) => {
    if (req.session.guide) {
        delete req.session.guide;
        res.redirect('/');
    }
}