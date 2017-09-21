module.exports = function(app) {
    app.get('/users', function(req, res) {
        var db =  app.infra.connectionFactory;
        var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
        Users.find({}).lean().exec(
           function (e, docs) {
              res.render('users/users_list', { "userlist": docs });
        });

    });

    app.get('/users/new', function(req, res) {
        res.render('users/users_new', { title: 'Add New Contact', errorsValidation:{}, contact:{} });
    });

    app.post('/users/add', function (req, res, next) {
        var contact = req.body;

        req.assert('userName', 'Username é obrigatorio!').notEmpty();
        req.assert('userEmail', 'Email é obrigatorio!').notEmpty();

        var errors = req.validationErrors();

        if(errors) {
            res.format({
                html: function() {
                    res.status(400).render('users/users_new', {errorsValidation: errors, contact:contact});
                },
                json: function() {
                    res.status(400).json(errors);
                }
            })
            return;
        }

        var db =  app.infra.connectionFactory;
        
        var Users = db.Mongoose.model('usercollection', db.UserSchema, 'usercollection');
        var user = new Users({ username: contact.userName, email: contact.userEmail });
        
        user.save(function (err) {
            if (err) {
                console.log("Error! " + err.message);
                return err;
            }
            else {
                console.log("Post saved");
                res.redirect("/users");
            }
        });
    });
}