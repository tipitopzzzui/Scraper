const express = require('express')
let router = express.Router();
const mdcomps = require('../scrape/mdcomps')

router
    .get('/', async (req, res, next) => {
        console.log('inside mdcomp')
        await mdcomps.getStorage();
        await mdcomps.getProcessor();
        await mdcomps.getGraphics();
        await mdcomps.getMemory();
        await mdcomps.getMotherboard();
        await mdcomps.getPower();
        await mdcomps.getMonitor();
        await mdcomps.getCabinet();
        await mdcomps.getMouse();
        await mdcomps.getKeyboard();
        await mdcomps.getHeadset();
        // res.json("Hi")
        next()
    })

module.exports = router;