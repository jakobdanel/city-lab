var express = require('express');
var router = express.Router();
let userManager = require('./../database/userManage');



/**
 * Returning all users listed in the database. If there is no entry, it returns an empty JSON object.
 */
router.get('/', async function (req, res, next) {
  let response = await userManager.getAllUsers();
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    res.send();
});

/**
 * Returning the entry in the task database with the given id. If there is no entry with these id, the response will return an error message.
 */
 router.get('/:id', async function (req, res, next) {
  let response = await userManager.getOneUser(req.params.id);
  response.ok ? res.status(200) : res.status(500);
  res.json(ressponse);
  res.send();
})

/**
 * Create a new user
 * Requirements for an successfull request:
 * {@code {
 *    "username":String,
 *    "firstname":String,
 *    "lastname":String,
 *    "password":String,
 *    "email":String,
 *    "telefonNumber":String,
 * }} 
 */
 router.post('/create', async (req, res, next) => {
  let response = await userManager.createUser(req.body);
  response.ok ? res.status(200) : res.status(500);
  res.json(response);
  res.send();
})

/**
 * Modify an existing user
 * Requirements for an successfull request:
 * {@code {
 *    "username":String,
 *    "firstname":String,
 *    "lastname":String,
 *    "password":String,
 *    "email":String,
 *    "telefonNumber":String,
 *    "garden": GardenID,
 *    "tasks": TaskID,
 *    "presenceTime": DateObject
 * }} 
 */
 router.post('/modify', async (req, res, next) => {
  let response = await userManager.modifyUser(req.body);
  response.ok? res.status(200):res.status(500);
  res.json(response);
  res.send();
});

/**
 * Delete an existing user given by an id
 */
 router.get('/delete/:id', async (req, res, next) => {
  let response = await userManager.deleteOneUser(req.params.id);
  response.ok? res.status(200):res.status(500);
  res.json(response);
  res.send();
});
module.exports = router; //export as router