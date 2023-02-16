const express = require('express');
const router = express.Router();
const personnageController = require("../controllers/personnage");
const auth = require('../middlewares/auth');

// GET
// Récupère les informations d'un personnage
router.get('/pseudo/:pseudo/classe/:classe', personnageController.getOnePerso);

// GET
// Récupère les informations de tous les personnages lié au compte
router.get('/compte/:compteId', personnageController.getAllPersoByAccount);

// POST
//  Créer un personnage
router.post('/', auth, personnageController.createPerso);

// POST
//  Modifie les informations d'un personnage
router.post('/pseudo/:pseudo/classe/:classe', auth, personnageController.modifyPerso);

// DELETE
// Supprime un personnage
router.delete('/pseudo/:pseudo/classe/:classe', auth, personnageController.deletePerso);

module.exports = router;