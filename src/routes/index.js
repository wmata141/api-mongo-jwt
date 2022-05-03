'use strict'

const express = require('express')
const auth = require('../middlewares/auth')
const productCtrl = require('../controllers/product')
const userCtrl = require('../controllers/user')

const router = express.Router()

router.get('/product', productCtrl.getProducts)
router.get('/product/:id', productCtrl.getProduct)
router.post('/product', productCtrl.saveProduct)
router.put('/product/:id', productCtrl.updateProduct)
router.delete('/product/:id', productCtrl.deleteProduct)

router.get('/user', userCtrl.getUsers)
router.delete('/user/:id', userCtrl.deleteUser)
router.delete('/user', userCtrl.deleteAllUser)
// crear usuario
router.post('/signup', userCtrl.signUp)
// ingresar con usuario
router.post('/signin', userCtrl.signIn)

router.get('/private', auth, (req, res) => {
    res.status(200).send({ message: 'Access Granted to /private by auth'})
})

module.exports = router
