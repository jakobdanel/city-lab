const express = require('express');
const { request } = require('../app');
let router = express.Router();

const processManager = require('../database/processManager.js');
/**
 * Get all processes
*/
router.get('/', async (req, res, next) => {
    let response = await processManager.getAllProcesses();
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
});
/**
 * Get one specific process
 */
router.get('/:id', async (req, res, next) => {
    let response = await processManager.getOneProcess(req.params.id);
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    });
/**
 * Create new process
 */
router.post('/create', async (req, res, next) => {
    let response = await processManager.createProcess(req.body);
    response.ok ? res.status(200) : res.status(500);
    res.redirect('/Taskscheduler');
    res.send(response);
    });
/**
 * Delete one process
 */
router.get('/delete/:id', async (req, res, next) => {
    let response = await processManager.deleteProcess(req.params.id);
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    });
/**
 * Update a process
 */
router.post('/update/:id', async (req, res, next) => {
    let response = await processManager.updateProcess(req.params.id, req.body);
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    });

module.exports = router;