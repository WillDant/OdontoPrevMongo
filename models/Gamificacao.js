const mongoose = require('mongoose');

const gamificacaoSchema = new mongoose.Schema({
  pacienteId: mongoose.Schema.Types.ObjectId,
  desafio: String,
  concluido: Boolean,
  pontos_ganhos: Number,
  data_conclusao: Date
});

module.exports = mongoose.model('Gamificacao', gamificacaoSchema);
