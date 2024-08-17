const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const clienteRoutes = require('./routes/clienteRoutes')

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));

app.use('/api', clienteRoutes)

app.get('/', (req, res) => {
  return res.status(200).send('chegou no app da grafica')
})

const PORT = 3000
app.listen(PORT, () => {
  console.log(`servidor rodando na porta ${PORT}...`);
})