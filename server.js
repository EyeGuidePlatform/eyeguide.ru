const express = require('express'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    i18n = require('i18n'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    mongoStore = require('connect-mongo')(session),
    app = express();

let locales = ['ru', 'en'],
    login = require('./config').dbLogin,
    pass = require('./config').dbPass,
    adress = require('./config').dbAdress,
    url = 'mongodb://'+login+':'+pass+'@'+adress;
    //url = 'mongodb://localhost:27017/ExampleDB';

mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});
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
    cookieParser(),
    i18n.init
);

nunjucks.configure(__dirname + '/src/view', {
    autoescape: true,
    cache: false,
    express: app
});

app.use('/', require('./router'));
app.listen(require('./config.js').port);

console.log('Server started!');