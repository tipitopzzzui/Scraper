const express = require('express')
let router = express.Router();
const theitdepot = require('../scrape/theitdepots')

router
    .get('/', async (req, res, next) => {
        console.log('inside itdepots')
        await theitdepot.getStorage();
        await theitdepot.getProcessor();
        await theitdepot.getGraphics();
        await theitdepot.getMemory();
        await theitdepot.getCabinet();
        await theitdepot.getHeadset();
        await theitdepot.getKeyboard();
        await theitdepot.getMonitor();
        await theitdepot.getMotherboard();
        await theitdepot.getMouse();
        await theitdepot.getPower();
        // res.json("hi")
        next()
    })

module.exports = router;