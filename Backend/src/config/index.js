module.exports = {
    PORT: process.env.PORT || 4000,
    DB: process.env.DB || 'mongodb://localhost/cargaArchivos',
    JWT_SECRET_TOKEN: process.env.JWT_SECRET_TOKEN || 'ESTAESUNALLAVESUPERSECRETA'
}