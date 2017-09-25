const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //res.send(`retrieve all wiki pages`);
  res.redirect('/');
});

router.post('/', (req, res) => {
  //res.send(`submit a new page to the database`);
    console.log(req.body);
  let pageTitle = req.body.title;

  const page = Page.build({
    title: pageTitle,
    urlTitle: pageTitle.toLowerCase().replace(' ', '_'),
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
