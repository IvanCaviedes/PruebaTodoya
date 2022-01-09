const path = require('path')
const multer = require('multer');

const storage = multer.diskStorage({
    destination: path.join(__dirname, '../archivos'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname))
    }
})
module.exports = multer({ storage })