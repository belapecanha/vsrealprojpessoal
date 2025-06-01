const pool = require('../config/database');
const bcrypt = require('bcrypt');

class UsuarioModel {
  // Listar todos os usuários
  static async findAll() {
    const query = `
      SELECT * FROM users 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Criar um novo usuário
  static async create(data) {
    const { name_users, email, password } = data;
    
    // Hash da senha
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const query = `
      INSERT INTO users (name_users, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, name_users, email, created_at
    `;
    
    const result = await pool.query(query, [name_users, email, hashedPassword]);
    return result.rows[0];
  }

  // Atualizar uma task existente
  static async atualizar(id, dados) {
    const query = `
      UPDATE users 
      SET 
        name_users = $1,
        email = $2,
        password = $3
      WHERE id = $4 AND is_deleted = FALSE
      RETURNING *`;

    const valores = [
      dados.name_users,
      dados.email,
      dados.password,
      id
    ];

    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  }

  // Deletar uma task
  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
  }

  static async buscarPorEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }

  static async validarSenha(senhaPlana, senhaHash) {
    return await bcrypt.compare(senhaPlana, senhaHash);
  }
}

module.exports = UsuarioModel;