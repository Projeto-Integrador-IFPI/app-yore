const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const pedidoController = require('./controllers/pedidoController')

// rotas
router.get('/', userController.signin)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/signup', userController.signup)
router.post('/register', userController.save)
router.get('/reset', userController.reset)
router.get('/home', userController.home)

router.get('/cadastrar-pedidos', pedidoController.cadastrar_pedidos)
router.post('/cadastrar-pedidos', pedidoController.save)
router.get('/pedido/:id', pedidoController.pedido)
router.get('/itens-pedidos', pedidoController.itens_pedidos)
router.get('/area-pedidos', pedidoController.area_pedidos)

module.exports = router