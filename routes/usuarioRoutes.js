const express = require('express');
const router = express.Router();
const UsuariosController = require('../controllers/UsuariosController');

// Rotas para usuários
router.get('/usuarios', UsuariosController.listarUsuario);
router.post('/usuarios/criar', UsuariosController.criarUsuario);
router.post('/usuarios/edit/:id', UsuariosController.editarUsuario);
router.post('/usuarios/delete/:id', UsuariosController.excluirUsuario);

module.exports = router;