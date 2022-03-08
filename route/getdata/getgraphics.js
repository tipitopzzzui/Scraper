const express = require('express');
const Graphics = require('../../models/graphics');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Graphics.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;