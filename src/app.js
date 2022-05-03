'use strict'

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const api = require('./routes')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use(bodyParser.json())
app.use('/api', api)

app.get("/", (req , res) => {
    res.json({
        mensaje: "Nodejs and JWT /api/user /api/product"
    });
});

module.exports = app
