const express = require('express')
const bodyParser = require('body-parser')
const clienteRoutes = require('./routes/routes')

const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', clienteRoutes)

app.get('/', (req, res) => {
  res.send('Bem vindo ao servidor da grafica!')
})

const PORT = 3000
app.listen(PORT, '0.0.0.0', () => {
  console.log(`servidor rodando na porta ${PORT}...`);
})