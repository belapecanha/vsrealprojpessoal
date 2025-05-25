const express = require('express');
const router = express.Router();
const labelTaskController = require('../controllers/labelTaskController');

router.post('/tasks-labels', labelTaskController.atribuirEtiquetasaTarefas);
router.get('/tasks-labels/task/:task_id', labelTaskController.listarEtiquetasdaTarefa);
router.get('/tasks-labels/label/:label_id', labelTaskController.listarTarefasdaEtiqueta);
router.delete('/tasks-labels/:task_id/:label_id', labelTaskController.removerEtiquetadaTarefa);

module.exports = router;