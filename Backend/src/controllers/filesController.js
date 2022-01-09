var fs = require('fs');
const path = require("path")
const FileModel = require("../models/fileModel")
const FolderModel = require("../models/folderModel")

async function Upload(req, res) {
    const { carpeta } = req.body
    const body = req.file
    try {
        if (!carpeta) {
            const resCarpeta = await FolderModel.find({ nombreCarpeta: "archivosCarpetaPrincipal" })
            if (!resCarpeta.length) {
                let rutaCarpeta = path.join(__dirname, `../../src/archivos`)
                const carpetaRes = await new FolderModel({ nombreCarpeta: "archivosCarpetaPrincipal", rutaCarpeta }).save()
                guardarArchivo({
                    originalname: body.originalname,
                    type: body.mimetype,
                    path: body.path,
                    filename: body.filename,
                    carpeta: carpetaRes._id,
                    res
                })
            }
            else {
                guardarArchivo({
                    originalname: body.originalname,
                    type: body.mimetype,
                    path: body.path,
                    filename: body.filename,
                    carpeta: resCarpeta[0]._id,
                    res
                })
            }
        } else {
            const resCarpeta = await FolderModel.find({ nombreCarpeta: carpeta })
            if (!resCarpeta.length) {
                res.status(400).send({ message: "no existe la carpeta" })
            } else {
                const reqPath = moverArchivo({ carpeta, body })
                guardarArchivo({
                    originalname: body.originalname,
                    type: body.mimetype,
                    path: reqPath,
                    filename: body.filename,
                    carpeta: resCarpeta[0]._id,
                    res
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

function moverArchivo({ carpeta, body }) {
    let reqPath = path.join(__dirname, `../../src/archivos/${carpeta}/${body.filename}`);
    var readStream = fs.createReadStream(body.path);
    var writeStream = fs.createWriteStream(reqPath);
    readStream.on('close', async function () {
        await fs.unlink(body.path, (err) => {
            if (err) throw err
            console.log(`se elimino ${body.path}`)
        });
    });
    readStream.pipe(writeStream);
    return reqPath
}

async function guardarArchivo({ originalname, type, path, filename, carpeta, res }) {
    const newFile = await new FileModel({
        originalname,
        type,
        path,
        filename,
        carpeta
    }).save()

    if (newFile) {
        res.send({ message: `Archivo guardado en ${path}` })
    }
}
async function Delete(req, res) {
    const { id } = req.params
    const file = await FileModel.find({ _id: id })
    if (file.length) {
        const fileres = file[0]
        console.log(file)
        await fs.unlink(fileres.path, (err) => {
            if (err) console.log(err)
            console.log(`se elimino ${fileres.path}`)
        });
        await fileres.remove().then((filedeleted)=>{
            res.send({ message: `Se elimino el archivo ${filedeleted.path}` })
        })
    }
    else {
        res.status(400).send({ message: "no existe ningun archivo con este id" })
    }
}
module.exports = {
    Upload,
    Delete
}