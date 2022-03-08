const express = require('express')
let router = express.Router();
const mdcomps = require('../scrape/mdcomps')

router
    .get('/', async (req, res, next) => {
        console.log('inside mdcomp')
        await mdcomps.getProcessor();
        // res.json("Hi")
        next()
    })

module.exports = router;