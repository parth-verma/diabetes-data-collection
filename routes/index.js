var express = require('express');
var router = express.Router();

/*
* GET home page.
* Add home page here with links to login page
*/
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
