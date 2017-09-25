const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./routes');

// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
// have res.render work with html files
app.set('view engine', 'html');
nunjucks.configure('views', {
  noCache: true
});
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true})); // HTML form submits.
app.use(bodyParser.json()); // ajax req.
app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(3000, function() {
  console.log("Listening on port ", 3000);
});
