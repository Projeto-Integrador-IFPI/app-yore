const pool = require("../db");

const Pedido = function(data, username, endereco) {
    this.data = data
    this.errors = []
    this.username = username
    this.endereco = endereco
}

Pedido.prototype.create = function() {
    const query = 'INSERT INTO pedidos(nome_destinatario, telefone_destinatario, observacoes, data_pedido, nome_entregador, status_pedido, logradouro, numero_logradouro, bairro, complemento ) values($1, $2, $3, $4, $5, 0, $6, $7, $8, $9)';
    const values = [this.data.nome_destinatario, this.data.telefone_destinatario, this.data.observacoes, this.data.data_pedido, this.data.nome_entregador, this.data.logradouro, this.data.numero_logradouro, this.data.bairro, this.data.complemento];
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                console.log(error);
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

Pedido.prototype.findLatest = async function() {
    const query = 'select * from pedidos order by id_pedido desc limit 5'
    return pool
        .query(query)
        .then(res => res.rows)
        .catch(e => console.error(e.stack))
}

module.exports = Pedido;