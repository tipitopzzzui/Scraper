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
        // res.json("Hi")
        next()
    })

module.exports = router;