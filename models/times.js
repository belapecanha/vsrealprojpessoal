const pool = require('../config/database');

class TimeModel {
  // Listar todos os projetos
  static async findAll() {
    const query = `
      SELECT * FROM teams 
      ORDER BY created_at DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Criar um novo projeto
  static async create(data) {
    const { name_teams } = data;
    const query = `
      INSERT INTO teams (name_teams)  
      VALUES ($1)
      RETURNING *
    `;
    const result = await pool.query(query, [name_teams]);
    return result.rows[0];
  }

  static async update(id, name_teams) { 
    const query = `
      UPDATE teams  
      SET name_teams = $1 
      WHERE id = $2 
      RETURNING *
    `;
    const result = await pool.query(query, [name_teams, id]);
    return result.rows[0];
  }

  static async atualizar(id, dados) {
    const query = `
      UPDATE teams 
      SET name_teams = $1
      WHERE id = $2 AND is_deleted = FALSE
      RETURNING *`;

    const valores = [dados.name_teams, id];
    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  }

  // Deletar um projeto
  static async delete(id) {
    await db.query('DELETE FROM teams WHERE id = $1', [id]);
  }
}

module.exports = TimeModel;