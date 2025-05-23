const express = require('express');
const router = express.Router();
const LabelController = require('../controllers/LabelController');
const pool = require('../config/database'); 

// Listar tarefas e renderizar a página
router.get('/label', LabelController.listarLabel);

// Criar tarefa
router.post('/label/criar', LabelController.criarLabel);

// Editar tarefa
router.put('/label/edit/:id', LabelController.editarLabel);

// "Excluir" tarefa 
router.delete('/label/delete/:id', LabelController.excluirLabel);

module.exports = router;