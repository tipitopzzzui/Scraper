const express = require('express');
const Keyboard = require('../../models/keyboard');
let router = express.Router();

router
    .get('/', (req, res, next) => {
        Keyboard.find({})
            .then((response) => {
                res.json(response)
            })
            .catch((err) => { console.log(err) })
    })

module.exports = router;