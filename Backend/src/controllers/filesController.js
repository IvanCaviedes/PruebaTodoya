var fs = require('fs');
const path = require("path")
const FileModel = require("../models/fileModel")
const FolderModel = require("../models/folderModel")
const { PORT } = require("../config")
async function index(req, res) {
    try {
        const { id } = req.params
        const resCarpeta = await FileModel.find({ carpeta: id })
        console.log(req.params)
        res.status(200).send(resCarpeta)
    } catch (error) {
        res.status(500).send({
            error
        })
    }
}

async function Upload(req, res) {
    const { carpeta } = req.body
    const body = req.file
    try {
        if (!carpeta) {
            const resCarpeta = await FolderModel.find({ nombreCarpeta: "archivosCarpetaPrincipal" })
            if (!resCarpeta.length) {
                let rutaCarpeta = path.join(__dirname, `../../src/archivos`)
                const carpetaRes = await new FolderModel({ nombreCarpeta: "archivosCarpetaPrincipal", rutaCarpeta }).save()

                let pathGuardado = `http://localhost:${PORT}/archivos/${body.filename}`
                guardarArchivo({
                    originalname: body.originalname,
                    type: body.mimetype,
                    path: pathGuardado,
                    filename: body.filename,
                    carpeta: carpetaRes._id,
                    res
                })
            }
            else {
                let pathGuardado = `http://localhost:${PORT}/archivos/${body.filename}`

                guardarArchivo({
                    originalname: body.originalname,
                    type: body.mimetype,
                    path: pathGuardado,
                    filename: body.filename,
                    carpeta: resCarpeta[0]._id,
                    res
                })
            }
        } else {

            let carpetavalidada = carpeta.split(" ").join("_")
            const resCarpeta = await FolderModel.find({ nombreCarpeta: carpetavalidada })
            if (!resCarpeta.length) {
                res.status(400).send({ message: "no existe la carpeta" })
            } else {
                const reqPath = moverArchivo({ carpeta: carpetavalidada, body })

                let pathGuardado = `http://localhost:${PORT}/${carpetavalidada}/${body.filename}`
                guardarArchivo({
                    originalname: body.originalname,
                    type: body.mimetype,
                    path: pathGuardado,
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
        await fileres.remove().then((filedeleted) => {
            res.send({ message: `Se elimino el archivo ${filedeleted.path}` })
        })
    }
    else {
        res.status(400).send({ message: "no existe ningun archivo con este id" })
    }
}
module.exports = {
    Upload,
    Delete,
    index
}