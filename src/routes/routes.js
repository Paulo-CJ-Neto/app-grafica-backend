const express = require('express');
const router = express.Router();
const upload = require('../utils/multerConfig.js')
const clienteController = require('../controllers/clienteController.js');
const cadastroController = require('../controllers/cadastroController.js');
const loginController = require('../controllers/loginController.js');
const produtosController = require('../controllers/produtosController.js');
const enderecoController = require('../controllers/enderecoController.js');
const carrinhoController = require('../controllers/carrinhoController.js');
// const pedidoController = require('../controllers/pedidoController.js')

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
router.get('/produtos/:id', produtosController.getProductById)
router.post('/produtos', produtosController.postProduct);
router.delete('/produtos/:id', produtosController.deleteProduct);
router.put('/produtos/:id', produtosController.putProduct);

// Rota para verificar token de email
router.get('/verify', cadastroController.verifyTokenEmail);

// Rota para upload de imagem
router.post('/upload', upload.single('image'), produtosController.postProductImage);

// Rota para /carrinho
router.get('/carrinho/:clientId', carrinhoController.getCartByClientId)
router.post('/carrinho', carrinhoController.postCartItem)
router.delete('/carrinho/:cartItemId', carrinhoController.deleteCartItem)

// Rota para /pedido
// router.get('/pedido/:id', pedidoController.getOrderById)
// router.post('/pedido/:clientId', pedidoController.postOrderByClientId)

module.exports = router;
