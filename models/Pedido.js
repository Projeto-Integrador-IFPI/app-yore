const pool = require("../db");

let Pedido = function(data, username, endereco) {
    this.data = data
    this.errors = []
    this.username = username
    this.endereco = endereco
}

Pedido.prototype.create = function() {
    const query = 'INSERT INTO pedidos(nome_destinatario, telefone_destinatario, observacoes, data_pedido, nome_entregador) values($1, $2, $3, $4, $5)';
    const values = [this.data.nome_destinatario, this.data.telefone_destinatario, this.data.observacoes, this.data.data_pedido, this.data.nome_entregador];
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                reject("Pedido não inserido");
            } else {
                resolve("Pedido inserido com sucesso!");
            }
        });
    });
};

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