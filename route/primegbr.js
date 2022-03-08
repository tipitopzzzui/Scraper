const express = require('express')
let router = express.Router();
const primegbs = require('../scrape/primegbs')

router
    .get('/', async (req, res, next) => {
        console.log('inside primegb')
        // res.json("primegb...")
        await primegbs.getProcessor();
        
        // next()
    })

module.exports = router;