const pool = require("../db");
const bcrypt = require('bcryptjs');

let User = function(data) {
    this.data = data;
    this.errors = [];
};

User.prototype.login = function() {
    return new Promise((resolve, reject) => {
        this.readByUsername().then((usuarioRecuperado) => {
            if (
                usuarioRecuperado &&
                bcrypt.compareSync(this.data.senha, usuarioRecuperado.senha)
            ) {
                console.log('Login confere')
                resolve(usuarioRecuperado)
            } else {
                reject('Dados não conferem')
            }
        }).catch(() => {
            reject('Erro ao fazer login')
        })
    })
}

User.prototype.readByUsername = function() {
    const query = 'SELECT * FROM usuarios u WHERE u.username=$1';
    const values = [this.data.username];

    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                reject("Usuário não inserido");
            } else {
                usuarioRecuperado = results.rows[0]
                resolve(usuarioRecuperado);
            }
        });
    });
}

User.prototype.create = function() {
    let salt = bcrypt.genSaltSync(10)
    this.data.senha = bcrypt.hashSync(this.data.senha, salt)
    console.log(this.data);

    const query = 'INSERT INTO usuarios(nome, username, nascimento, senha) values($1, $2, $3, $4)';
    const values = [this.data.nome, this.data.username, this.data.nascimento, this.data.senha];
    return new Promise((resolve, reject) => {
        pool.query(query, values, (error, results) => {
            if (error) {
                reject("Usuário não inserido");
            } else {
                resolve("Usuário inserido com sucesso!");
            }
        });
    });
};

module.exports = User;