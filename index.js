const express = require("express")
const mongoose = require("mongoose")
const mdcompr = require('./route/mdcompr')
const theitdepotr = require('./route/theitdepotr')
const vedantr = require('./route/vedantr')
const primegb = require('./route/primegbr')
const fetchr = require('./route/fetch')
require('dotenv').config();
const PORT = process.env.PORT


const app = express();
const dbUrl = process.env.MONGODB_URL;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => { console.log("connected to db!") })
    .catch((err) => { console.log(err) })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

app.get('/', (req, res) => {
    res.json("Server running!")
})



app.use('/fetch', fetchr)
// app.use('/mdcomp', mdcompr);
// app.use('/theitdepot', theitdepotr);
// app.use('/vedant', vedantr)
// app.use('/primegb', primegb)


