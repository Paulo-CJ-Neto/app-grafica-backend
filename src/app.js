const express = require('express')
const bodyParser = require('body-parser')
const clienteRoutes = require('./routes/routes')

const app = express()

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', clienteRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}...`);
})