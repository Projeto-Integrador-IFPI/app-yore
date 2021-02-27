const ItemPedido = require('../models/ItemPedido')
const Pedido = require('../models/Pedido')

exports.cadastrar_pedidos = function(req, res) {
    res.render('pages/cadastrar-pedidos')
}

exports.save = function(req, res) {
    let pedido = new Pedido(req.body)
    pedido
        .create()
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

exports.pedido = async function(req, res) {
    const { id_pedido } = req.params
    const itemPedido = new ItemPedido()
    const itens =  await itemPedido.find(id_pedido)

    let itensDoPedido = [] 
    if (itens) {
        itensDoPedido = itens
    }
    res.render('pages/itens-pedidos', { id_pedido, itensDoPedido })
}

exports.itens_pedidos = function(req, res) {
    res.render('pages/itens-pedidos')
}

exports.area_pedidos = function(req, res) {
    res.render('pages/area-pedidos')
}

exports.deletar = function(req, res) {
    let pedido = new Pedido()
    pedido
        .delete(req.params.id)
        .then(function(result) {
            res.redirect('/home');
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        });   
}

