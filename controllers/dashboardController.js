const Pedido = require('../models/Pedido')

exports.home = async function(req, res) {
    const pedido = new Pedido();

    const {id_usuario} = req.session.user

    const totais = {
        cadastrados: {
            geral: await pedido.countTotal({id_usuario}),
            mes: await pedido.countTotal({id_usuario, isLastMonth: true}),
        },
        entregues: {
            geral: await pedido.countTotal({ status: 4, id_usuario }),
            mes: await pedido.countTotal({status: 4, id_usuario, isLastMonth: true}),
        },
        naoEntregues: {
            geral: await pedido.countTotal({ status: 1, id_usuario }),
            mes: await pedido.countTotal({ status: 1, id_usuario, isLastMonth: true }),
        }
    }

    const ultimosPedidos = await pedido.findLatest(id_usuario);

    res.render('pages/home', { totais, ultimosPedidos })
}