const express = require('express')
let router = express.Router();
const mdcompr = require('../route/mdcompr')
const vedantr = require('../route/vedantr')
const theitdepotr = require('../route/theitdepotr')
const primegbr = require('../route/primegbr')
const app = express();
router
    .get('/', (req, res, next) => {
        // app.use(mdcompr)
        res.json("Hello")
        next()
    }, mdcompr, vedantr, theitdepotr, primegbr)

module.exports = router;