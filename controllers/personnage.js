const Personnage = require("../models/Personnage");

exports.getOnePerso = (req, res, next) => {
    Personnage.findOne({pseudo: req.params.pseudo, classe: req.params.classe})
        .then(perso => res.status(200).json(perso))
        .catch(error => res.status(400).json({error}));
};

exports.getAllPersoByAccount = (req, res, next) => {
    Personnage.find({compteId: req.params.compteId})
        .then(perso => res.status(200).json(perso))
        .catch(error => res.status(400).json({error}));
};

exports.createPerso = (req, res, next) => {
    delete req.body._id;
    delete req.body.compteId;
    const perso = new Personnage({
        ...req.body,
        compteId: req.auth.compteId
    });

    Personnage.findOne({pseudo: req.body.pseudo, classe: req.body.classe})
        .then(perso => {
            if (perso) { return res.status(401).json({message: "Couple pseudo / classe déjà existant"}) }
        })
        .catch(error => res.status(400).json({error}));

    perso.save()
        .then(() => {
            res.status(201).json({message: "Personnage enregistré !"})
        })
        .catch(error => res.status(400).json({error}));
};

exports.modifyPerso = (req, res, next) => {
    delete req.body._id;
    delete req.body.compteId;
    Personnage.findOne({pseudo: req.params.pseudo, classe: req.params.classe})
        .then(perso => {
            if (perso.compteId == req.auth.compteId) {
                Personnage.updateOne({pseudo: req.params.pseudo, classe: req.params.classe}, req.body)
                    .then(() => {res.status(200).json({message : "Personnage modifié"})})
                    .catch(error => res.status(400).json({error}))
            }
            else {
                return res.status(401).json({message: "Vous ne pouvez pas supprimer ce personnage car il n'est pas lié à votre compte."});
            }
        })
        .catch(error => res.status(400).json({error}));
};

exports.deletePerso = (req, res, next) => {

    Personnage.findOne({pseudo: req.params.pseudo, classe: req.params.classe})
        .then(perso => {
            if (!perso) {
                return res.status(404).json({message: "Personnage introuvable"});
            }
            if (perso.compteId == req.auth.compteId) {
                Personnage.deleteOne({pseudo: req.params.pseudo, classe: req.params.classe})
                    .then(() => {res.status(200).json({message : "Personnage supprimé"})})
                    .catch(error => res.status(400).json({error}))
            }
            else {
                return res.status(401).json({message: "Vous ne pouvez pas supprimer ce personnage car il n'est pas lié à votre compte."});
            }
        })
        .catch(error => res.status(400).json({error}));
};