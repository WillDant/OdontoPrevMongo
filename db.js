const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/odontoprev');
    console.log('✅ Conectado ao MongoDB com sucesso!');
  } catch (error) {
    console.error('❌ Erro na conexão com o MongoDB:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
