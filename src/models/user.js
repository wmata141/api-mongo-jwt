'use strict'

const mongoose = require('mongoose')
// Encriptar la contraseña
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UserSchema = mongoose.Schema({
    email: { type: String, unique: true, lowercase: true },
    name: { type: String, required: false },
    lastName: { type: String, required: false },
    avatar: { type: String, required: false },
    password: { type: String, required: true },
    birthday: { type: String, required: true },
    signupDate: { type: Date, default: Date.now() },
    lastLogin: Date
})

UserSchema.pre('save', (next) => {
    let user = this

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, null, (err, hash) => {
            if (err) return next(err)
            // Contraseña encryptada hash
            console.log("hash ==>",hash);
            user.password = hash
            next()
        })
    })
})

// Devuelve el avatar del correo
UserSchema.methods.gravatar = function () {
    if (!this.email) return 'https//gravatar.com/avatar/?s=200&d=retro'

    const md5 = crypto.createHash('md5').update(this.email).digest('hex')
    return `http://gravatar.com/avatar/${md5}?s=200&d=retro`
}

module.exports = mongoose.model('User', UserSchema)