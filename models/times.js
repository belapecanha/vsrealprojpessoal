const pool = require('../config/database');

class TimeModel {
  // Listar todos os times
  static async findAll() {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM teams 
        ORDER BY created_at DESC
      `;
      const result = await client.query(query);
      return result.rows;
    } catch (error) {
      console.error('Error in findAll:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Criar um novo time
  static async criar(data) {
    const client = await pool.connect();
    try {
      const { name_teams } = data;
      const query = `
        INSERT INTO teams (name_teams)
        VALUES ($1)
        RETURNING *
      `;
      const result = await client.query(query, [name_teams]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in criar:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Atualizar um time
  static async atualizar(id, dados) {
    const client = await pool.connect();
    try {
      const query = `
        UPDATE teams 
        SET 
          name_teams = $1,
        WHERE id = $2 AND is_deleted = FALSE
        RETURNING *`;

      const valores = [
        dados.name_teams,
        id
      ];

      const resultado = await client.query(query, valores);
      return resultado.rows[0];
    } catch (error) {
      console.error('Error in atualizar:', error);
      throw error;
    } finally {
      client.release();
    }
  }

//deletar time
  static async delete(id) {
    const client = await pool.connect();
    try {
      const query = `DELETE FROM teams WHERE id = $1 RETURNING *`;
      const result = await client.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in delete:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  //buscar times por ID
  static async buscarPorId(id) {
    const client = await pool.connect();
    try {
      const query = `
        SELECT * FROM teams 
        WHERE id = $1 AND is_deleted = FALSE
      `;
      const result = await client.query(query, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Error in buscarPorId:', error);
      throw error;
    } finally {
      client.release();
    }
  }
}
module.exports = TimeModel;