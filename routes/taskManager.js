var express = require('express');
var router = express.Router();


/**
 * Returning all entries in the task manager database. If there is no entry it returns an empty JSON object.
 */
router.get('/', function (req, res, next) {
    res.json({
        'message': true
    })

    res.send();
});


/**
 * Create a new entry to the task manager database
 * Requirements for an successfull request:
 * {@code {
 *    "taskName":String,
 *    "creator":UserID,
 *    "details":String,
 *    "until":DateObject
 * }} 
 */
router.post('/create', (req, res, next) => {
    res.status(200);
    res.json({
        status:"ok",
        body: req.body
    })
    
    res.send()

})

/**
 * Modify a  entry in the task manager database
 * Requirements for an successfull request:
 * {@code {
 *    "taskName":String,
 *    "creator":UserID,
 *    "details":String,
 *    "until":DateObject,
 *    "modifier":UserID
 * }} 
 */
router.post('/modify',(req,res,next) =>{
    res.status(200);
    res.json({
        status:"ok",
        body: req.body
    })
    
    res.send()

})

module.exports = router;