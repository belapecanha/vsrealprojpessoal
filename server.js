// server.js (após correção)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const session = require('express-session');

const TarefaModel = require('./models/tarefa');

// Import all routes
const tarefasRoutes = require('./routes/tarefasRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const projetosRoutes = require('./routes/projetosRoutes');
const timesRoutes = require('./routes/timesRoutes');
const timesProjetosRoutes = require('./routes/timesProjetosRoutes');
const labelsRoutes = require('./routes/labelsRoutes');
const labelsTasksRoutes = require('./routes/labelsTasksRoutes');
const authRoutes = require('./routes/authRoutes');
const frontendRoutes = require('./routes/frontendRoutes');



const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Configurar sessão
app.use(session({
    secret: 'lala@2', 
    resave: false,
    saveUninitialized: false  
  }));

// Rotas

app.use('/api', tarefasRoutes);
app.use('/api', usuarioRoutes);
app.use('/', projetosRoutes);
app.use('/api', timesRoutes);
app.use('/api', timesProjetosRoutes);
app.use('/api', labelsRoutes);
app.use('/api', labelsTasksRoutes);
app.use('/auth', authRoutes);
app.use('/', frontendRoutes);


// Rota raiz
app.get('/', (req, res) => {
    res.redirect('/auth/login');
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});

