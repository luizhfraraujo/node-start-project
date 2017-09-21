var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser')
var expressValidator = require('express-validator');
var passport = require('passport');
var expressSession = require('express-session');


module.exports = function() {   
    var app = express();
    app.set('view engine', 'ejs');
    app.set('views','./app/views');

    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    app.use(expressValidator());

    app.use(expressSession({secret: 'minhaChaveSecreta'}));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(obj, done) {
        done(null, obj);
      });
    
    app.use(express.static('./app/public'));
    load('routes', {cwd: 'app'})
        .then('infra')
        .then('models')
        .into(app);

    app.use(function(req, res, next) {
        res.status(404).render('errors/404');
    });

    app.use(function(error, req, res, next) {
        if(process.env.NODE_ENV == 'production') {
            res.status(500).render('errors/500');
            return;
        }
        next(error);
    });

    return app;
}