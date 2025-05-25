const express = require('express');
const router = express.Router();
const projetoController = require('../controllers/projetoController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/projeto', projetoController.listarProjeto);

// Criar tarefa
router.post('/projeto/criar', projetoController.criarProjeto);

// Editar tarefa
router.put('/projeto/edit/:id', projetoController.editarProjeto);

// "Excluir" tarefa 
router.delete('/projeto/delete/:id', projetoController.excluirProjeto);

module.exports = router;
