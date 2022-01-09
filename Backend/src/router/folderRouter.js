const express = require("express")
const Route = express.Router()

const { create } = require("../controllers/folderController")

Route.post('/create', create)

module.exports = Route