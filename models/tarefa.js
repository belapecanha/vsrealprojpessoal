const pool = require('../config/database');

class TarefaModel {
  // Listar todos as tasks
  static async findAll() {
    const query = `
      SELECT * FROM tasks 
      WHERE is_deleted = FALSE 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Criar uma nova task
  static async create(data) {
    const { title_tasks, description_tasks, status, priority } = data;
    const query = `
      INSERT INTO tasks (title_tasks, description_tasks, status, priority)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const result = await pool.query(query, [title_tasks, description_tasks, status, priority]);
    return result.rows[0];
  }

  // Atualizar uma task existente
  static async update(title_tasks, description_tasks, status, priority ) {
    const result = await db.query(
      'UPDATE tasks SET title_tasks = $1, description_tasks = $2, status = $3, priority = $4 WHERE id = $5 RETURNING *',
      [title_tasks, description_tasks, status, priority, id]
    );
    return result.rows[0];
  }

  // Deletar uma task
  static async delete(id) {
    await db.query('DELETE FROM task WHERE id = $1', [id]);
  }
}

module.exports = TarefaModel;