const Pedido = require('../models/Pedido')

exports.home = async function(req, res) {
  if (!req.session.user) {
    res.redirect('/');
    return;
  }

  const pedido = new Pedido();

  const totais = {
      cadastrados: {
          geral: await pedido.countTotal(),
          mes: 2
      },
      entregues: {
          geral: await pedido.countTotal({ status: 1 }),
          mes: 321
      },
      naoEntregues: {
          geral: 2313,
          mes: 55
      }
  }

  console.log(totais);
  res.render('pages/home', { totais })
}