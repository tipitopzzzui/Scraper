const express = require('express');
const Power = require('../../models/power');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Power.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;