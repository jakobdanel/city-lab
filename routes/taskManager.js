var express = require('express');
var router = express.Router();
let taskManager = require('./../database/taskManager');


/**
 * Returning all entries in the task manager database. If there is no entry it returns an empty JSON object.
 */
router.get('/', async function (req, res, next) {
    let tasks = await taskManager.getAllTask();
    res.json(tasks);
    res.send()
});

/**
 * Returning the entry in the task database with the given id. If there is no entry with these id, the response will return an error message.
 */
router.get('/:id', async function (req, res, next) {
    let id = req.params.id;
    let task = await taskManager.getOneTask(id);
    res.json(task);
    res.send();
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
    let taskName = req.body.taskName;
    let userID = req.body.userID;
    let details = req.body.details;
    let until = req.body.until;
    let response;
    try {
        response = await taskManager.createTask({
            taskName: taskName,
            userID: userID,
            details: details,
            until: until
        });
    } catch (e) {
        response = e;
    }
    res.json(response);
    res.send();

})

router.get('/delete/:id', async (req, res, next) => {
    let id = req.params.id;
    let response = await taskManager.deleteOneTask(id);
    res.json(response);
    res.send();
});
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
router.post('/modify', (req, res, next) => {
    res.status(200);
    res.json({
        status: "ok",
        body: req.body
    })

    res.send()

})

module.exports = router;