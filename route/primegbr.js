const express = require('express')
let router = express.Router();
const primegbs = require('../scrape/primegbs')

router
    .get('/', async (req, res, next) => {
        console.log('inside primegb')
        // res.json("primegb...")
        await primegbs.getStorage();
        await primegbs.getProcessor();
        await primegbs.getGraphics();
        await primegbs.getMemory();
        await primegbs.getCabinet();
        await primegbs.getHeadset();
        await primegbs.getKeyboard();
        await primegbs.getMonitor();
        await primegbs.getMotherboard();
        await primegbs.getMouse();
        await primegbs.getPower();
        
        // next()
    })

module.exports = router;