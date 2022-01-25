var express = require('express');
var router = express.Router();
let taskManager = require('./../database/taskManager');


/**
 * Returning all entries in the task manager database. The actual data will be stored in the data variable. The response also have an message
 * with short information and a length attribute containing the length of the data array (the number of entries). If there is no entry it will
 * return an empry array. Also hold an ok field with a boolean, wether the request was successfull or not. If the request was successfull the
 * response status will be 200 if not it will be 500. If there was an error on the serverside, the reponse will contain an error field.  
 */
router.get('/', async function (req, res, next) {
    let response = await taskManager.getAllTask();
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
});

/**
 * Returning the entry in the task database with the given id. If there is no entry with these id, the response will return an error message.
 */
router.get('/:id', async function (req, res, next) {
    let response = await taskManager.getOneTask(req.params.id);
    response.ok ? res.status(200) : res.status(500);
    res.json(ressponse);
})
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
router.post('/create', async (req, res, next) => {
    let response = await taskManager.createTask(req.body);
    response.ok ? res.status(200) : res.status(500);
    res.redirect('/Taskscheduler');
})

router.get('/delete/:id', async (req, res, next) => {
    let response = await taskManager.deleteOneTask(req.params.id);
    response.ok? res.status(200):res.status(500);
    res.send(response);
});

/**
 * Modify the task with the given id. The task object must contain the id of the task.
 * All data from the task object needs to be send with the request.
 */
router.post('/modify', async (req, res, next) => {
    let response = await taskManager.modifyTask(req.body);
    response.ok? res.status(200):res.status(500);
    res.json(response);
});
module.exports = router;