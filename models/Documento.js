const mongoose = require('mongoose');

const documentoSchema = new mongoose.Schema({
  pacienteId: mongoose.Schema.Types.ObjectId,
  tipo_documento: String,
  url_arquivo: String,
  descricao: String,
  data_upload: Date
});

module.exports = mongoose.model('Documento', documentoSchema);
