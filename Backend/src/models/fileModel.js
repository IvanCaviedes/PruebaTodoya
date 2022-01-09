const { Schema, model } = require("mongoose")

const fileSchema = new Schema({
    originalname: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    },
    carpeta: {
        type: Schema.Types.ObjectId,
        ref: "folder"
    }
})

const folder = model("file", fileSchema)

module.exports = folder
