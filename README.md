# Sistema OdontoPrev - Gerenciamento de Dados Odontológicos 🦷

Sistema de gerenciamento odontológico desenvolvido com MongoDB, Node.js e Express, oferecendo funcionalidades CRUD completas e gamificação para engajamento dos pacientes.

## 📋 Sobre o Projeto

O Sistema OdontoPrev é uma aplicação web moderna para gerenciamento de dados odontológicos, que implementa operações CRUD completas utilizando MongoDB como banco de dados NoSQL. O sistema foi projetado para gerenciar informações de pacientes, consultas, tratamentos e implementar recursos de gamificação para melhorar o engajamento dos pacientes.

### 💡 Por que MongoDB?

A escolha do MongoDB como banco de dados NoSQL foi baseada nos seguintes fatores:

1. **Flexibilidade do Schema**
   - Permite evolução natural dos modelos de dados
   - Suporta documentos com estruturas variáveis
   - Facilita a adição de novos campos

2. **Escalabilidade Horizontal**
   - Suporte nativo para sharding e replicação
   - Ideal para crescimento do volume de dados
   - Performance consistente em grandes volumes

3. **Performance em Consultas**
   - Queries otimizadas para JSON
   - Excelente performance em leituras
   - Índices eficientes

4. **Integração Moderna**
   - Perfeita integração com Node.js/Express
   - Suporte nativo a JSON
   - Mongoose ODM para modelagem

## 🏗️ Arquitetura do Projeto

### Estrutura de Diretórios
```
📁 OdontoPrevMongo/
├── 📄 db.js                # Configuração do MongoDB
├── 📄 index.html           # Interface do usuário
├── 📄 package.json         # Dependências do projeto
├── 📄 server.js            # Servidor Express
├── 📁 models/              # Modelos do Mongoose
│   ├── Consulta.js
│   ├── Documento.js
│   ├── Gamificacao.js
│   ├── Incentivo.js
│   ├── Paciente.js
│   └── Tratamento.js
└── 📁 public/
    └── main.js            # JavaScript frontend
```

### 🗃️ Modelos de Dados

1. **Pacientes**
\`\`\`javascript
{
  nome: String,
  idade: Number,
  sexo: String,
  plano: String,
  cidade: String,
  estado: String,
  possui_trat_preventivo: Boolean,
  possui_trat_curativo: Boolean,
  score_risco: Number
}
\`\`\`

2. **Consultas**
\`\`\`javascript
{
  pacienteId: ObjectId,
  data: Date,
  dentista: String,
  especialidade: String,
  tipo_consulta: String,
  observacoes: String,
  realizada: Boolean
}
\`\`\`

3. **Tratamentos**
\`\`\`javascript
{
  pacienteId: ObjectId,
  tipo_tratamento: String,
  data_inicio: Date,
  data_fim: Date,
  custo_estimado: Number,
  status: String,
  profissional_responsavel: String
}
\`\`\`

4. **Incentivos**
\`\`\`javascript
{
  titulo: String,
  descricao: String,
  pontos_recompensa: Number,
  ativo: Boolean,
  data_inicio: Date,
  data_fim: Date
}
\`\`\`

5. **Gamificação**
\`\`\`javascript
{
  pacienteId: ObjectId,
  desafio: String,
  concluido: Boolean,
  pontos_ganhos: Number,
  data_conclusao: Date
}
\`\`\`

6. **Documentos**
\`\`\`javascript
{
  pacienteId: ObjectId,
  tipo_documento: String,
  url_arquivo: String,
  descricao: String,
  data_upload: Date
}
\`\`\`

## 🛠️ Tecnologias Utilizadas

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - Mongoose

- **Frontend**
  - HTML5
  - CSS3
  - JavaScript
  - Bootstrap 5
  - jQuery
  - DataTables

## ⚙️ Funcionalidades

1. **Gestão de Pacientes**
   - Cadastro completo
   - Histórico de tratamentos
   - Score de risco
   - Documentação digital

2. **Gestão de Consultas**
   - Agendamento
   - Acompanhamento
   - Histórico

3. **Tratamentos**
   - Registro de procedimentos
   - Custos
   - Status e acompanhamento

4. **Sistema de Gamificação**
   - Incentivos
   - Pontuação
   - Desafios
   - Engajamento do paciente

5. **Gestão Documental**
   - Upload de arquivos
   - Organização por tipo
   - Histórico de documentos

## 🚀 Como Executar

1. **Pré-requisitos**
   - Node.js instalado
   - MongoDB instalado e rodando
   - NPM ou Yarn

2. **Instalação**
\`\`\`bash
# Clone o repositório
git clone [url-do-repositorio]

# Entre no diretório
cd OdontoPrevMongo

# Instale as dependências
npm install

# Inicie o servidor
npm start
\`\`\`

3. **Acesso**
   - Abra o navegador em `http://localhost:3000`

## 👥 Equipe

- **Willian Dantas** - Desenvolvedor Full Stack
- **João Vitor Santana** - Desenvolvedor Full Stack
- **Ryan Azanha** - Desenvolvedor Full Stack

## 📄 Licença

Este projeto está sob a licença ISC. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter pull requests.

---
Desenvolvido com 💙 pela Equipe OdontoPrev
