const pool = require("../db");

let Pedido = function(data) {
    this.data = data
    this.errors = []
}

Pedido.prototype.countTotal = async function({ status } = {}) {
    let query;
    let values;
    if (status) {
        query = 'select count (*) from pedidos where status_pedido = $1'
        values = [status]
    } else {
        query = 'select count (*) from pedidos'
    }

    return pool
        .query(query, values)
        .then(res => res.rows[0].count)
        .catch(e => console.error(e.stack))
};

module.exports = Pedido;