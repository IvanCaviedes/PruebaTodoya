var fs = require('fs');
const FolderModel = require("../models/folderModel")

async function create(req, res) {
    const { nombreCarpeta } = req.body

    try {
        let rutaCarpeta = `./src/archivos/${nombreCarpeta}`
        if (!fs.existsSync(rutaCarpeta)) {
            fs.mkdirSync(rutaCarpeta, { recursive: true });
        }
        const newFolder = await FolderModel({ nombreCarpeta, rutaCarpeta }).save()
        res.send({
            message:"Carpeta creada correctamente",
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