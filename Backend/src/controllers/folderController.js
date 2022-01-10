var fs = require('fs');
const path = require("path")
const FolderModel = require("../models/folderModel")

async function index(req, res) {
    const folderRes = await FolderModel.find({})
    res.status(200).send(folderRes)
}

async function create(req, res) {
    const { nombreCarpeta } = req.body
    let carpetavalidada = nombreCarpeta.split(" ").join("_")
    try {
        let rutaCarpeta = path.join(__dirname, `../../src/archivos/${carpetavalidada}`)
        if (!fs.existsSync(rutaCarpeta)) {
            fs.mkdirSync(rutaCarpeta, { recursive: true });
        }
        const newFolder = await FolderModel({ nombreCarpeta:carpetavalidada, rutaCarpeta }).save()
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
    create,
    index
}