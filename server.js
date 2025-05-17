const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração para servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

connectDB();

// Models
const Paciente = require('./models/Paciente');
const Consulta = require('./models/Consulta');
const Tratamento = require('./models/Tratamento');
const Incentivo = require('./models/Incentivo');
const Gamificacao = require('./models/Gamificacao');
const Documento = require('./models/Documento');

// FUNÇÃO DE CRUD GENÉRICO
function registerCRUDRoutes(modelName, Model) {
  const route = '/' + modelName.toLowerCase();

  app.get(route, async (req, res) => {
    const data = await Model.find();
    res.json(data);
  });

  app.get(`${route}/:id`, async (req, res) => {
    const data = await Model.findById(req.params.id);
    res.json(data);
  });

  app.post(route, async (req, res) => {
    const item = new Model(req.body);
    await item.save();
    res.json({ message: `${modelName} criado com sucesso!` });
  });

  app.put(`${route}/:id`, async (req, res) => {
    await Model.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: `${modelName} atualizado com sucesso!` });
  });

  app.delete(`${route}/:id`, async (req, res) => {
    await Model.findByIdAndDelete(req.params.id);
    res.json({ message: `${modelName} removido com sucesso!` });
  });
}

// Registrar rotas CRUD para cada modelo
registerCRUDRoutes('Pacientes', Paciente);
registerCRUDRoutes('Consultas', Consulta);
registerCRUDRoutes('Tratamentos', Tratamento);
registerCRUDRoutes('Incentivos', Incentivo);
registerCRUDRoutes('Gamificacao', Gamificacao);
registerCRUDRoutes('Documentos', Documento);

// Adicionar logs na rota POST de /documentos para depuração
app.post('/documentos', async (req, res) => {
  console.log('📥 Dados recebidos no POST /documentos:', req.body); // Log dos dados recebidos
  try {
    const item = new Documento(req.body);
    await item.save();
    console.log('✅ Documento salvo no MongoDB:', item); // Log do documento salvo
    res.json({ message: 'Documento criado com sucesso!' });
  } catch (error) {
    console.error('❌ Erro ao salvar documento:', error); // Log de erro
    res.status(500).json({ message: 'Erro ao salvar documento', error });
  }
});

// Servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(3000, () => {
  console.log('🚀 Servidor rodando em http://localhost:3000');
});
