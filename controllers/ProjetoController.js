const pool = require('../config/database');
const ProjetoModel = require('../models/projetos');

exports.criarProjeto = async (req, res) => {
  const { name_projects, description_projects, color_projects } = req.body;

  const query = `
    INSERT INTO projects (name_projects, description_projects, color_projects)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [name_projects, description_projects, color_projects];

  try {
    const result = await pool.query(query, values);
    const projeto = result.rows[0];
    res.status(201).json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Listar todas as tarefas
exports.listarProjeto = async (req, res) => {
  try {
    const projeto = await ProjetoModel.findAll();
    res.status(200).json(projeto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Editar uma tarefa
exports.editarProjeto = async (req, res) => {
  const { id } = req.params;
  const { name_projects, description_projects, color_projects } = req.body;

  const query = `
    UPDATE projects 
    SET name_projects = $1,
        description_projects = $2,
        color_projects = $3
    WHERE id = $4
    RETURNING *`;
  const values = [name_projects, description_projects, color_projects, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Excluir uma tarefa
exports.excluirProjeto = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM projects WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Projeto não encontrado' });
    }
    res.status(200).json({ message: 'Projeto excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
