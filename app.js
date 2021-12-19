var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
let mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var taskManagerRouter = require('./routes/taskManager');

var app = express();
//added jan
const port =3000
app.listen(port, () => console.info('Listening on port '+port))
mongoose.connect('mongodb://localhost:27017/easyGardenDB');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//view with ejs by jan
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
//signin
app.get('/signin',(req,res)=>{
  res.render('signin')
})
//email_popup
app.get('/email_popup',(req,res)=>{
  res.render('email_popup')
})
//Thanks
app.get('/Thanks',(req,res)=>{
  res.render('Thanks')
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
//front end engine setup css img js by jan
app.use(express.static('public'))
app.use('/stylesheets', express.static(__dirname+'public/stylesheets'))
app.use('/js', express.static(__dirname+'public/js'))
app.use('/image', express.static(__dirname+'public/image'))
//end jan

//add Routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/taskManager', taskManagerRouter);

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