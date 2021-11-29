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
    client.connect(function(err) 
  {
    assert.strictEqual(null, err);
  
    const db = client.db(dbName); //Database
    const collection = db.collection(collectionName); //Collection

    // Find all documents
    collection.find({}).toArray(function(err, docs) 
    {
      assert.strictEqual(err, null);
      res.json(docs); //return documents from Database
    })
  })
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
    let user = {}
    user.username = "Max Mustermann"
    user.email = "max@mustermann.de"
    user.password = "1234567890"
    user.phonenumber= "01575123456"

    // connect to the mongodb database and afterwards, insert one the new element
    client.connect(function(err) 
    {
      assert.equal(null, err)
    
      console.log('Connected successfully to server')
    
      const db = client.db(dbName)
      const collection = db.collection(collectionName)

      // Insert the document in the database
      collection.insertOne(user, function(err, result) 
      {
        assert.equal(err, null)
        assert.equal(1, result.result.ok)
        console.log(`Inserted ${result.insertedCount} document into the collection`)
      })
      
    })
    res.json({
        'message': true
    })
    res.send();
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
    client.connect(function(err)
    {
      console.log("connected succesful")
      assert.strictEqual(null, err)
      const db = client.db(dbName) //database
      const collection = db.collection(collectionName) //collection
      collection.find({username: "Max Mustermann"}).toArray(function(err, docs)
      {

        assert.strictEqual(err, null);
        // checks if not 0
        if(docs.length > 0) {
            //Update the document in the database
            collection.updateOne({username: "Max Mustermann"}, {$set:{email: "max@maus.de",password:"Helloworld", phonenumber:"987654321"}}, function(err, result)
            {
              assert.strictEqual(err, null)
              assert.strictEqual(1, result.result.ok)
            })
            res.json({
                'message': true
                })
                res.send();
        }
        else {
            res.json({
                'message': false
                })
                res.send();
        }
      })
    })

})

module.exports = router;

/**
 * Delete an existing user
 * Requirements for an successfull request:
 * {@code {
 *    "username":String,
 *    "email":String,
 *    "password":String,
 *    "phonenumber":String,
 * }} 
 */
router.post('/delete', function(req, res, next)
{
    client.connect(function(err)
    {
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        //check if number exists
        collection.find({username: "Max Mustermann"}).toArray(function(err, docs)
        {
            assert.strictEqual(err, null)
            // if document exists, delete it
            if(docs.length >0){
                assert.strictEqual(null, err);

                //delete Document
                collection.deleteOne({username: "Max Mustermann"}, function(err, results){
                    assert.strictEqual(err, null)
                })

                res.json({
                'message': true
                })
                res.send();
            }
            // if something fails, redirect
            else {
                res.json({
                    'message': false
                })
                res.send();
            }
        })
    })
})
module.exports = router; //export as router