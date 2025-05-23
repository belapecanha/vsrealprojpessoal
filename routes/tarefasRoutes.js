const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/tarefas', TarefaController.listarTarefas);

// Criar tarefa
router.post('/tarefas/criar', TarefaController.criarTarefa);

// Editar tarefa
router.put('/tarefas/edit/:id', TarefaController.editarTarefa);

// "Excluir" tarefa 
router.delete('/tarefas/delete/:id', TarefaController.excluirTarefa);

module.exports = router;

