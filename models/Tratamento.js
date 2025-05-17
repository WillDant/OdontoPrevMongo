const mongoose = require('mongoose');

const tratamentoSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, required: true },
  tipo_tratamento: { type: String, required: true },
  data_inicio: { type: Date, default: Date.now },
  data_fim: { type: Date, default: null },
  custo_estimado: { type: Number, required: true },
  status: { type: String, default: 'pendente' },
  profissional_responsavel: { type: String, required: true }
});

module.exports = mongoose.model('Tratamento', tratamentoSchema);
