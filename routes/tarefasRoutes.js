const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/tarefas', TarefaController.listarTarefas);

// Criar tarefa
router.post('/tarefas/criar', TarefaController.criarTarefa);

// Editar tarefa
router.post('/tarefas/edit/:id', TarefaController.editarTarefa);

// "Excluir" tarefa 
router.post('/tarefas/delete/:id', TarefaController.excluirTarefa);

module.exports = router;

