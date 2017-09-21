var Sequelize = require('sequelize');

function createDBConnection() {
    var db = new Sequelize('sqlite://data/db.sqlite');
    return db;
}

module.exports = function(){
    return createDBConnection;
}