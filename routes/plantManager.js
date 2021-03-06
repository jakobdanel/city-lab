var express = require('express');
var router = express.Router();
let plantManager = require('./../database/plantManager');

/**
 * Get all plants registered in the database
 */
router.get('/',async function(req,res, next){
  let response = await plantManager.getAllPlants();
  response.ok ? res.status(200) : res.status(500);
  res.json(response);
})

/**
 * Get one specific plant via its id
 */
router.get('/:id',async function(req,res, next){
  try{
    let response = await plantManager.getOnePlant(req.params.id);
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
  }catch(e){
    console.log(e)
  }
})

/**
 * Create a new entry in the plants collection
 */
router.post('/create',async function(req,res, next){
  let response = await plantManager.createPlant(req.body);
  response.ok ? res.status(200) : res.status(500);
  res.redirect('/Taskscheduler');
})

/**
 * Delete one plant via its id
 */
router.delete('/delete/:id',async function(req,res,next){
  let response = await plantManager.deleteOnePlant(req.params.id);
  response.ok? res.status(200):res.status(500);
  res.json(response);
})

/**
 * Modify a plant by sending an id and new data
 */
router.post('/modify', async (req, res, next) => {
  let response = await plantManager.modifyPlant(req.body);
  response.ok? res.status(200):res.status(500);
  res.json(response);
});
module.exports = router;
