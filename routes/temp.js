var express = require('express');
var router = express.Router();

var Users = require('../models/user');

var checkAuth = require('../middlewares/checkAuth').checkAuth;

const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
router.get('/temp', function (req, res, next) {
    res.render('dashboard', {title: 'Express'});
});
module.exports = router;