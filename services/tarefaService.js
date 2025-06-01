const TarefaModel = require('../models/tarefa');

class TarefaService {
  static async criarTarefa(title_tasks, description_tasks, status, priority) {
    return await TarefaModel.criar(title_tasks, description_tasks, status, priority);
  }

  static async listarTarefas() {
    return await TarefaModel.listarTodas();
  }

  static async atualizarTarefa(id, title_tasks, description_tasks, status, priority) {
    return await TarefaModel.atualizar(id, title_tasks, description_tasks, status, priority);
  }

  static async excluirTarefa(id) {
    const pool = require('../config/database');
    const query = 'DELETE FROM tasks WHERE id = $1 RETURNING *';
    const values = [id];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
}

module.exports = TarefaService;
