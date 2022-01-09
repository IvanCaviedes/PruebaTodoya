const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')

require("dotenv").config()
// config
const { PORT } = require('./config')

//Database
require("./database").connect()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());


var AuthRoute = require("./router/authRouter")

app.use('/api/auth', AuthRoute)

app.listen(PORT, (err) => {
    if (err) {
        console.log(`Algo salio mal, ${err}`)
    }
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})