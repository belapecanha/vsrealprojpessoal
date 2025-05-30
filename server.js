const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const TarefaModel = require('./models/tarefa');

// Import all routes
const tarefasRoutes = require('./routes/tarefasRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const projetosRoutes = require('./routes/projetosRoutes');
const timesRoutes = require('./routes/timesRoutes');
const timesProjetosRoutes = require('./routes/timesProjetosRoutes');
const labelsRoutes = require('./routes/labelsRoutes');
const labelsTasksRoutes = require('./routes/labelsTasksRoutes');
const frontendRoutes = require('./routes/frontendRoutes'); // Add this line

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/styles', express.static(path.join(__dirname, 'styles')));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes
app.use('/', frontendRoutes); 
app.use('/api', tarefasRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', projetosRoutes);
app.use('/api', timesRoutes);
app.use('/api', timesProjetosRoutes);
app.use('/api', labelsRoutes);
app.use('/api', labelsTasksRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

