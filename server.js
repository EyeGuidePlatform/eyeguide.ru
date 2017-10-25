let express = require('express'),
nunjucks = require('nunjucks'),
bodyParser = require('body-parser'),
app = express();

app.use(
express.static(__dirname + '/src'),
bodyParser(),
bodyParser.json()
);

nunjucks.configure(__dirname + '/src', {
autoescape: true,
cache: false,
express: app
});

app.use('/', require('./router'));
app.listen(require('./config.js').port);

console.log('Server started!');