ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

module.exports = function(app) {
    app.get('/account', ensureLoggedIn('/login'), function(req, res){
        res.render('auth/account');
    });

    app.get('/', function(req, res) {
        
        var db =  app.infra.connectionFactory;
        var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
        Users.find({}).lean().exec(
           function (e, docs) {
               console.log(docs)
              res.render('main/index', { "usuarios": docs });
        });

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
        res.render('main/about', { });
    });
}