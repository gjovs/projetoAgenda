const express = require('express')
const route = express.Router();
const homeController = require('./src/controllers/homeController')
const loginController = require('./src/controllers/loginController')
//Home's Route 
route.get('/', homeController.index)

//logins's Route
route.get('/login', loginController.index)
route.post('/login/register', loginController.register)
route.post('/login/auth', loginController.auth)
route.get('/login/logout', loginController.logout)



module.exports = route