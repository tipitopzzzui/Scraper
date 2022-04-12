const express = require('express');
const Cabinet = require('../../models/cabinet');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Cabinet.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;