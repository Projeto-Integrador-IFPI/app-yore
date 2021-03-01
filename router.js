const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const pedidoController = require('./controllers/pedidoController')
const dashboardController = require('./controllers/dashboardController')
const { authRedirect } = require('./middleware/authRedirect')
// rotas
router.get('/home', authRedirect, dashboardController.home)

router.get('/', userController.signin)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/signup', userController.signup)
router.post('/register', userController.save)
router.get('/reset', userController.reset)

//PEDIDO
router.get('/cadastrar-pedidos', authRedirect, pedidoController.cadastrar_pedidos)
router.post('/cadastrar-pedidos', pedidoController.save)
router.get('/pedido-deletar/:id', pedidoController.deletar)

//ITEM PEDIDO
router.get('/pedido/:id_pedido/cadastrar-item', pedidoController.itemPedido)
router.post('/pedido/:id_pedido/cadastrar-item', pedidoController.saveItemPedido)
router.get('/pedido/:id_pedido/deletar-item/:id_item_pedido', pedidoController.deletarItemPedido)

//AREA PEDIDOS
router.get('/area-pedidos', pedidoController.areaPedidos)

router.get('/pedido/:id_pedido/status/:status', pedidoController.alterarStatus)

module.exports = router