const mongoose = require('mongoose');

const incentivoSchema = new mongoose.Schema({
  titulo: String,
  descricao: String,
  pontos_recompensa: Number,
  ativo: Boolean,
  data_inicio: Date,
  data_fim: Date
});

module.exports = mongoose.model('Incentivo', incentivoSchema);
