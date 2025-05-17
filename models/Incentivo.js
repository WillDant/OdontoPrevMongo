const mongoose = require('mongoose');

const incentivoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String, default: '' },
  pontos_recompensa: { type: Number, required: true },
  ativo: { type: Boolean, default: true },
  data_inicio: { type: Date, default: Date.now },
  data_fim: { type: Date, default: null }
});

module.exports = mongoose.model('Incentivo', incentivoSchema);
