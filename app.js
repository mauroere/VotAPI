var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

// Cargamos librerias de Usuarios
var session = require('express-session');
var mongoose = require('mongoose');
var bluebird = require('bluebird');
var mongostore = require('connect-mongo')(session);

// Ruteamos
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var votapiRouter = require('./routes/api/votapi');
var adminRouter = require('./routes/admin');

var app = express();

// Trabajaremos las Views con EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Conexión a MongoDB
mongoose.connect("mongodb://localhost:27017/elecciones", { useCreateIndex: true, useNewUrlParser: true, promiseLibrary: bluebird });

// Obtenemos las variables de conexión
var db = mongoose.connection;
// Configuramos errores y aperturas
db.on("error", console.error.bind(console, "Error al conectar a la BD de MongoDB"));
db.once("open", function() {
    console.log('Se conectó a la BD');
});

// Configuramos las sesiones
app.use(session({
    secret: "cualquiercosa",
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1 * 60 * 1000 }, //sesion de 1 minuto
    store: new mongostore({
        mongooseConnection: db
    })
}));

// Levanto datos de sesion del usuario
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    next();
});

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true, // true = .sass and false = .scss
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

// Ruteamos
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/votapi', votapiRouter);
app.use('/admin', adminRouter);

// Handler - 404
app.use(function(req, res, next) {
    next(createError(404));
});

// Handler
app.use(function(err, req, res, next) {
    // Seteo local de desarrollo
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Renderizamos el 500
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;