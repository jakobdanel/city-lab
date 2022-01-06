var express = require('express');
const { request } = require('../app');
var router = express.Router();
//use plant schema
const plantModel=require('../database/schema/plantSchema');
//code jan add a plant to the database

//get a plant from db
router.get('/plants',function(req,res, next){
  
  res.send({type:'GET'});

})
//add plant to db
router.post('/plants',function(req,res, next){
  plantModel.create(req.body).then(function(plant){

  res.send(plant);
 }).catch(next);
})
//update plant from db
router.put('/plants/:id',function(req,res, next){
  res.send({type:'PUT'});

})
//delete plant from db
router.delete('/plants/:id',function(req,res,next){
  
  res.send({type:'DELETE'});

})

//code jan end
module.exports = router;
