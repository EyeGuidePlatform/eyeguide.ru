const express = require('express'),
    nunjucks = require('nunjucks'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express();

//подключаемся к БД
let url = 'mongodb://localhost:27017/ExampleDB';    
mongoose.Promise = global.Promise;
mongoose.connect(url, {useMongoClient: true});
module.exports.mongoose = mongoose;

app.use(
    express.static(__dirname + '/src'),
    bodyParser(),
    bodyParser.json()
);

nunjucks.configure(__dirname + '/src/view', {
    autoescape: true,
    cache: false,
    express: app
});

app.use('/', require('./router'));
app.listen(require('./config.js').port);

console.log('Server started!');