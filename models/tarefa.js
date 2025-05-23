const pool = require('../config/database');

class TarefaModel {
  // Validar relações com outras tabelas
  static async validarRelacoes(usuario_id, time_id, projeto_id) {
    if (usuario_id) {
      const usuarioExiste = await pool.query('SELECT id FROM users WHERE id = $1', [usuario_id]);
      if (usuarioExiste.rows.length === 0) {
        throw new Error('Usuário não encontrado');
      }
    }

    if (time_id) {
      const timeExiste = await pool.query('SELECT id FROM teams WHERE id = $1', [time_id]);
      if (timeExiste.rows.length === 0) {
        throw new Error('Time não encontrado');
      }
    }

    if (projeto_id) {
      const projetoExiste = await pool.query('SELECT id FROM projects WHERE id = $1', [projeto_id]);
      if (projetoExiste.rows.length === 0) {
        throw new Error('Projeto não encontrado');
      }
    }
  }

  // Criar uma nova tarefa
  static async criar(dados) {
    const { 
      title_tasks, 
      description_tasks, 
      status = 'Pendente', 
      priority = 'Média',
      user_id,
      team_id,
      project_id 
    } = dados;

    // Validar relações antes de criar
    await this.validarRelacoes(user_id, team_id, project_id);

    const query = `
      WITH inserted_task AS (
        INSERT INTO tasks (
          title_tasks, 
          description_tasks, 
          status, 
          priority,
          user_id,
          team_id,
          project_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
      )
      SELECT 
        t.*,
        u.name_users,
        tm.name_teams,
        p.name_projects
      FROM inserted_task t
      LEFT JOIN users u ON t.user_id = u.id
      LEFT JOIN teams tm ON t.team_id = tm.id
      LEFT JOIN projects p ON t.project_id = p.id`;

    const valores = [
      title_tasks, 
      description_tasks, 
      status, 
      priority,
      user_id,
      team_id,
      project_id
    ];

    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  }

  // Listar todas as tarefas
  static async listarTodas() {
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
    
    const resultado = await pool.query(query);
    return resultado.rows;
  }
}

module.exports = TarefaModel;