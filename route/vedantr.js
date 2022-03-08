const express = require('express')
let router = express.Router();
const vedant = require('../scrape/vedants')

router
    .get('/', async (req, res, next) => {
        console.log('inside vedant')
        await vedant.getStorage();
        // res.json("vedant...")
        next()
    })

    module.exports = router;