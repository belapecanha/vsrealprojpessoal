const pool = require('../config/database');

class LabelModel {
  // Listar todos as labels
  static async findAll() {
    const query = `
      SELECT * FROM labels 
      ORDER BY id DESC
    `;
    const result = await pool.query(query);
    return result.rows;
  }

  // Criar uma nova label
  static async create(data) {
    const { name_labels, color_labels, description_labels } = data;
    const query = `
      INSERT INTO labels (name_labels, color_labels, description_labels)  
      VALUES ($1)
      RETURNING *
    `;
    const result = await pool.query(query, [name_labels, color_labels, description_labels]);
    return result.rows[0];
  }

  static async update(id, name_labels, color_labels, description_labels) { 
    const query = `
      UPDATE labels
      SET name_labels = $1, 
          color_labels = $2, 
          description_labels = $3
      WHERE id = $4  
      RETURNING *
    `;
    const result = await pool.query(query, [name_labels, color_labels, description_labels, id]);
    return result.rows[0];
  }

  // Deleta uma labeç
  static async delete(id) {
    await db.query('DELETE FROM labels WHERE id = $1', [id]);
  }
}

module.exports = LabelModel;