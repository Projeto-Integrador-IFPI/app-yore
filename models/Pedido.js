const pool = require("../db");

const Pedido = function(data, username, endereco) {
    this.data = data
    this.errors = []
    this.username = username
    this.endereco = endereco
}

Pedido.prototype.create = async function (id_usuario) {
    const query = 'INSERT INTO pedidos(nome_destinatario, telefone_destinatario, observacoes, data_pedido, nome_entregador, status_pedido, logradouro, numero_logradouro, bairro, complemento, id_usuario ) values($1, $2, $3, $4, $5, 2, $6, $7, $8, $9, $10) RETURNING id_pedido';
    const values = [this.data.nome_destinatario, this.data.telefone_destinatario, this.data.observacoes, this.data.data_pedido, this.data.nome_entregador, this.data.logradouro, this.data.numero_logradouro, this.data.bairro, this.data.complemento, id_usuario];
    
    return pool
        .query(query, values)
        .then(result => {
            console.log('Pedido Cadastrado');
            return result.rows[0].id_pedido;
        })
        .catch(err => {            
            console.log(error);
        });
};

Pedido.prototype.countTotal = async function({ status, id_usuario, isLastMonth } = {}) {
    let query = 'select count (*) from pedidos where id_usuario = $1'
    let values = [id_usuario];
    if (status) {
        query = `${query} and status_pedido = $2`
        values.push(status)
    } 
    
    if (isLastMonth) {
        query = `${query} and data_pedido > current_date - interval '30' day and data_pedido <= current_date`
    }    

    return pool
        .query(query, values)
        .then(res => res.rows[0].count)
        .catch(e => console.error(e.stack))
}

Pedido.prototype.findLatest = async function(id_usuario) {
    const query = `
        select
            p.id_pedido,
            p.nome_destinatario, 
            p.logradouro, 
            p.numero_logradouro, 
            p.complemento, 
            p.nome_entregador, 
            p.observacoes, 
            case
                when p.status_pedido = 1 then 'Não entregue'
                when p.status_pedido = 2 then 'Agendado'
                when p.status_pedido = 3 then 'Em Entrega'
                when p.status_pedido = 4 then 'Entregue'
                when p.status_pedido = 5 then 'Concluido'
            end status_pedido,
            coalesce(sum(ip.quantidade_item * ip.preco_item ), 0) as "valor_total"
        from 
            pedidos p 
        left join 
            itens_pedido ip 
        on
            p.id_pedido  = ip.id_pedido 
        where 
            p.id_usuario = $1
        group by
            p.id_pedido,
            p.nome_destinatario,
            p.logradouro,
            p.numero_logradouro,
            p.complemento,
            p.nome_entregador,
            p.observacoes,
            status_pedido
        order by 
            p.id_pedido desc 
        limit 
            5`

    const values = [id_usuario]
    return pool
        .query(query, values)
        .then(res => res.rows)
        .catch(e => console.error(e.stack))
}

Pedido.prototype.findAll = async function(id_usuario) {
    const query = `
        select
            p.id_pedido,
            p.nome_destinatario, 
            p.logradouro,
            p.numero_logradouro,
            p.status_pedido,
            coalesce(sum(ip.quantidade_item * ip.preco_item ), 0) as "valor_total"
        from 
            pedidos p 
        left join 
            itens_pedido ip 
        on
            p.id_pedido  = ip.id_pedido 
        where 
            p.id_usuario = $1
        group by
            p.id_pedido,
            p.nome_destinatario,
            p.logradouro,
            p.numero_logradouro,                        
            p.status_pedido`

    const values = [id_usuario]
    return pool
        .query(query, values)
        .then(res => res.rows)
        .catch(e => console.error(e.stack))
}

Pedido.prototype.alterarStatus = async function({id_pedido, id_usuario, status}) {
    const query = 'update pedidos set status_pedido = $1 where id_pedido = $2 and id_usuario = $3'
    const values = [parseInt(status), id_pedido, parseInt(id_usuario)];
    
    return pool
        .query(query, values)
        .then(res => res)
        .catch(e => console.error(e.stack))   
}

Pedido.prototype.delete = async function(id_pedido, id_usuario) {
    const query = 'delete from pedidos where id_pedido = $1 and id_usuario = $2'
    const values = [id_pedido, id_usuario];

    return pool
        .query(query, values)
        .then(res => res)
        .catch(e => console.error(e.stack))   
} 


module.exports = Pedido;