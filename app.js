const pool = require("./db")
const express = require('express')
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const app = express()

let sessionOptions = session({
    store: new pgSession({
        pool: pool,
        tableName: 'user_session'
    }),
    secret: "minha_chave_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
})

app.use(sessionOptions)

app.use(function(req, res, next) {
    res.locals.user = req.session.user
    next()
})

const expressEjsLayouts = require('express-ejs-layouts');
const router = require('./router');
const { Session } = require('express-session');

app.use(express.static("public"));
app.set("views", "views");
app.set("view engine", "ejs");
app.use(expressEjsLayouts);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);

app.set('layout pages/signin', false);
app.set('layout pages/signup', false);
app.set('layout pages/forgot-pass', false);

app.listen(process.env.APP_PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.APP_PORT}`)
})