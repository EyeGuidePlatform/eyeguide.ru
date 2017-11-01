exports.getGidOptionsPage = (req, res) => {
    res.render('gid_options.html');
}
exports.getGidOrdersPage = (req, res) => {
    res.render('gid_orders.html');
}
exports.getGidPlacesPage = (req, res) => {
    res.render('gid_places.html');
}
exports.getNewGuide = (req, res) => {
    res.render('gid_newGuide.html');
}
exports.getProfilePage0 = (req,res) => {
    res.redirect('/gidProfile/59f8b5ffb4bb3b34f0b37352');
}