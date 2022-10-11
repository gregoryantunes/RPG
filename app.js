const express = require('express');

const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const admin = require('./routes/admin');

// Config
// Sessions
app.use(session({
  secret: 'x3b4sm45t3r',
  resave: true,
  saveUnititialized: true,
}));
app.use(flash());

// Middlewares
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// Handlebars
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: '.hbs',
  runtimeOptions: {
    allowProtoPropertiesByDefault: true,
    alloProtoMethodsByDefault: true,
  },
});
// Template Engine
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

// Body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Public
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/admin', admin);

app.get('/', (req, res) => {
  res.render('home');
});

app.listen(9000, () => {
  console.log('Servidor Rodando na url http://192.168.0.112:9000');
});
