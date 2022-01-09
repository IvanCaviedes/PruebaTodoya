const express = require("express")
const Route = express.Router()

const { Delete, Upload } = require("../controllers/filesController")
const files = require("../middlewares/filesMiddlerware")
Route.post('/upload', files.single('file'), Upload)
    .post('/delete:id', Delete)

module.exports = Route