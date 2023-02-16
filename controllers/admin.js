const Admin = require("../models/Admin");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
    Admin.findOne({email: req.body.email})
        .then(admin => {
            if (!admin) {
                return res.status(401).json({message: "Utilisateur ou mot de passe incorrect"});
            }
            bcrypt.compare(req.body.password, admin.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({message: "Utilisateur ou mot de passe incorrect"});
                    }
                    res.status(200).json({
                        adminToken: jwt.sign(
                            {adminId: admin._id},
                            'RANDOM_TOKEN_SECRET',
                            {expiresIn: "1y"}
                        )
                    })

                })
                .catch(error => res.status(500).json({error}))
        })
        .catch(error => {
            res.status(400).json({error});
        });
}