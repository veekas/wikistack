const express = require('express');
const router = express.Router();

// GET method route
router.get('/', function (req, res) {
  res.send('GET request to the homepage')
});

module.exports = router;
