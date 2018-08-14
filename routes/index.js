var express = require('express');
var router = express.Router();

var Users = require('../models/user');

var checkAuth = require('../middlewares/checkAuth').checkAuth;

const {body, validationResult} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');
/*
* GET home page.
* Add home page here with links to login page
*/
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});
router.get('/login',(req,res,next) => {
    res.redirect('/');
});
router.post('/login',
    // Validate that the name field is not empty.
    body('username', 'Username required').isLength({min: 1}).trim(),

    // Sanitize (trim and escape) the name field.
    sanitizeBody('username').trim().escape(),

    function (req, res, next) {

        console.log(req.body);
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            res.render('index',{errors:errors.array()});
            console.log(errors.array())
            // There are errors. Render form again with sanitized values/errors messages.
            // Error messages can be returned in an array using `errors.array()`.
        }
        else {
            // Perform Auth Checks
            Users.findOne({username:req.body.username})
                .exec(function (err, user) {
                    if (err) {
                        console.log(err);
                        res.render('index',{errors:err})
                    }

                    if (!user){
                        res.render('index',{errors:[{msg:"User not found"}]});

                    }
                    else{
                    user.verifyPassword(req.body.password,function (err, valid) {
                        if (err) {
                            console.log(err);
                            res.render('index',{errors:err})
                        } else if (valid) {
                            // Call correct view here
                            // Insert mongo ObjectID sessions as userID
                            // insert middleware call for all routes that require logins
                            req.session.userId = user.ObjectId;
                            res.redirect('/dashboard');
                        } else {
                            res.render('index',{errors:[{msg:"Incorrect Password"}]});
                        }
                    })}
                })
        }
    }
);

router.get('/dashboard',checkAuth, function (req,res,next) {
    res.send('Under construction');
    
});
module.exports = router;
