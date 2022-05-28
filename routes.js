const express = require('express')
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
const contatoController = require('./src/controllers/contatoController')
//Home's Route 

const { loginRequired } = require('./src/middlewares/middleware')

route.get('/', homeController.index)

//logins's Route
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/auth', loginController.auth)
route.get('/login/logout', loginController.logout)

// Rotas de Contato
route.get('/contato', loginRequired ,contatoController.index)
route.post('/contato/register', contatoController.register)
route.get('/contato/index/:id', loginRequired, contatoController.editIndex)
route.post('/contato/edit/:id', loginRequired, contatoController.edit)
route.get('/contato/delete/:id', loginRequired, contatoController.delete)
module.exports = route