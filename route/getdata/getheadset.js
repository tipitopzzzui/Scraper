const express = require('express');
const Headset = require('../../models/headset');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Headset.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;