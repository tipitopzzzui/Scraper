const express = require('express');
const Memory = require('../../models/memory');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Memory.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;