const pool = require('../config/database');
const UsuarioModel = require('../models/usuario');

// Listar usuários
exports.listarUsuario = async (req, res) => {
  try {
    const usuarios = await UsuarioModel.findAll();
    res.status(200).json(usuarios); 
  } catch (err) {
    console.error('Error listing users:', err);
    res.status(500).json({ error: err.message });
  }
};

// Criar usuário
exports.criarUsuario = async (req, res) => {
  const { name_users, email, password } = req.body;

  const query = `
    INSERT INTO users (name_users, email, password)
    VALUES ($1, $2, $3)
    RETURNING *`;
  const values = [name_users, email, password];

  try {
    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: err.message });
  }
};

// Editar usuário
exports.editarUsuario = async (req, res) => {
  const { id } = req.params;
  const { name_users, email, password } = req.body;

  const query = `
    UPDATE users 
    SET name_users = $1,
        email = $2,
        password = $3
    WHERE id = $4
    RETURNING *`;
  const values = [name_users, email, password, id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: err.message });
  }
};

// Excluir usuário
exports.excluirUsuario = async (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM users WHERE id = $1 RETURNING *';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json({ message: 'Usuário excluído com sucesso' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: err.message });
  }
};

