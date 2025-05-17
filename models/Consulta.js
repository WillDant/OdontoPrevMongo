const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema({
  pacienteId: mongoose.Schema.Types.ObjectId,
  data: Date,
  dentista: String,
  especialidade: String,
  tipo_consulta: String,
  observacoes: String,
  realizada: Boolean
});

module.exports = mongoose.model('Consulta', consultaSchema);
