const pool = require('../config/database');

class TimeProjetoModel {
  static async criar(time_id, projeto_id) {
    const query = `
      INSERT INTO team_projects (team_id, project_id)
      VALUES ($1, $2)
      RETURNING *`;
    
    const result = await pool.query(query, [time_id, projeto_id]);
    return result.rows[0];
  }

  static async buscarPorTime(time_id) {
    const query = `
      SELECT p.*, tp.assigned_at
      FROM team_projects tp
      JOIN projects p ON tp.project_id = p.id
      WHERE tp.team_id = $1`;
    
    const result = await pool.query(query, [time_id]);
    return result.rows;
  }

  static async buscarPorProjeto(projeto_id) {
    const query = `
      SELECT t.*, tp.assigned_at
      FROM team_projects tp
      JOIN teams t ON tp.team_id = t.id
      WHERE tp.project_id = $1`;
    
    const result = await pool.query(query, [projeto_id]);
    return result.rows;
  }

  static async remover(time_id, projeto_id) {
    const query = `
      DELETE FROM team_projects
      WHERE team_id = $1 AND project_id = $2
      RETURNING *`;
    
    const result = await pool.query(query, [time_id, projeto_id]);
    return result.rows[0];
  }
}

module.exports = TimeProjetoModel;