const express = require("express")
const Route = express.Router()

const { create, index } = require("../controllers/folderController")


const Authentication = require("../middlewares/Autentication")

Route.post('/create', create)
    .get('/', Authentication, index)

module.exports = Route