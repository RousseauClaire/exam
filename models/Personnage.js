const mongoose = require('mongoose');

const personnageSchema = mongoose.Schema({
    pseudo: {type: String, required: true},
    classe: {type: String, required: true, enum: ["guerrier", "paladin", "chasseur", "voleur", "prêtre", "chaman", "mage", "démoniste", "moine", "druide", "chasseur de démons", "chevalier de la mort", "évocateur"]},
    niveau: {type: Number, required: true, min: 1, max: 70},
    compteId: {type: String, required: true}
});

module.exports = mongoose.model('Personnage', personnageSchema);