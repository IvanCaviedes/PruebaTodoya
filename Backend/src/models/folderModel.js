const { Schema, model } = require("mongoose")

const folderSchema = new Schema({
    nombreCarpeta: {
        type: String,
        required: true
    },
    rutaCarpeta: {
        type: String,
        required: true
    }
})

const folder = model("folder", folderSchema)

module.exports = folder