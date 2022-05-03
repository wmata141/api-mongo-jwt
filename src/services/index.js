'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(user) {
    const payload = {
        sub: user._id,
        // fecha cuando fue creado el token 
        // tiempo en formato unix 
        iat: moment().unix(),
        // fecha cuando va a expirar el token
        exp: moment().add(14, 'days').unix()
    }
    return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN)

            if (payload.exp <= moment.unix()) {
                // reject mandara al catch con el error status message
                reject({
                    status: 401,
                    message: 'Token has Expired'
                })
            }
            resolve(payload.sub)

        } catch (err) {

            reject({
                status: 500,
                message: 'Invalid Token'
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}
