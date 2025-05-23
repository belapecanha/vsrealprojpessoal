const pool = require('../config/database');

class LabelTaskModel {
  static async criar(task_id, label_id) {
    try {
      const query = `
        INSERT INTO task_labels (task_id, label_id)
        VALUES ($1, $2)
        RETURNING *`;
      
      const result = await pool.query(query, [task_id, label_id]);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Erro ao criar relação: ${error.message}`);
    }
  }

  static async listarPorTarefa(task_id) {
    const query = `
      SELECT l.* 
      FROM task_labels tl
      JOIN labels l ON tl.label_id = l.id
      WHERE tl.task_id = $1`;
    
    const result = await pool.query(query, [task_id]);
    return result.rows;
  }

  static async listarPorEtiqueta(label_id) {
    const query = `
      SELECT t.* 
      FROM task_labels tl
      JOIN tasks t ON tl.task_id = t.id
      WHERE tl.label_id = $1`;
    
    const result = await pool.query(query, [label_id]);
    return result.rows;
  }

  static async remover(task_id, label_id) {
    const query = `
      DELETE FROM task_labels
      WHERE task_id = $1 AND label_id = $2
      RETURNING *`;
    
    const result = await pool.query(query, [task_id, label_id]);
    return result.rows[0];
  }

  static async atualizar(task_id, label_id, dados) {
    const query = `
      UPDATE task_labels 
      SET 
        task_id = $1,
        label_id = $2
      WHERE task_id = $3 AND label_id = $4
      RETURNING *`;

    const valores = [
      dados.task_id,
      dados.label_id,
      task_id,
      label_id
    ];

    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
  }
}

module.exports = LabelTaskModel;