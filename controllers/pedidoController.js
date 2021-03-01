const ItemPedido = require('../models/ItemPedido')
const Pedido = require('../models/Pedido')
const { calcularValorTotal } = require('../services/pedidoService')

exports.cadastrar_pedidos = function(req, res) {
    res.render('pages/cadastrar-pedidos')
}

exports.save = function(req, res) {
    let pedido = new Pedido(req.body)
    const {id_usuario} = req.session.user
    pedido
        .create(id_usuario)
        .then(function(id_pedido) {            
            res.redirect(`/pedido/${id_pedido}/cadastrar-item`)
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        })
}

exports.saveItemPedido = async function(req, res) {
    const { id_pedido } = req.params;    
    const itemPedido = new ItemPedido({...req.body, id_pedido})
    itemPedido
        .create()
        .then(() => {
            res.redirect(`/pedido/${id_pedido}/cadastrar-item`)
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        })
}

exports.itemPedido = async function(req, res) {
    const { id_pedido } = req.params
    const itemPedido = new ItemPedido()
    const itens =  await itemPedido.find(id_pedido)

    let valorTotal = 0
    let itensDoPedido = [] 
    if (itens) {
        itensDoPedido = itens
        valorTotal = calcularValorTotal(itensDoPedido)
    }
    res.render('pages/itens-pedidos', { id_pedido, itensDoPedido, valorTotal })
}

exports.deletar = function(req, res) {
    let pedido = new Pedido()
    const {id_usuario} = req.session.user
    const id_pedido = req.params.id
    pedido
        .delete(id_pedido, id_usuario)
        .then(function(result) {
            res.redirect('/home');
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        });   
}

exports.deletarItemPedido = function(req, res) {
    const { id_pedido, id_item_pedido } = req.params

    let itemPedido = new ItemPedido()
    itemPedido
        .delete(id_item_pedido)
        .then(function(result) {
            res.redirect(`/pedido/${id_pedido}/cadastrar-item`);
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        });
}

exports.areaPedidos = function(req, res) {
    let pedido = new Pedido()
    const {id_usuario} = req.session.user

    pedido
        .findAll(id_usuario)
        .then(result => {
            let pedidos = result || [];
            
            const agendados = pedidos.filter(p => p.status_pedido == 2)
            const emEntrega = pedidos.filter(p => p.status_pedido == 3)
            const entregues = pedidos.filter(p => p.status_pedido == 4)

            res.render('pages/area-pedidos', { agendados, emEntrega, entregues })
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        })    
}

exports.alterarStatus = function(req, res) {
    let pedido = new Pedido()
    const {id_usuario} = req.session.user
    const { id_pedido, status } = req.params

    pedido
        .alterarStatus({id_pedido, id_usuario, status})
        .then(() => {
            res.redirect(`/area-pedidos`);
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        })    
}
