// multerConfig.js
const multer = require('multer');
const path = require('path');

// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Define o diretório onde os arquivos serão armazenados
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Define o nome do arquivo
  },
});

// Cria uma instância do Multer com a configuração de armazenamento
const upload = multer({ storage: storage });

module.exports = upload;
