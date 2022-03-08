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
        // res.json("hi")
        next()
    })

module.exports = router;