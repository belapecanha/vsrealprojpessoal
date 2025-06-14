# Gerenciador de Tarefas - Projeto Pessoal (Módulo 2)

## Descrição
Trackzo é um sistema web para gerenciamento de tarefas em formato kanban, que permite o cadastro seguro de usuários, criação de equipes e projetos, além da organização visual das tarefas por status e prioridade. O sistema possibilita criar, editar, visualizar e excluir tarefas, associando cada uma a um projeto e a uma equipe específica. Também oferece autenticação de usuários, controle de acesso, visualização detalhada das tarefas. O objetivo é facilitar a organização de atividades, especialmente para pessoas que lidam com grandes volumes de tarefas e enfrentam dificuldades em acompanhar prazos, prioridades e o andamento das entregas, promovendo maior produtividade e controle sobre o fluxo de trabalho.
---

## Estrutura de Pastas<br>
projetopessoal-modulo2/<br>
├── assets/<br>
│    └── blob-scene-haikei (1).svg<br>
│    └── blob-scene-haikei.svg<br>
│    └── modelorelacional-vsreal.png<br>
│    └── Diagramadearq.jpg<br>
│    └── Cadastro.png<br>
│    └── editartarefa.png<br>
│    └── kanban1.png<br>
│    └── kanban2.png<br>
│    └── kanban3.png<br>
│    └── login.png<br>
│    └── novatarefa.png<br>
│    └── novoprojeto.png<br>
│    └── novotime.png<br>
│    └── visualizartarefa.png<br>
│    └── stacked-peaks.svg<br>
│<br>
├── config/<br>
│    └── database.js<br>
│<br>
├── controllers/<br>
│    ├── authController.js<br>
│    ├── projetoController.js<br>
│    ├── tarefaController.js<br>
│    ├── timeController.js<br>
│    └── usuarioController.js<br>
│<br>
├── middleware/<br>
│    ├── authMiddleware.js<br>
│    ├── errorMidleware.js<br>
│<br>
├── models/<br>
│    ├── projetos.js<br>
│    ├── tarefa.js<br>
│    ├── times.js<br>
│    └── usuario.js<br>
│<br>
├── routes/<br>
│    ├── authRoutes.js<br>
│    ├── projetosRoutes.js<br>
│    ├── frontendRoutes.js<br>
│    ├── tarefasRoutes.js<br>
│    ├── timesRoutes.js<br>
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
│    └── tarefaService.js<br>
│<br>
├── styles<br>
│    └── auth.css<br>
│    └── forms.css<br>
│    └── styles.css<br>
│<br>
├── views<br>
│    └── cadastro.ejs<br>
│    └── edita-tarefa.ejs<br>
│    └── nova-tarefa.ejs<br>
│    └── novo-projeto.ejs<br>
│    └── novo-time.ejs<br>
│    └── tarefas.ejs<br>
│    └── visualizacao-tarefa.ejs<br>
│<br>
├── tests<br>
│    └── api.test.http<br>
│<br>
├── .env<br>
├── .gitignore<br>
├── package.json<br>
├── package-lock.json<br>
├── README.md<br>
├── WAD.md<br>
├── rest.http<br>
└── server.js<br>

## Tecnologias Utilizadas
Node.js
Express.js
PostgreSQL
EJS (Embedded JavaScript Templates)
bcrypt
express-session
CSS3

## Interface
Aqui você poderá ver algumas telas da interface do site. Para ter acesso a todas as telas e demias descrições do frontend acesse o WAD.<br>
<h2 align = "center"> Tela de login</h2>

![Image](./assets/login.png)<br>
<p align = "center">para visualizar a tela de cadastro consulte o WAD</p><br>

<h2 align = "center"> Tela do kanban </h2>

![Image](./assets/kanban1.png)
<p align = "center">para visualizar o resto do kanban consulte o WAD</p><br>

<h2 align = "center"> Tela de nova tarefa</h2>

![Image](./assets/novatarefa.png)
<p align = "center">para visualizar a tela de novo projeto e novo time acesse o WAD</p><br>

<h2 align = "center"> Tela da visualização da tarefa</h2>

![Image](./assets/visualizartarefa.png)<br>

<h2 align = "center"> Tela de editar tarefa</h2>

![Image](./assets/editartarefa.png)
<p align = "center">para visualizar a tela de novo projeto e novo time acesse o WAD</p><br>

<h2 align = "center"> Nova tarefa</h2>

![Image](./assets/novatarefa.png)
<p align = "center">para visualizar a tela de novo projeto e novo time acesse o WAD</p><br>


## Video demonstrativo
<a href="https://www.loom.com/share/6133401aa57f45d2ae829e7b1265d300?sid=af9cc838-9f13-436d-a93d-5f54fbe4a370
">Link do vídeo</a>  


## Como executar o projeto localmente
1. Clone o repositório:
git clone https://github.com/belapecanha/vsrealprojpessoal
cd vsrealprojpessoal

2. Instale as dependências
npm install

3. Configure o banco de dados
crie um banco PostgreSQL
DB_HOST= 
DB_PORT=5432
DB_USER= 
DB_PASSWORD=
DB_DATABASE=postgres
DB_SSL=false
PORT=3000

4. Rode o servidor
node server.js

5. Acessar no navegador
http://localhost:3000/




