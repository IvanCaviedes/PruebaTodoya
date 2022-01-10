const UserModel = require("../models/userModel")
const jwt = require("jsonwebtoken")
const { JWT_SECRET_TOKEN } = require("../config")
const bcrypt = require('bcrypt');

async function Login(req, res) {
    const { email, password } = req.body
    try {
        const userRes = await UserModel.find({ email })
        if (userRes.length) {
            bcrypt.compare(password, userRes[0].password)
                .then(match => {
                    if (match) {

                        payload = {
                            id: userRes[0]._id
                        }

                        jwt.sign(payload, JWT_SECRET_TOKEN, {}, (err, token) => {
                            if (err) {
                                res.status(500).send({ err });
                            } else {
                                res.status(200).send({ message: 'ACCESO', token });
                            }
                        })

                    } else {
                        res.status(404).send({ message: 'contraseña incorrecta' });
                    }
                })
        } else {
            return res.status(404).send({ message: "Este usuario no existe" })
        }
    } catch (error) {
        res.status(500).send({
            error
        })
    }

}

async function Register(req, res) {
    const { email, password } = req.body
    try {
        const User = await UserModel.find({ email })
        if (User.length) {
            return res.status(404).send({ message: "Este correo ya esta en uso" })
        } else {
            const newUser = await new UserModel({ email, password }).save()
            const payload = {
                id: newUser._id
            }
            jwt.sign(payload, JWT_SECRET_TOKEN, {}, (err, token) => {
                if (err) {
                    res.status(500).send({ err });
                } else {
                    res.status(200).send({ message: 'Usuario Creado', token });
                }
            })
        }
    } catch (error) {
        res.status(500).send({
            error
        })
    }


}

module.exports = {
    Login,
    Register
}