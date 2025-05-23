const express = require('express');
const router = express.Router();
const TimeController = require('../controllers/TimeController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/time', TimeController.listarTime);

// Criar tarefa
router.post('/time/criar', TimeController.criarTime);

// Editar tarefa
router.post('/time/edit/:id', TimeController.editarTime);

// "Excluir" tarefa 
router.post('/time/delete/:id', TimeController.excluirTime);

module.exports = router;