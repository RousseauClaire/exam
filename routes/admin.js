const express = require('express');
const router = express.Router();
const adminController = require("../controllers/admin");

// POST
// Permet à un admin de se connecter
router.post('/login', adminController.login);

module.exports = router;