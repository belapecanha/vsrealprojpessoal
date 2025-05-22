const pool = require('../config/database');

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
    const query = `
      INSERT INTO users (name_users, email, password)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await pool.query(query, [name_users, email, password]);
    return result.rows[0];
  }

  // Atualizar uma task existente
  static async update(name_users, email, password) {
    const result = await db.query(
      'UPDATE tasks SET name_users = $1, email = $2, status = $3, password = $4 WHERE id = $5 RETURNING *',
      [name_users, email, password, id]
    );
    return result.rows[0];
  }

  // Deletar uma task
  static async delete(id) {
    await db.query('DELETE FROM users WHERE id = $1', [id]);
  }
}

module.exports = UsuarioModel;