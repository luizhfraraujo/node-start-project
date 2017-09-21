var passport = require('passport');

module.exports = function(app) {
    app.get('/login', function(req, res) {
        var connection = app.infra.connectionFactory;
        res.render('auth/login', {layout:'main-layout', errors:'', user:''});
    });  
    
    app.post('/login', function(req, res) {
        var user = req.body;

        req.assert('userEmail', 'Email é obrigatório').notEmpty();
        req.assert('userPassword', 'Senha é obrigatório').notEmpty();
    
        var errors = req.validationErrors();
        if(errors) {
            res.format({
                html: function() {
                    res.status(400).render('auth/login', {errors:errors, user:user});
                },
                json: function() {
                    res.status(400).json(errors);
                }
            });
    
            return;
        }


        var db =  app.infra.connectionFactory;
        var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');

        

        Users.findOne({email:user.userEmail}, function(err, userResult) {
            if (err || !userResult) {
                errors = [{param:'userEmail', msg:'Usuário não encontrado em nosso sistema'}];
                return res.status(400).render('auth/login', {errors:errors, user:user});
            };
    
            // test a matching password
            userResult.comparePassword(user.userPassword, function(err, isMatch) {
                if (err) {
                    errors = [{param:'userPassword', msg:'A senha digitada não está correta'}];
                    return res.status(400).render('auth/login', {errors:errors, user:user});
                } else {
                    passport.authenticate('local', 
                        { 
                            successRedirect: '/index', 
                            failureRedirect: '/login?fail=true' });
                    //res.render('main/index', { "usuarios": user });             
                }
            });
        });
        //res.render('auth/login', {errors:errors, user:user});
    });

    app.get('/cadastrar', function(req, res) {
        res.render('auth/register', {errors:{}, user:{}});
    });

    app.post('/cadastrar', function(req, res) {
        var user = req.body;

        req.assert('userEmail', 'Email é obrigatório').notEmpty();
        req.assert('userPassword', 'Senha é obrigatório').notEmpty();
        req.assert('userPassword2', 'Senha é obrigatório').notEmpty();
        req.assert('userPassword2', 'As senhas não coincidem').equals(user.userPassword);
    
        var errors = req.validationErrors();
        if(errors) {
            res.format({
                html: function() {
                    console.log(user);
                    res.status(400).render('auth/register', {errors:errors, user:user});
                },
                json: function() {
                    res.status(400).json(errors);
                }
            });
    
            return;
        }
   
        var db =  app.infra.connectionFactory;

        var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
        var newuser = new Users({ username:user.userEmail, email: user.userEmail, password: user.userPassword });

        newuser.save(function (err) {
            if (err) {
                console.log("Error! " + err.message);
                return err;
            }
            else {
                res.redirect("/");
            }
        });

        //res.render('auth/register', {errors:errors, user:user});
    });
}