const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/tarefaController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/tarefas', tarefaController.listarTarefas);

// Criar tarefa
router.post('/tarefas/criar', tarefaController.criarTarefa);

// Editar tarefa
router.put('/tarefas/edit/:id', tarefaController.editarTarefa);

// "Excluir" tarefa 
router.delete('/tarefas/delete/:id', tarefaController.excluirTarefa);

module.exports = router;

