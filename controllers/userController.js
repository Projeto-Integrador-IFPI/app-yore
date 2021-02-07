const User = require('../models/User')

exports.home = function(req, res) {
    if (req.session.user) {
        res.render("pages/home")
    } else {
        res.render('pages/home')
    }
}

exports.signin = function(req, res) {
    res.render('pages/signin', { layout: 'pages/signin' })
}

exports.login = function(req, res) {
    let user = new User(req.body)
    user.login().then(function(result) {
        console.log(result);
        req.session.user = {
            username: user.data.username
        }
        req.session.save(function() {
            res.redirect('/home')
        })
    }).catch(function(err) {
        res.send(err);
    })
}

exports.logout = function(req, res) {
    req.session.destroy(function() {
        res.redirect('/home')
    })
}

exports.mustBeLoggedIn = function(req, res, next) {
    if (req.session.user) {
        next()
    } else {
        res.redirect('/')
    }
}

exports.signup = function(req, res) {
    res.render('pages/signup', { layout: 'pages/signup' })
}

exports.save = function(req, res) {
    // console.log(req.body);
    let user = new User(req.body)
    user
        .create()
        .then(function(result) {
            res.render('pages/signin', { layout: 'pages/signin' });
        })
        .catch(function(err) {
            res.send(err);
        });
    // res.render('pages/home')
}

exports.reset = function(req, res) {
    res.render('pages/forgot-pass', { layout: 'pages/forgot-pass' })
}