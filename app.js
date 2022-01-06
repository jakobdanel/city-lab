var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const port = 3000;

const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)
const dbName = 'easyGardenDB'
const usercollectionName = 'users'
let mongoose = require('mongoose');


//bodyparser by jan
//app.use(bodyParser.json())
//initialize Routen
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskManagerRouter = require('./routes/taskManager');
//added Jan
var plantManagerRouter = require('./routes/plantManager');


var app = express();
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/easyGardenDB');
//Jan added
mongoose.Promise=global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//view with ejs by jan

//EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
//No religiousness about how to organize things. 
//No reinvention of iteration and control-flow. It's just plain JavaScript.
app.set('views', './views')
app.set('view engine', 'ejs')

//Taskscheduler
app.get('/Taskscheduler',(req,res)=>{
    res.render('Taskscheduler')
})
//plantcare
app.get('/plantcare',(req,res)=>{
  res.render('plantcare')
})
//gardenoverview
app.get('/garden_overview',(req,res)=>{
  res.render('garden_overview')
})
//gardenoverview
app.get('/tools',(req,res)=>{
  res.render('tools')
})
//signin
app.get('/signin',(req,res)=>{
  res.render('signin')
})
//email_popup
app.get('/email_popup',(req,res)=>{
  res.render('email_popup')
})
//Impressum
app.get('/Impressum',(req,res)=>{
  res.render('Impressum')
})
//end jan
app.use(logger('dev'));
app.use(express.json({
  limit: '100mb'
}));
app.use(express.urlencoded({
  extended: true,
  limit: '100mb'
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//add Routes from line 18-20...
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/taskManager', taskManagerRouter); //route?
//added jan
app.use('/plantmanager',plantManagerRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;