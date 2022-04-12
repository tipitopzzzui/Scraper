const express = require("express")
const mongoose = require("mongoose")
const mdcompr = require('./route/mdcompr')
const theitdepotr = require('./route/theitdepotr')
const vedantr = require('./route/vedantr')
const primegb = require('./route/primegbr')
const fetchr = require('./route/fetch')
const getStorage = require('./route/getdata/getstorage')
const getProcessor = require('./route/getdata/getprocessor')
const getMemory = require('./route/getdata/getmemory')
const getGraphics = require('./route/getdata/getgraphics')
const getheadset = require('./route/getdata/getheadset')
const getcabinet = require('./route/getdata/getcabinet')
const getkeyboard = require('./route/getdata/getkeyboard')
const getmonitor = require('./route/getdata/getmonitor')
const getmotherboard = require('./route/getdata/getmotherboard')
const getmouse = require('./route/getdata/getmouse')
const getpower = require('./route/getdata/getpower')
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



app.use('/fetch', fetchr);
app.use('/getstorage', getStorage);
app.use('/getprocessor', getProcessor);
app.use('/getgraphics', getGraphics);
app.use('/getmemory', getMemory);
app.use('/getheadset', getheadset);
app.use('/getkeyboard', getkeyboard);
app.use('/getmonitor', getmonitor);
app.use('/getmotherboard', getmotherboard);
app.use('/getmouse', getmouse);
app.use('/getpower', getpower);
app.use('/getcabinet', getcabinet);
// app.use('/mdcomp', mdcompr);
// app.use('/theitdepot', theitdepotr);
// app.use('/vedant', vedantr)
// app.use('/primegb', primegb)


