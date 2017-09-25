const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const models = require('../models');

const Page = models.Page;
const User = models.User;

router.use(bodyParser.urlencoded({extended: true})); // HTML form submits.
router.use(bodyParser.json()); // ajax req.

router.get('/', (req, res) => {
  //res.send(`retrieve all wiki pages`);
  res.redirect('/');
});

router.post('/', (req, res) => {
  //res.send(`submit a new page to the database`);
  const page = Page.build({
    title: req.body.title,
    content: req.body.content,
    status: req.body.status,
    date: new Date()
  });

  page.save();
  res.redirect('/');
});

router.get('/add', (req, res) => {
  //res.send(`retrieve the "add a page" form`);
  res.render('addpage');
  // res.redirect('/');
});



module.exports = router;
