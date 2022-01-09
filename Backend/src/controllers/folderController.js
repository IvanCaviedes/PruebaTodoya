var fs = require('fs');
const path = require("path")
const FolderModel = require("../models/folderModel")

async function create(req, res) {
    const { nombreCarpeta } = req.body

    try {
        let rutaCarpeta = path.join(__dirname, `../../src/archivos/${nombreCarpeta}`)
        if (!fs.existsSync(rutaCarpeta)) {
            fs.mkdirSync(rutaCarpeta, { recursive: true });
        }
        const newFolder = await FolderModel({ nombreCarpeta, rutaCarpeta }).save()
        console.log(newFolder._id)
        res.send({
            message: "Carpeta creada correctamente",
            newFolder
        })
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}
module.exports = {
    create
}