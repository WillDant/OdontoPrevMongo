const mongoose = require('mongoose');

const tratamentoSchema = new mongoose.Schema({
  pacienteId: mongoose.Schema.Types.ObjectId,
  tipo_tratamento: String,
  data_inicio: Date,
  data_fim: Date,
  custo_estimado: Number,
  status: String,
  profissional_responsavel: String
});

module.exports = mongoose.model('Tratamento', tratamentoSchema);
