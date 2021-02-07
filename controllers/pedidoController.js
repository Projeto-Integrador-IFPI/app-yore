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
            res.render('pages/home');
        })
        .catch(function(err) {
            res.send(err);
        });
}

exports.pedido = function(req, res) {
    const { id } = req.params;
    res.render('pages/itens-pedidos', { id })
}

exports.itens_pedidos = function(req, res) {
    res.render('pages/itens-pedidos')
}

exports.area_pedidos = function(req, res) {
    res.render('pages/area-pedidos')
}