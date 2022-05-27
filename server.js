require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTIONSTRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('conectado a base de dados')
        app.emit('conectadoDB')
    })
    .catch(e => {
        console.log(e)
    })

const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')
const routes = require(path.resolve(__dirname, 'routes'))
const helmet = require('helmet')
const csrf = require('csurf')
const {
    middlewareGlobal,
    checkCsrfError,
    csrfMiddleware
} = require(path.resolve(__dirname, 'src', 'middlewares', 'middleware'))

// app.use(helmet())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static(path.resolve(__dirname, 'public')))

//Template to sessions
const sessionOptions = session({
    secret: '123456',
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
})

app.use(sessionOptions)
app.use(flash())
app.use(csrf())

//Set views engine and path
app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')


//Middlewares
app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddleware)


app.use(routes)

//Inicializar o servidor
app.on('conectadoDB', () => {
    app.listen('3000', () => {
        console.log('Servidor Executando na porta 3000, localhost:3000');
    })
})