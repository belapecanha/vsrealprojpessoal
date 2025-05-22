const db = require('../config/db');

module.exports = {
  // Listar todos as tasks
  async findAll() {
    const result = await pool.query(`
        SELECT * FROM tasks
        WHERE is_deleted = FALSE
        ORDER BY created_at DESC
        `);    return result.rows;
    },

  // Criar uma nova task
  async create(title_tasks, description_tasks) {
    const result = await db.query(
      'INSERT INTO tasks (title_tasks, description_tasks) VALUES ($1, $2) RETURNING *',
      [title_tasks, description_tasks]
    );
    return result.rows[0];
  },

  // Atualizar um professor existente
  async update(id, nome, email) {
    const result = await db.query(
      'UPDATE professor SET nome = $1, email = $2 WHERE id = $3 RETURNING *',
      [nome, email, id]
    );
    return result.rows[0];
  },

  // Deletar um professor
  async delete(id) {
    await db.query('DELETE FROM professor WHERE id = $1', [id]);
  }
};