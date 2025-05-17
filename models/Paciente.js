// models/Paciente.js
const mongoose = require('mongoose');

const pacienteSchema = new mongoose.Schema({
  nome: String,
  idade: Number,
  sexo: String,
  plano: String,
  cidade: String,
  estado: String,
  possui_trat_preventivo: Boolean,
  possui_trat_curativo: Boolean,
  score_risco: Number
});

module.exports = mongoose.model('Paciente', pacienteSchema);
