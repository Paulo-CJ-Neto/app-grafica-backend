const https = require('https');
const http = require('http'); // Adicionando http para usar localmente
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const clienteRoutes = require('./routes/routes');

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', clienteRoutes);

app.get('/ping', (req, res) => {
  res.send('pong');
});

app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor da gráfica!');
});

const isProduction = process.env.NODE_ENV === 'production'; // Verifica se está no ambiente de produção

if (isProduction) {
  // Ambiente de produção (EC2) - usa HTTPS com certificados
  const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/api.agraficadoseventos.com.br/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/api.agraficadoseventos.com.br/fullchain.pem'),
  };

  // Inicia o servidor HTTPS
  https.createServer(options, app).listen(443, '0.0.0.0', () => {
    console.log('Servidor HTTPS rodando na porta 443...');
  });
} else {
  // Ambiente de desenvolvimento (local) - usa HTTP
  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://localhost:${PORT}...`);
  });
}
