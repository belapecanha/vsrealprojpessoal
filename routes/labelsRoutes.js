const express = require('express');
const router = express.Router();
const labelController = require('../controllers/labelController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/label', labelController.listarLabel);

// Criar tarefa
router.post('/label/criar', labelController.criarLabel);

// Editar tarefa
router.put('/label/edit/:id', labelController.editarLabel);

// "Excluir" tarefa 
router.delete('/label/delete/:id', labelController.excluirLabel);

module.exports = router;