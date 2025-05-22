const express = require('express');
const router = express.Router();
const ProjetoController = require('../controllers/ProjetoController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/projeto', ProjetoController.listarProjeto);

// Criar tarefa
router.post('/projeto/criar', ProjetoController.criarProjeto);

// Editar tarefa
router.post('/projeto/edit/:id', ProjetoController.editarProjeto);

// "Excluir" tarefa 
router.post('/projeto/delete/:id', ProjetoController.excluirProjeto);

module.exports = router;
