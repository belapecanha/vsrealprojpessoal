const express = require('express');
const router = express.Router();

// Rota principal - mostra o quadro Kanban
router.get('/', (req, res) => {
    res.render('tarefas', {
        title: 'Trackzo'
    });
});

// Rota para o formulário de nova tarefa
router.get('/tarefa/nova', (req, res) => {
    res.render('nova-tarefa', {
        title: 'Trackzo'
    });
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


module.exports = router;
