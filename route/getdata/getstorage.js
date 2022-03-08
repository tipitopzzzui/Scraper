const express = require('express');
const Storage = require('../../models/storage');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Storage.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;