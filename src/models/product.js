'use strict'

const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: { type: String, required: true },
    picture: { type: String, required: false },
    price: { type: Number, default: 0 },
    category: { type: String, enum: ['computers','phones','accesories']},
    description: { type: String, required: false }
})

module.exports = mongoose.model('Product', ProductSchema)
