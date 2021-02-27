const pool = require("../db");

const ItemPedido = function(data, username, endereco) {
    this.data = data
    this.errors = []
    this.username = username
    this.endereco = endereco
}

ItemPedido.prototype.create = async function () {
    const query = 'INSERT INTO itens_pedido (nome_item, quantidade_item, preco_item, id_pedido) values($1, $2, $3, $4) RETURNING id_item_pedido';
    const values = [this.data.nome_item, this.data.quantidade_item, this.data.preco_item, this.data.id_pedido];

    return pool
        .query(query, values)
        .then(res => {
            console.log('Item do Pedido Cadastrado')
            return res.rows[0].id_item_pedido
        })
        .catch(e => console.error(e.stack))    
};

ItemPedido.prototype.countTotal = async function ({ status } = {}) {
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