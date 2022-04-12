const express = require('express');
const Monitor = require('../../models/monitor');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Monitor.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;