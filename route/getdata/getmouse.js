const express = require('express');
const Mouse = require('../../models/mouse');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Mouse.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;