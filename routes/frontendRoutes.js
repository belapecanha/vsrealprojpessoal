const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');
const ProjetoController = require('../controllers/ProjetoController');
const TimeController = require('../controllers/TimeController');
const TarefaService = require('../services/tarefaService');

// Rota Kanban
router.get('/kanban', TarefaController.viewTarefas);

// Rota para o formulário de nova tarefa
router.get('/tarefa/nova', async (req, res) => {
    try {
        const projetos = await ProjetoController.listarProjetos();
        const times = await TimeController.listarTimes();
        
        res.render('nova-tarefa', {
            title: 'Nova Tarefa',
            projetos,
            times,
            error: null
        });
    } catch (error) {
        console.error('Erro ao carregar formulário:', error);
        res.status(500).render('nova-tarefa', {
            title: 'Nova Tarefa',
            projetos: [],
            times: [],
            error: 'Erro ao carregar dados do formulário'
        });
    }

});
// Rota para o formulário de novo projeto
router.get('/projeto/novo', (req, res) => {
    res.render('novo-projeto', {
        title: 'Trackzo'
    });
});
// Rota para o formulário de novo projeto
router.get('/time/novo', (req, res) => {
    res.render('novo-time', {
        title: 'Trackzo'
    });
});
//Rota para o formulário de editar tarefa
router.get('/tarefa/editar/:id', TarefaController.viewEditar);

module.exports = router;
