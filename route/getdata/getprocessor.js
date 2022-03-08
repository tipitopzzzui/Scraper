const express = require('express');
const Processor = require('../../models/processor');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Processor.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;