const Login = require('../models/LoginModel')

exports.index = (req, res, next) => {
    if(req.session.user) return res.render('login-logado')
    res.render('login')
}

exports.register = async (req, res, next) => {
    try {
        const login = new Login(req.body)
        await login.register();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect('back')
            })
            return
        }

        req.flash('success', "Seu Usuario Foi Criado Com Sucesso")
        req.session.save(function () {
            return res.redirect('/')
        })
        
    } catch (e) {
        console.log(e);
        return res.render('404')
    }
}



exports.auth = async (req, res, next) => {
    try {
        const login = new Login(req.body)
        await login.auth();

        if (login.errors.length > 0) {
            req.flash('errors', login.errors)
            req.session.save(function () {
                return res.redirect('back')
            })
            return
        }

        req.flash('success', "Autenticado com Sucesso!")
        req.session.user = login.user;
        req.session.save(function () {
            return res.redirect('back')
        })
        
    } catch (e) {
        console.log(e);
        return res.render('404')
    }
}


exports.logout = (req, res, next) => {
    req.session.destroy();
    res.redirect('/')
    next();
}
