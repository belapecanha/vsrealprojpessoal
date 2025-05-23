const pool = require('../config/database');
const TarefaModel = require('../models/tarefa');

exports.criarTarefa = async (req, res) => {
  try {
    const tarefa = await TarefaModel.criar(req.body);
    res.status(201).json(tarefa);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaModel.listarTodas();
    res.status(200).json(tarefas);
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    res.status(500).json({ erro: err.message });
  }
};

// Editar uma tarefa
exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const { title_tasks, description_tasks, status, priority } = req.body;

  const query = `
    UPDATE tasks 
    SET title_tasks = $1,
        description_tasks = $2,
        status = $3,
        priority = $4
    WHERE id = $5 AND is_deleted = FALSE
    RETURNING *`;
  const values = [title_tasks, description_tasks, status, priority, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

