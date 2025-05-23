const express = require('express');
const router = express.Router();
const LabelTaskController = require('../controllers/LabelTaskController');

router.post('/tasks-labels', LabelTaskController.atribuirEtiquetasaTarefas);
router.get('/tasks-labels/task/:task_id', LabelTaskController.listarEtiquetasdaTarefa);
router.get('/tasks-labels/label/:label_id', LabelTaskController.listarTarefasdaEtiqueta);
router.delete('/tasks-labels/:task_id/:label_id', LabelTaskController.removerEtiquetadaTarefa);

module.exports = router;