const express = require("express")
const Route = express.Router()

const { Login, Register } = require("../controllers/authController")

Route.post('/login', Login)
    .post('/Register', Register)

module.exports = Route