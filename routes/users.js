const {sanitizeBody} = require("express-validator/filter");
const {body, validationResult} = require('express-validator/check');
var express = require('express');
var checkAuth = require('../middlewares/checkAuth').checkAuth;
var GlucoseReading = require('../models/glucose_reading');

var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/reading-data',checkAuth,function (req,res,next) {
    // send unfilled form pug here
    res.send('respond with a resource');

});

router.post('/reading-data',checkAuth,
    sanitizeBody('time_of_reading').toDate(),
    sanitizeBody('reading').toInt(),
    function (req, res, next) {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            // Error messages can be returned in an array using `errors.array()`.
        }
        else {
            // Insert Data into mongo
            GlucoseReading({
                patient:req.session.userId,
                reading:req.body.reading,
                time_of_reading: req.body.time_of_reading
            }).save(function (err,reading){
                if (err){
                    // Error while saving the data. Display error message on frontend
                }
                // Successfully saved data, send happy message to browser
            });

        }
    });

module.exports = router;