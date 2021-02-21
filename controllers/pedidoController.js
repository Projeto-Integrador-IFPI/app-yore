const ItemPedido = require('../models/ItemPedido')
const Pedido = require('../models/Pedido')

// exports.home = async function(req, res) {
//     const pedido = new Pedido();

//     const totais = {
//         cadastrados: {
//             geral: await pedido.countTotal(),
//             mes: 10
//         },
//         entregues: {
//             geral: await pedido.countTotal({ status: 1 }),
//             mes: 321
//         },
//         naoEntregues: {
//             geral: 2313,
//             mes: 55
//         }
//     }

//     console.log(totais);
//     res.render('pages/home', { totais })
// }


exports.cadastrar_pedidos = function(req, res) {
    res.render('pages/cadastrar-pedidos')
}

exports.save = function(req, res) {
    let pedido = new Pedido(req.body)
    pedido
        .create()
        .then(function(result) {
            res.redirect('/home');
        })
        .catch(function(err) {
            console.log(err);
            res.send(err);
        });   
}

exports.pedido = async function(req, res) {
    const { id } = req.params;
    const itemPedido = new ItemPedido()
    const itens =  await itemPedido.find(id) || []

    let itensDoPedido = [] 
    if (itens) {
        itensDoPedido = itens
    }
    res.render('pages/itens-pedidos', { id, itensDoPedido })
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

