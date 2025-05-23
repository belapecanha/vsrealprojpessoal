const pool = require('../config/database');
const LabelModel = require('../models/labels'); // Changed from 'time' to 'times'

exports.criarLabel = async (req, res) => {
  const { name_labels, color_labels, description_labels } = req.body;

  const query = `
    INSERT INTO labels (name_labels, color_labels, description_labels)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [name_labels, color_labels, description_labels];

  try {
    const result = await pool.query(query, values);
    const label = result.rows[0];
    res.status(201).json(label);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarLabel = async (req, res) => {
  try {
    const label = await LabelModel.findAll();
    res.status(200).json(label);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarLabel = async (req, res) => {
  const { id } = req.params;
  const { name_labels, color_labels, description_labels } = req.body;

  const query = `
    UPDATE labels 
    SET name_labels = $1,
        color_labels = $2,
        description_labels = $3
    WHERE id = $4
    RETURNING *`;
  const values = [name_labels, color_labels, description_labels, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Etiqueta não encontrada' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirLabel = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM labels WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Etiqueta não encontrada' });
    }
    res.status(200).json({ message: 'Etiqueta excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
