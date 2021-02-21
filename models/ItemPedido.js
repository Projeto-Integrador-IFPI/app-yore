const pool = require("../db");

const ItemPedido = function(data, username, endereco) {
    this.data = data
    this.errors = []
    this.username = username
    this.endereco = endereco
}

ItemPedido.prototype.create = function() {
    const query = 'INSERT INTO ItemPedidos(nome_destinatario, telefone_destinatario, observacoes, data_ItemPedido, nome_entregador, status_ItemPedido, logradouro, numero_logradouro, bairro, complemento ) values($1, $2, $3, $4, $5, 0, $6, $7, $8, $9)';
    const values = [this.data.nome_destinatario, this.data.telefone_destinatario, this.data.observacoes, this.data.data_ItemPedido, this.data.nome_entregador, this.data.logradouro, this.data.numero_logradouro, this.data.bairro, this.data.complemento];
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                console.log(error);
                reject("ItemPedido não inserido");
            } else {
                resolve("ItemPedido inserido com sucesso!");
            }
        });
    });
};

ItemPedido.prototype.countTotal = async function({ status } = {}) {
    let query;
    let values;
    if (status) {
        query = 'select count (*) from ItemPedidos where status_ItemPedido = $1'
        values = [status]
    } else {
        query = 'select count (*) from ItemPedidos'
    }

    return pool
        .query(query, values)
        .then(res => res.rows[0].count)
        .catch(e => console.error(e.stack))
};

ItemPedido.prototype.find = async function(id_pedido) {
    const query = 'select * from itens_pedido where id_pedido = $1'

    const value = [id_pedido]
    
    return pool
        .query(query, value)
        .then(res => res.rows)
        .catch(e => console.error(e.stack))
}


ItemPedido.prototype.delete = async function(id) {
    const query = 'delete from itens_pedido where id_ItemPedido = $1'
    const values = [id];

    return pool
        .query(query, values)
        .then(res => res)
        .catch(e => console.error(e.stack))   
} 


module.exports = ItemPedido;