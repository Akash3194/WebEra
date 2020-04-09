//IMPORT ALL REQUIRED DEPENDENCIES HERE
const dialogflow = require('dialogflow');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
var upload = require('express-fileupload');
var mongodb = require('mongodb')

//const cron = require('node-cron');
const work = require("./libs/cron-jobs.js");
//app.use(fun());

app.use(upload());
// my vars
const port = process.env.PORT || 5000;
const { MONGO_URL } = require('./config/');
require('./libs/db-connection');
// configuration
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  secret: 'mysecretcode',
  resave: true,
  saveUninitialized: true,
  // this prevents that every time the server is restarted we lose the login sessions
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    url: MONGO_URL,
    autoReconnect: true
  })
}));
// passport middleware
app.use(passport.initialize());
app.use(passport.session());
// global var
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.errors = [];
  next();
})
// static files
app.use(express.static(path.join(__dirname, '/public')));
// engine
app.set('view engine', 'ejs');
// passport config
require('./config/passport')(passport);
// routes
app.use(require('./routes/')); // main routes
app.use('/', require('./routes/user')); // user routes
// run server
server.listen(port, () => console.info(`App running on port ${port}`));
