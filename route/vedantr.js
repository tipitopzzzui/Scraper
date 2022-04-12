const express = require('express')
let router = express.Router();
const vedant = require('../scrape/vedants')

router
    .get('/', async (req, res, next) => {
        console.log('inside vedant')
        await vedant.getStorage();
        await vedant.getProcessor();
        await vedant.getGraphics();
        await vedant.getCabinet();
        await vedant.getHeadset();
        await vedant.getKeyboard();
        await vedant.getMonitor();
        await vedant.getMotherboard();
        await vedant.getMouse();
        await vedant.getPower();
        await vedant.getMemory();
        // res.json("vedant...")
        next()
    })

    module.exports = router;