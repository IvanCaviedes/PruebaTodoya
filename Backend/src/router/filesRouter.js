const express = require("express")
const Route = express.Router()

const { Delete, Upload, index } = require("../controllers/filesController")
const files = require("../middlewares/filesMiddlerware")
Route.post('/upload', files.single('file'), Upload)
    .delete('/delete/:id', Delete)
    .get("/:id", index)

module.exports = Route