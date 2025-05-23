const pool = require('../config/database');
const LabelTaskModel = require('../models/labelsTasks');

exports.atribuirEtiquetasaTarefas = async (req, res) => {
  const { task_id, label_id } = req.body;

  try {
    // Validar se task existe
    const taskExiste = await pool.query('SELECT id FROM tasks WHERE id = $1', [task_id]);
    if (taskExiste.rows.length === 0) {
      return res.status(404).json({ erro: 'Tarefa não encontrada' });
    }

    // Validar se etiqueta existe
    const labelsExiste = await pool.query('SELECT id FROM labels WHERE id = $1', [label_id]);
    if (labelsExiste.rows.length === 0) {
      return res.status(404).json({ erro: 'Etiqueta não encontrada' });
    }

    const resultado = await LabelTaskModel.criar(task_id, label_id);
    res.status(201).json(resultado);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarTarefasdaEtiqueta = async (req, res) => {
  const { label_id } = req.params;

  try {
    const tarefas = await LabelTaskModel.listarPorEtiqueta(label_id);
    res.status(200).json(tarefas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarEtiquetasdaTarefa = async (req, res) => {
  const { task_id } = req.params;

  try {
    const etiquetas = await LabelTaskModel.listarPorTarefa(task_id);
    res.status(200).json(etiquetas);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.removerEtiquetadaTarefa = async (req, res) => {
  const { task_id, label_id } = req.params;

  try {
    const resultado = await LabelTaskModel.remover(task_id, label_id);
    if (!resultado) {
      return res.status(404).json({ mensagem: 'Relação não encontrada' });
    }
    res.status(200).json({ mensagem: 'Etiqueta removida da tarefa com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};