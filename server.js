const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const tarefasRoutes = require('./routes/tarefasRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');
const projetosRoutes = require('./routes/projetosRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', tarefasRoutes);
app.use('/api', usuarioRoutes);
app.use('/api', projetosRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
//0-