let fs = require('fs');
exports.page = function (req, res) {
  console.time('Страница выдана за')
    console.log(req.params.alias);
    try {
        let _lang = (req.cookies['lang'] == 'ru') || (req.cookies['lang'] == undefined)) ? 'ru' : 'en';
        let view = (_lang=='ru') ? (req.params.alias+'_ru.html') : (req.params.alias+'_en.html');

        console.log(req.cookies['lang']);
        console.log(`${req.params.alias}_ru.html`);

        res.render(view, {
            title: getTitle(req.params.alias, _lang)
        });
    }
    catch (err) {
        res.redirect('/page/404');
    }
    console.timeEnd('Страница выдана за');
}

function getParent(alias_to_seek) {
    let parent;
    let config = getPagesConfig();
    config = config.pages;
    for (var page in config) {
        if (config[page].alias == alias_to_seek)
            if (config[page].parent) {
                parent = config[page].parent;
            }
    }
    return parent;
}

function getBreadCrumbs(alias_to_seek) {
    let breadcrumbs = Array();
    breadcrumbs[0] = alias_to_seek;
    while (breadcrumbs[breadcrumbs.length - 1] != 'main') {
        breadcrumbs.push(getParent(breadcrumbs[breadcrumbs.length - 1]));
    }
    return breadcrumbs;
}

function getTitle(alias, lang) {
    let config = getPagesConfig();
    let index = getPageIndexByAlias(alias, config);
    let titlelang = `title_${lang}`;
    console.log(config.pages[index][titlelang]);
    return config.pages[index][titlelang];
}

function getPagesConfig() {
    let config = JSON.parse(fs.readFileSync('src/data/config.json', 'utf8'));
    return config;
}

function getPageIndexByAlias(search_alias, list = Array()) {
    for (var i = 0; i <= list.pages.length; i++) {
        if (list.pages[i].alias == search_alias) {
            return i;
        }
    }
}
