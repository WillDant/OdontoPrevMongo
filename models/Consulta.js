const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
  pacienteId: { type: mongoose.Schema.Types.ObjectId, required: true },
  data: { type: Date, required: true },
  dentista: { type: String, required: true },
  especialidade: { type: String, default: '' },
  tipo_consulta: { type: String, required: true },
  observacoes: { type: String, default: '' },
  realizada: { type: Boolean, default: false }
});

module.exports = mongoose.model('Consulta', consultaSchema);
