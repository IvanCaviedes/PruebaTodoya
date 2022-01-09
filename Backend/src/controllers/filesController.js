var fs = require('fs');
const path = require("path")

function Upload(req, res) {
    const {carpeta} = req.body
    const body = req.file
if (!carpeta) {
    console.log("no existe")
}else{
    console.log("si existe")
}
    // let reqPath = path.join(__dirname, `../../src/archivos/${carpeta}/${body.filename}`);

    // var readStream = fs.createReadStream(body.path);
    // var writeStream = fs.createWriteStream(reqPath);

    // readStream.on('close', async function () {
    //     console.log(body.path)

    //     await fs.unlink(body.path,(err)=>{
    //         if (err) throw err
    //         console.log(`se elimino ${body.path}`)
    //     });
    // });
    // readStream.pipe(writeStream);

    res.send("bien")

    // originalname,
    //     mimetype,
    //     destination
    // path
}
function Delete(req, res) {

}
module.exports = {
    Upload,
    Delete
}