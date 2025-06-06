const pool = require('../config/database');

class TarefaModel {
  // Validar relações com outras tabelas
  static async validarRelacoes(usuario_id, time_id, projeto_id, label_id) {
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
    if (label_id) {
      const etiquetaExiste = await pool.query('SELECT id FROM labels WHERE id = $1', [label_id]);
      if (etiquetaExiste.rows.length === 0) {
        throw new Error('Etiqueta não encontrada');
      }
    }
  }

  // Criar uma nova tarefa
  static async criar(dados) {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      
      const { 
        title_tasks, 
        description_tasks, 
        status = 'Pendente', 
        priority = 'Média',
        user_id,
        team_id,
        project_id,
        label_id
      } = dados;


      const sanitizedTeamId = team_id === '' ? null : team_id;
      const sanitizedProjectId = project_id === '' ? null : project_id;
      const sanitizedLabelId = label_id === '' ? null : label_id;

      // Validar relações 
      await this.validarRelacoes(
        user_id, 
        sanitizedTeamId, 
        sanitizedProjectId, 
        sanitizedLabelId
      );

      // Criar a tarefa
      const queryTarefa = `
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
        RETURNING *`;

      const valores = [
        title_tasks, 
        description_tasks, 
        status, 
        priority,
        user_id,
        sanitizedTeamId,
        sanitizedProjectId
      ];

      const resultadoTarefa = await client.query(queryTarefa, valores);
      const tarefa = resultadoTarefa.rows[0];


      if (sanitizedLabelId) {
        await client.query(
          'INSERT INTO task_labels (task_id, label_id) VALUES ($1, $2)',
          [tarefa.id, sanitizedLabelId]
        );
      }

      await client.query('COMMIT');
      return tarefa;

    } catch (erro) {
      await client.query('ROLLBACK');
      throw erro;
    } finally {
      client.release();
    }
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
      ORDER BY t.id DESC`;
    
    const resultado = await pool.query(query);
    return resultado.rows;
  }

 // Atualizar um projeto
  static async update( title_tasks, description_tasks, status, priority,user_id,team_id,project_id ) {
    const result = await db.query(
      'UPDATE tasks SET title_tasks = $1, description_tasks = $2, status = $3, priority = $4, user_id = $5, team_id = $6, project_id = $7 WHERE id = $8 RETURNING *',
      [title_tasks, description_tasks, status, priority,user_id,team_id,project_id, id]
    );
    return result.rows[0];
  }

  // Atualizar uma tarefa existente
  static async atualizar(id, dados) {
    const query = `
      UPDATE tasks 
      SET 
        title_tasks = $1,
        description_tasks = $2,
        status = $3,
        priority = $4
      WHERE id = $5 AND is_deleted = FALSE
      RETURNING *`;

    const valores = [
      dados.title_tasks,
      dados.description_tasks,
      dados.status,
      dados.priority,
      id
    ];

    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  }
  static async buscarPorId(id) {
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
      WHERE t.id = $1 AND t.is_deleted = FALSE`;

    const resultado = await pool.query(query, [id]);
    return resultado.rows[0];
  }
}


module.exports = TarefaModel;