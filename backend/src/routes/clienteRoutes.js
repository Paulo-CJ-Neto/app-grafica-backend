const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')
const cadastroController = require('../controllers/cadastroController')
const loginController = require('../controllers/loginController')
const produtosController = require('../controllers/produtosController.js')

// ('/clientes')
router.get('/clientes', clienteController.getAllClientes)
// router.get('/cliente/:id', clienteController.getClienteById)

// ('/cadastro')
router.post('/cadastro', cadastroController.signUp)

// ('/login')
router.post('/login', loginController.signIn)

// ('/produtos')
router.get('/produtos', produtosController.getProductsByType)
router.post('/produtos', produtosController.postProduct)
router.delete('/produtos/:id', produtosController.deleteProduct)
router.put('/produtos/:id', produtosController.putProduct)

// ('/verify')
router.get('/verify', cadastroController.verifyTokenEmail)

module.exports = router