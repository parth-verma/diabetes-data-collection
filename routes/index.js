var express = require('express');
var router = express.Router();

var Users = require('../models/user');
const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
/*
* GET home page.
* Add home page here with links to login page
*/
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.post('/login',
    // Validate that the name field is not empty.
    body('username', 'Username required').isLength({min: 1}).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('username').trim().escape(),

    function (req, res, next) {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            // Error messages can be returned in an array using `errors.array()`.
        }
        else {
            // Perform Auth Checks
            Users.findOne({username:req.body.username},'password')
                .exec(function (err, user) {
                    user.verifyPassword(req.body.password,function (err, valid) {
                        if (err) {
                            console.log(err)
                        } else if (valid) {
                            // Call correct view here
                            // Insert mongo ObjectID sessions as userID
                            // insert middleware call for all routes that require logins
                            console.log('Valid (callback)');
                        } else {
                            console.log('Invalid (callback)');
                        }
                    })
                })
        }
    }
);
module.exports = router;
