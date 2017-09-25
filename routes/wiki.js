const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  //res.send(`retrieve all wiki pages`);
  res.redirect('/');
});

router.post('/', (req, res) => {
  //res.send(`submit a new page to the database`);
  const page = Page.build({

  });

  page.save();
});

router.get('/add', (req, res) => {
  //res.send(`retrieve the "add a page" form`);
  res.render('addpage');
});



module.exports = router;
