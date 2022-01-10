const jwt = require('jsonwebtoken');
const { JWT_SECRET_TOKEN } = require('../config');
function Autentication(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
        const bearerToken = bearerHeader.split(" ")[1];
        jwt.verify(bearerToken, JWT_SECRET_TOKEN, async (err, user) => {
            if (err) {
                return res.status(403).send({ error: 'token invalido' });
            }
            next()
        })
    } else {
        res.status(500).send({ error: 'no existe token' });
    }
}

module.exports = Autentication;