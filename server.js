const express = require('express'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    i18n = require('i18n'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    expressSanitizer = require('express-sanitizer'),
    flash = require('connect-flash'),
    mongoStore = require('connect-mongo')(session),
    Recaptcha = require('express-recaptcha'),
    ssl = require('express-ssl'),
    fs = require('fs'),
    path = require('path'),
    app = express();

let locales = ['ru', 'en'],
    login = require('./config').dbLogin,
    pass = require('./config').dbPass,
    adress = require('./config').dbAdress,
    dbName = require('./config').dbName,
    dbPort = require('./config').dbPort,
    recaptcha = new Recaptcha(
        require('./config.js').SITE_KEY, 
        require('./config.js').SECRET_KEY
    ),
    url = 'mongodb://'+login+':'+pass+'@'+adress+':'+dbPort + '/' + dbName;
    //url = 'mongodb://localhost:27017/ExampleDB';

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});
module.exports.recaptcha = recaptcha;
module.exports.mongoose = mongoose;
module.exports.locales = locales;

i18n.configure({
    locales: locales,
    defaultLocale: 'ru',
    cookie: 'eye_lang',
    directory: __dirname + '/src/locales'
});

app.use(    
    session(
    ({
        secret: require('./config.js').session,
        resave: false,
        saveUninitialized: false,
        store: new mongoStore({ 
            url: url
        })
    })
));

app.use(
    express.static(__dirname + '/src'),
    bodyParser(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    expressSanitizer(),
    cookieParser(),
    i18n.init,
    //ssl(),
    flash()
);

app.use(function (req, res, next) {
    res.locals.currentUser = req.session.guide;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

nunjucks.configure(__dirname + '/src/view', {
    autoescape: true,
    cache: false,
    express: app
});

//for utils (пора уже на gulp)
//require('./app/utils/images').syncImage();

app.use('/', require('./router'));
app.listen(require('./config.js').port);

let server = require('https').createServer({
    key: fs.readFileSync(path.resolve(__dirname, 'ssl/server.key')),
    cert: fs.readFileSync(path.resolve(__dirname, 'ssl/server.crt'))
}, app);
server.listen(require('./config.js').port2);

console.log('Server started!');