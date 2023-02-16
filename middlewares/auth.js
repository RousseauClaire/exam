const jwt = require('jsonwebtoken');
const axios = require('axios');

module.exports = async (req, res, next) => {
    try {

        let token;
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.body.username && req.body.password) {
            const {data} = await axios.post("https://backend-tp-final-nodejs.agence-pixi.fr/wow/compte/check", {
                    username: req.body.username,
                    password: req.body.password
                }
            )
            console.log(data)
            token = data.token;
            // TODO : renvoyer le token à l'utilisateur
        }
        if (token) {
            const decodedToken = jwt.verify(token, 'SR1wKQYqlTLVWZSlYkot3xTu0qdZuWDn');
            compteId = decodedToken.compteID;
            req.auth = {
                compteId: compteId
            }
        } else {
            res.status(401).json({message: "Authentification manquante"})
        }
        next();
    } catch (error) {
        res.status(401).json({error})
    }
}