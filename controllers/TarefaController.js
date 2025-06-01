const TarefaService = require('../services/tarefaService');

exports.criarTarefa = async (req, res) => {
  try {
    const tarefa = await TarefaService.criarTarefa(req.body);
    res.status(201).json(tarefa);
  } catch (err) {
    console.error('Erro ao criar tarefa:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaService.listarTarefas();
    res.status(200).json(tarefas);
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    res.status(500).json({ erro: err.message });
  }
};


exports.editarTarefa = async (req, res) => {
  const { id } = req.params;
  const dados = req.body;

  try {
    const tarefa = await TarefaService.atualizarTarefa(id, dados);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json(tarefa);
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;

  try {
    const tarefa = await TarefaService.excluirTarefa(id);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.formNovaTarefa = (req, res) => {
  res.render('nova-tarefa');
};

exports.viewTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaModel.listarTodas();
    res.render('tarefas', { 
      title: 'Dashboard Kanban',
      tarefas: tarefas
    });
  } catch (error) {
    console.error('Erro:', error);
    res.status(500).render('error', { 
      title: 'Erro',
      error: 'Erro ao carregar tarefas'
    });
  }
};

