var express = require('express');
const app = express();
var router = express.Router();
const assert = require('assert');

//Here we are configuring express to use body-parser as middle-ware
app.use(express.json());
app.use(express.urlencoded( {extended: true} )); // because Error: 'body-parser deprecated undefined extended'

//MongoConnect
const url = 'mongodb://localhost:27017' // connection URL
const dbName = 'easyGardenDB' // database name
const collectionName = 'users' // collection name

const MongoClient = require('mongodb').MongoClient
const client = new MongoClient(url) // mongodb client


/**
 * Returning all users listed in the database. If there is no entry, it returns an empty JSON object.
 */
router.get('/', function (req, res, next) {
    res.json({
        'message': true
    })
    res.send();
});


/**
 * Create a new user
 * Requirements for an successfull request:
 * {@code {
 *    "username":String,
 *    "email":String,
 *    "password":String,
 *    "phonenumber":String,
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
 * Modify an existing user
 * Requirements for an successfull request:
 * {@code {
 *    "username":String,
 *    "email":String,
 *    "password":String,
 *    "phonenumber":String,
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

router.post('/delete', function(req, res, next)
{
    /*client.connect(function(err)
    {
        console.log('Connected successfully to server')
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        var userToDelete = req.body.userToDelete;
        
        collection.find({userToDelete: userToDelete}).toArray(function(err, docs)
        {      
            if(docs.length >= 1){ //check if user exists
                collection.deleteOne({userToDelete: userToDelete}, function(err, results){ //delte the user from the collection
                })
                res.send()
            }
            else { //if the user does not exist
                res.send()
            }
            
        })

    })*/
    res.status(200);
    res.json({
        status:"ok",
        body: req.body
    })
    
    res.send()

})
module.exports = router; //export as router