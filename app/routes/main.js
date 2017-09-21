module.exports = function(app) {
    app.get('/', function(req, res) {
        var connection = app.infra.connectionFactory();
        var users = app.models.Users(connection);
        
        users.create({
            nome: 'Luiz Henrique rodrigues',
            sobrenome: 'Freitas',
            senha: '123'
        });

        res.render('main/index', {usuarios:''});
        /*
        users.lista( function(err, results) {
            if(err) {
                console.log(err);
                res.render('main/index', {usuarios:''});
            }
            res.render('main/index', {usuarios:results});
        });
*/
        
    });

    app.get('/sobre', function(req, res) {
        res.render('main/about');
    });
}