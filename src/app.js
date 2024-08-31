const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const clienteRoutes = require('./routes/routes')

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', clienteRoutes)

const PORT = 3000
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}...`);
})