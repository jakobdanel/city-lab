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
//initialize Routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskManagerRouter = require('./routes/taskManager');
var processManagerRouter = require('./routes/processManager');
var plantManagerRouter = require('./routes/plantManager');
var objectManagerRouter = require('./routes/objectManager');
var apiRouter = require('./routes/api');


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

app.get('/index',(req,res)=>{
  res.render('garden_overview')
})
app.get('/',(req,res)=>{
  res.render('garden_overview')
})

//Taskscheduler
app.get('/Taskscheduler',(req,res)=>{
    res.render('Taskscheduler')
})
//gardenoverview
app.get('/garden_overview',(req,res)=>{
  res.render('garden_overview')
})
//task
app.get('/task',(req,res)=>{
  res.render('task')
})
//tools
app.get('/tools',(req,res)=>{
  res.render('tools')
})
//process
app.get('/process',(req,res)=>{
  res.render('process')
})
//plantcare
app.get('/plantcare',(req,res)=>{
  res.render('plantcare')
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
app.use('/taskManager', taskManagerRouter);
app.use('/plantManager',plantManagerRouter);
app.use('/processManager',processManagerRouter);
app.use('/objectManager',objectManagerRouter);
app.use('/api', apiRouter);

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
  res.render('notFoundError');
});

module.exports = app;