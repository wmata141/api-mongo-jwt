'use strict'

const userModel = require('../models/user')
const service = require('../services')

// signUp registra usuarios y los guarda en la base de datos
// proporciona un token para que la aplicacion cliente pueda autenticarse contra la api
// y pueda acceder a rutas que definamos privadas o no
function signUp(req, res) {
    console.log("req.body ==>", req.body);
    const birthday = `${req.body.daySelected} - ${req.body.monthSelected} - ${req.body.yearSelected}`
    const user = new userModel({
        email: req.body.email,
        name: req.body.name,
        lastName: req.body.lastName,
        password: req.body.password,
        birthday
    })

    try {
        user.save((err) => {
            console.log("err express ==>", err);
            if (err) res.status(500).send({ message: `Error creating user: ${err}` })

            return res.status(201).send({ token: service.createToken(user), user })
        })
    } catch (error) {
        console.log("error ==>", JSON.parse(error));
    }

}
// signIn si el usuario se ha registrado con su email y contraseña (existe en la base de datos)
// y quiere acceder de nuevo este asgina un token para que luego pueda acceder
function signIn(req, res) {
    userModel.findOne({ email: req.body.email, password: req.body.password }, (err, user) => {

        if (err) return res.status(500).send({ message: err })
        if (!user) return res.status(404).send({ message: 'Username or password wrong' })

        req.user = user
        res.status(200).send({
            message: 'Acceso Autorizado',
            token: service.createToken(user),
            user
        })
    })
}
//All users
function getUsers(req, res) {
    userModel.find({}, (err, users) => {
        if (err) return res.status(500).send({ message: `Error when making the request: ${err}` })
        if (!users) return res.status(404).send({ message: `There are no users` })
        res.status(200).send({ users })
    })
}
//Delete user by id
function deleteUser(req, res) {
    let id = req.params.id
    userModel.findById(id, (err, user) => {
        if (err) {
            res.status(500).send({ message: `Error Deleting User: ${err}` })
        }
        user.remove(err => {
            if (err) res.status(404).send({ message: `User does not exist` })
            res.status(200).send({ message: "User has been removed" })
        })
    })
}

function deleteAllUser(req, res) {
    userModel.deleteMany({})
}

module.exports = {
    signUp,
    signIn,
    getUsers,
    deleteUser,
    deleteAllUser
}