const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/TarefaController');
const pool = require('../config/database'); // Corrigindo o caminho do banco de dados

// Listar tarefas e renderizar a página
router.get('/tarefas', async (req, res) => {
  try {
    //tem que estar no controller
    res.send({ tarefas: result.rows });
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    res.status(500).send(err.message);
  }
  //fim do controller
});

// Criar tarefa
router.post('/tarefas', TarefaController.criarTarefa);

// Editar tarefa
router.post('/tarefas/edit/:id', TarefaController.editarTarefa);

// "Excluir" tarefa (exclusão lógica)
router.post('/tarefas/delete/:id', TarefaController.excluirTarefa);

module.exports = router;

