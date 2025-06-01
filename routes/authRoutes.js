const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.get('/login', AuthController.renderLogin);
router.post('/login', AuthController.login);
router.get('/cadastro', AuthController.renderCadastro);
router.post('/cadastro', AuthController.cadastrar);

module.exports = router;