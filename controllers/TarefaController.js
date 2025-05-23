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
  const { title_tasks, description_tasks, status = 'Pendente', priority = 'Média', user_id, team_id, project_id } = req.body;

  const query = `
    UPDATE tasks 
    SET title_tasks = $1,
        description_tasks = $2,
        status = $3,
        priority = $4,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = $5
    RETURNING *`;
  const values = [title_tasks, description_tasks, status = 'Pendente', priority = 'Média', user_id, team_id, project_id, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
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

