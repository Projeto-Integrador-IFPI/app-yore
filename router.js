const express = require('express')
const router = express.Router()
const mainController = require('./controllers/mainController')

// rotas
router.get('/', mainController.signin)
router.post('/login', mainController.login)

router.get('/signup', mainController.signup)
router.post('/register', mainController.save)

router.get('/reset', mainController.reset)

router.get('/home', mainController.home)

router.get('/cadastrar-pedidos', mainController.cadastrar_pedidos)

router.get('/pedido/:id', mainController.pedido)

router.get('/itens-pedidos', mainController.itens_pedidos)

router.get('/area-pedidos', mainController.area_pedidos)

// router.get('/signin', mainController.signin)

module.exports = router