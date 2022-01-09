const express = require('express');
const { request } = require('../app');
let router = express.Router();

const processManager = require('../database/processManager.js');

router.get('/', async (req, res, next) => {
    let response = await processManager.getAllProcesses();
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    res.send();
    });

router.get('/:id', async (req, res, next) => {
    let response = await processManager.getOneProcess(req.params.id);
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    res.send();
    });

router.post('/create', async (req, res, next) => {
    let response = await processManager.createProcess(req.body);
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    res.send();
    });

router.get('/delete/:id', async (req, res, next) => {
    let response = await processManager.deleteProcess(req.params.id);
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    res.send();
    });

router.post('/update/:id', async (req, res, next) => {
    let response = await processManager.updateProcess(req.params.id, req.body);
    response.ok ? res.status(200) : res.status(500);
    res.json(response);
    res.send();
    });

module.exports = router;