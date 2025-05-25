const express = require('express');
const router = express.Router();
const timeController = require('../controllers/timeController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/time', timeController.listarTime);

// Criar tarefa
router.post('/time/criar', timeController.criarTime);

// Editar tarefa
router.put('/time/edit/:id', timeController.editarTime);

// "Excluir" tarefa 
router.delete('/time/delete/:id', timeController.excluirTime);

module.exports = router;