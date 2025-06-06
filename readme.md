# Gerenciador de Tarefas - Projeto Pessoal (Módulo 2)

## Descrição
É um sistema web para gerenciamento de tarefas com suporte a múltiplos usuários, equipes, projetos, etiquetas e arquivos. O objetivo é facilitar a organização de atividades, especialmente para pessoas que lidam com grandes volumes de tarefas e enfrentam dificuldades em acompanhar prazos, prioridades e andamento das entregas.

---

## Estrutura de Pastas<br>
projetopessoal-modulo2/<br>
├── assets/<br>
│    └── modelorelacional-vsreal.png<br>
│    └── Diagramadearq.jpg<br>
│<br>
├── config/<br>
│    └── database.js<br>
│<br>
├── controllers/<br>
│    ├── labelController.js<br>
│    ├── labelTaskController.js<br>
│    ├── projetoController.js<br>
│    ├── tarefaController.js<br>
│    ├── timeController.js<br>
│    ├── timeProjetoController.js<br>
│    └── usuarioController.js<br>
│<br>
├── models/<br>
│    ├── labels.js<br>
│    ├── labelsTasks.js<br>
│    ├── projetos.js<br>
│    ├── tarefa.js<br>
│    ├── times.js<br>
│    ├── timesProjetos.js<br>
│    └── usuario.js<br>
│<br>
├── routes/<br>
│    ├── labelsRoutes.js<br>
│    ├── labelsTasksRoutes.js<br>
│    ├── projetosRoutes.js<br>
│    ├── tarefasRoutes.js<br>
│    ├── timesRoutes.js<br>
│    ├── timesProjetosRoutes.js<br>
│    └── usuariosRoutes.js<br>
│<br>
├── scripts/<br>
│    └── init.sql<br>
│    └── runSQLScripts.js<br>
│<br>
├── tests/<br>
│    └── api.test.http<br>
│<br>
├── services<br>
│    └── userService.js<br>
│<br>
├── views<br>
│    └── tarefas.ejs<br>
│<br>
├── .env<br>
├── .gitignore<br>
├── package.json<br>
├── package-lock.json<br>
├── README.md<br>
├── WAD.md<br>
├── rest.http<br>
└── server.js<br>

## Como executar o projeto localmente
1. Clone o repositório:
git clone https://github.com/belapecanha/vsrealprojpessoal
cd vsrealprojpessoal

2. Instale as dependências
npm install

3.Rodar o servidor
node server.js

4. Acessar no navegador
http://localhost:3000/




