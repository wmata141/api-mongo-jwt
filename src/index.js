'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, (err, res) => {
    if (err) {
        return console.log(`Error Connecting to Database: ${err}`)
    }
    console.log('Database Connection Established...');

    app.listen (config.port, () => {
        console.log(`Api Rest Runing at http://localhost:${config.port}`);        
    })    
})
