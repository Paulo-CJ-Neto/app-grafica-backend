const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController.js');
const cadastroController = require('../controllers/cadastroController.js');
const loginController = require('../controllers/loginController.js');
const produtosController = require('../controllers/produtosController.js');
const enderecoController = require('../controllers/enderecoController.js');

// Rotas para /clientes
router.get('/clientes', clienteController.getAllClientes);
router.get('/clientes/:id', clienteController.getClienteById);
router.put('/clientes/:id', clienteController.putUpdatedClient);

// Rotas para /endereco
router.get('/endereco/:id', enderecoController.getAdressById);
router.put('/endereco/:id', enderecoController.putAdressById);
router.post('/endereco/:id', enderecoController.postAdressByClientId);

// Rotas para /cadastro
router.post('/cadastro', cadastroController.signUp);

// Rotas para /login
router.post('/login', loginController.signIn);

// Rotas para /produtos
router.get('/produtos', produtosController.getProductsByType);
router.post('/produtos', produtosController.postProduct);
router.delete('/produtos/:id', produtosController.deleteProduct);
router.put('/produtos/:id', produtosController.putProduct);

// Rota para verificar token de email
router.get('/verify', cadastroController.verifyTokenEmail);

module.exports = router;
