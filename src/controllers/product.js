'use strict'

const productModel = require('../models/product');

//All products
function getProducts(req, res) {
    productModel.find({}, (err, products) => {
        if (err) return res.status(500).send({ message: `Error when making the request: ${err}` })
        if (!products) return res.status(404).send({ message: `There are no products` })
        res.status(200).send({ products })
    })
}
//Product by id
function getProduct(req, res) {
    let id = req.params.id
    productModel.findById(id, (err, product) => {
        if (err) {
            res.status(500).send({ message: `Error when making the request: ${err}` })
        }
        if (!product) {
            res.status(404).send({ message: `Product does not exist` })
        }
        res.status(200).send({ product })
    })
}
//Insert Product
function saveProduct(req, res) {    
    let product = new productModel()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description
    product.save((err, product) => {        
        if (err) {
            res.status(500).send({ message: `Error Saving to Database: ${err}` })
        }
        res.status(200).send({ product })
    })
}
//Update Product by id
function updateProduct(req, res) {
    let id = req.params.id
    let update = req.body
    productModel.findByIdAndUpdate(id, update, (err, productoUpdate) => {
        if (err) {
            res.status(500).send({ message: `Product Update Failed: ${err}` })
        }
        res.status(200).send({ product: productoUpdate })
    })
}
//Delete Product by id
function deleteProduct(req, res) {
    let id = req.params.id
    productModel.findById(id, (err, product) => {
        if (err) {
            res.status(500).send({ message: `Error Deleting Product: ${err}` })
        }
        if (product) {
            product.remove(err => {
                if (err) res.status(404).send({ message: `Product does not exist` })
                res.status(200).send({ message: "Product has been removed" })
            })
        } else {
            res.status(500).send({ message: `Error Deleting Product: ${err}` })
        }

    })
}

module.exports = {
    getProducts,
    getProduct,
    saveProduct,
    updateProduct,
    deleteProduct
}