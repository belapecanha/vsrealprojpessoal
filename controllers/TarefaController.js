const TarefaModel = require('../models/tarefa');
const TarefaService = require('../services/tarefaService');
const ProjetoModel = require('../models/projetos'); 
const TimeModel = require('../models/times'); 

exports.criarTarefa = async (req, res) => {
  try {
    // Descomente se autenticação for necessária
    // if (!req.session.userId) {
    //   throw new Error('Usuário não autenticado');
    // }

    console.log('Dados recebidos para criar tarefa:', req.body);
    console.log('ID do usuário na sessão:', req.session.userId);
    const dados = {
      ...req.body,
      user_id: req.session.userId 
    };

    const tarefa = await TarefaService.criarTarefa(dados);

    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(201).json(tarefa);
    }
    console.log('Tarefa criada com sucesso:', tarefa);
    res.redirect('/kanban');
  } catch (error) {
    console.error('Erro ao criar tarefa:', error);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(500).json({ erro: error.message });
    }
    res.render('nova-tarefa', { 
      title: 'Nova Tarefa',
      error: error.message,
      projetos: await ProjetoModel.findAll(),
      times: await TimeModel.findAll()
    });
  }
};

exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaService.listarTarefas(req.session.userId);
    res.status(200).json(tarefas);
  } catch (err) {
    console.error('Erro ao listar tarefas:', err);
    res.status(500).json({ erro: err.message });
  }
};

exports.editarTarefa = async (req, res) => {
  try {
    // if (!req.session.userId) {
    //   throw new Error('Usuário não autenticado');
    // }

    const dados = {
      title_tasks: req.body.title_tasks,
      description_tasks: req.body.description_tasks,
      status: req.body.status,
      priority: req.body.priority,
      user_id: req.session.userId,
      team_id: req.body.team_id,
      project_id: req.body.project_id,
      label_id: req.body.label_id,
      deadline: req.body.deadline
    };

    const tarefa = await TarefaService.atualizarTarefa(req.params.id, dados);
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(200).json(tarefa);
    }
    res.redirect('/kanban');
  } catch (err) {
    console.error('Erro ao atualizar tarefa:', err);
    const projetos = await ProjetoModel.findAll();
    const times = await TimeModel.findAll();
    res.status(500).render('editar-tarefa', {
      title: 'Editar Tarefa',
      tarefa: req.body,
      projetos,
      times,
      error: err.message
    });
  }
};

exports.excluirTarefa = async (req, res) => {
  const { id } = req.params;
  try {
    const tarefa = await TarefaService.excluirTarefa(id, req.session.userId);
    if (!tarefa) {
      return res.status(404).json({ message: 'Tarefa não encontrada' });
    }
    if (req.xhr || req.headers.accept?.includes('application/json')) {
      return res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    }
    res.redirect('/kanban');
  } catch (err) {
    console.error('Erro ao excluir tarefa:', err);
    res.status(500).json({ error: err.message });
  }
};

exports.viewTarefas = async (req, res) => {
  try {
    const tarefas = await TarefaService.listarTarefas(req.session.userId);
    res.render('tarefas', { 
      title: 'Quadro Kanban',
      tarefas: tarefas || [],
      projetos: await ProjetoModel.findAll(),
      times: await TimeModel.findAll(),
      error: null
    });
  } catch (error) {
    console.error('Erro ao carregar tarefas:', error);
    res.render('tarefas', { 
      title: 'Quadro Kanban',
      tarefas: [],
      projetos: await ProjetoModel.findAll(),
      times: await TimeModel.findAll(),
      error: 'Erro ao carregar tarefas'
    });
  }
};

exports.viewEditar = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await TarefaService.buscarPorId(id, req.session?.userId);
    const projetos = await ProjetoModel.findAll();
    const times = await TimeModel.findAll();

    return res.render('edita-tarefa', {
      title: 'Editar Tarefa',
      tarefa,
      projetos,
      times,
      error: null
    });
  } catch (error) {
    console.error('Erro ao carregar a tarefa para edição:', error);
    const projetos = await ProjetoModel.findAll();
    const times = await TimeModel.findAll();

    return res.status(500).render('edita-tarefa', {
      title: 'Editar Tarefa',
      tarefa: {},
      projetos,
      times,
      error: error.message
    });
  }
};