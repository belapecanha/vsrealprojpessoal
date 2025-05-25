const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

// Rotas para usuários
router.get('/usuarios', usuariosController.listarUsuario);
router.post('/usuarios/criar', usuariosController.criarUsuario);
router.put('/usuarios/edit/:id', usuariosController.editarUsuario);
router.delete('/usuarios/delete/:id', usuariosController.excluirUsuario);

module.exports = router;