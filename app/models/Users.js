var Sequelize = require('sequelize');

function Users(connection){
    
    this._connection = connection;
    
    this._users = this._connection.define('Usuario', {
        nome: Sequelize.STRING,
        sobrenome: Sequelize.STRING,
        senha: Sequelize.STRING
      });
    
      this._users.sync().then(function(err, result){
          console.log('Criado');
      });

    return this._users;
};

Users.prototype.create = function(callback){
    this._connection.sync().then(function() {
        this._users.create({
            nome: 'Luiz Henrique',
            sobrenome: 'Freitas',
            senha: '123'
        }).then(function(usuario) {
            console.log(usuario.get());
        });
    });
};

Users.prototype.list = function(callback){
    this._connection.sync().then(function() {
        this._users.findAll().then(function(listUsers) {
            console.log(listUsers);
        });
    });
}

module.exports = function() {
    return Users;
};

/*

UsersDAO.prototype.create = function(user, callback){
    this._connection.sync().then(function() {
        this._user.create({
            nome: 'Luiz Henrique',
            sobrenome: 'Freitas',
            senha: '123'
        });
    }); 
};


*/