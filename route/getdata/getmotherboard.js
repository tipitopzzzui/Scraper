const express = require('express');
const Motherboard = require('../../models/motherboard');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Motherboard.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;