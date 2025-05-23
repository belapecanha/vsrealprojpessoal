const pool = require('../config/database');
const TimeModel = require('../models/times'); // Changed from 'time' to 'times'

exports.criarTime = async (req, res) => {
  const { name_teams } = req.body;

  const query = `
    INSERT INTO teams (name_teams)
    VALUES ($1)
    RETURNING *`;
  const values = [name_teams];

  try {
    const result = await pool.query(query, values);
    const time = result.rows[0];
    res.status(201).json(time);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarTime = async (req, res) => {
  try {
    const time = await TimeModel.findAll();
    res.status(200).json(time);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarTime = async (req, res) => {
  const { id } = req.params;
  const { name_teams } = req.body;

  const query = `
    UPDATE teams 
    SET name_teams = $1  /* Removed extra comma */
    WHERE id = $2
    RETURNING *`;
  const values = [name_teams, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirTime = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM teams WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Time não encontrado' });
    }
    res.status(200).json({ message: 'Time excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
