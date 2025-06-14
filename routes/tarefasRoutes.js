const express = require('express');
const router = express.Router();
const tarefaController = require('../controllers/TarefaController');

router.get('/api/tarefas', tarefaController.listarTarefas);
router.post('/api/tarefas/criar', tarefaController.criarTarefa);
router.put('/api/tarefas/edit/:id', tarefaController.editarTarefa);
router.get('/tarefas/delete/:id', tarefaController.excluirTarefa);  // For browser requests
router.delete('/api/tarefas/delete/:id', tarefaController.excluirTarefa);  // For API requests
router.get('/tarefas/view/:id', tarefaController.viewTarefa);

module.exports = router;
