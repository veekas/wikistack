const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const models = require('./models');

const portNum = 3000;

// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
// have res.render work with html files
app.set('view engine', 'html');
nunjucks.configure('views', {
  noCache: true
});
app.use(morgan('dev'));
app.use(routes);

app.use(bodyParser.urlencoded({extended: true})); // HTML form submits.
app.use(bodyParser.json()); // ajax req.
app.use(express.static(path.join(__dirname, '/public')));

models.db.sync({force: true })
  .then(() => {
    app.listen(portNum, () => {
      console.log(`Listening on port ${portNum}`);
    });
  })
  .catch(console.error);

  // db.get(urlTitle)
