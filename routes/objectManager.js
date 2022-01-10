var express = require('express');
var router = express.Router();
let objectManager = require('./../database/objectManager');

/**
 * Get all objects registered in the database
 */
router.get('/',async function(req,res, next){
  let response = await objectManager.getAllObjects();
  response.ok ? res.status(200) : res.status(500);
  res.json(response);
  res.send();
})

/**
 * Get one specific object via its id
 */
router.get('/:id',async function(req,res, next){
  let response = await objectManager.getOneObject(req.params.id);
  response.ok ? res.status(200) : res.status(500);
  res.json(response);
  res.send();
})

/**
 * Create a new entry in the objects collection
 */
router.post('/create',async function(req,res, next){
  let response = await objectManager.createObject(req.body);
  response.ok ? res.status(200) : res.status(500);
  res.redirect('/Taskscheduler');
  res.json(response);
})

/**
 * Delete one object via its id
 */
router.delete('/delete/:id',async function(req,res,next){
  let response = await objectManager.deleteOneObject(req.params.id);
  response.ok? res.status(200):res.status(500);
  res.json(response);
  res.send();
})

/**
 * Modify an object by sending an id and new data
 */
router.post('/modify', async (req, res, next) => {
  let response = await objectManager.modifyObject(req.body);
  response.ok? res.status(200):res.status(500);
  res.json(response);
  res.send();
});
module.exports = router;
