const mongoose = require("mongoose");
const { DB } = require("../config")

module.exports = {

    connection: null,

    connect: function () {
        if (this.connection) return this.connection;
        return mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: false,
        }).then(connection => {
            this.connection = connection;
            console.log('Conexion a Base de Datos Exitosa');
        }).catch(error => console.log(error));
    }
}