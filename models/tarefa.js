const pool = require('../config/database');

class TarefaModel {
  // Listar todos as tasks
  static async findAll() {
    const query = `
      SELECT 
        t.*,
        u.name_users,
        tm.name_teams,
        p.name_projects
      FROM tasks t
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN teams tm ON t.team_id = tm.id
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.is_deleted = FALSE
      ORDER BY t.created_at DESC`;
    
    const result = await pool.query(query);
    return result.rows;
  }

  // Criar uma nova task
  static async create(data) {
    const { title_tasks, description_tasks, status, priority,user_id,
      team_id,
      project_id } = data;
    const query = `
      INSERT INTO tasks (title_tasks, description_tasks, status, priority, user_id, team_id, project_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING 
        t.*,
        u.name_users,
        tm.name_teams,
        p.name_projects
      FROM tasks t
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN teams tm ON t.team_id = tm.id
      LEFT JOIN projects p ON t.project_id = p.id
      WHERE t.id = (SELECT currval('tasks_id_seq'))`;
    
    const values = [
      title_tasks, 
      description_tasks, 
      status || 'Pendente', 
      priority || 'Média',
      user_id,
      team_id,
      project_id
    ];

    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = TarefaModel;