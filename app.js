var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')
const port = 3000;
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const swaggerUi = require('swagger-ui-express');

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

let SECRET_TOKEN = process.env.JWT_SECRET_TOKEN;
let emailpassword = process.env.emailpassword_env;
var app = express();
//connect to mongodb
mongoose.connect('mongodb://localhost:27017/easyGardenDB');
//Jan added
mongoose.Promise = global.Promise;
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//view with ejs by jan

//EJS is a simple templating language that lets you generate HTML markup with plain JavaScript.
//No religiousness about how to organize things. 
//No reinvention of iteration and control-flow. It's just plain JavaScript.
app.set('views', './views')
app.set('view engine', 'ejs')

function validateCookie(request,response, successFunction) {
  let cookies = request.headers?.cookie;
  //console.log("Cookies: " + cookies);
  if (typeof cookies !== 'undefined') {
    let cookie = cookies.split('=')[1]
    // console.log('cookie:', cookie)
    jwt.verify(cookie, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        response.render('signin')
      } else {
        successFunction(decoded)
        return;
      }
    })
  } else {
    console.log('no cookie')
    response.render('signin')
  }
}

app.get('/index', (req, res) => {
  validateCookie(req,res, (decoded) => {
    res.render('garden_overview')
  })
})

app.get('/', (req, res) => {
  validateCookie(req,res, (decoded) => {
    res.render('garden_overview')
  })
})

//Taskscheduler
app.get('/Taskscheduler', (req, res) => {
  validateCookie(req,res, (decoded) => {
    res.render('TaskScheduler');
  })
})
//gardenoverview
app.get('/garden_overview', (req, res) => {
  validateCookie(req,res, (decoded) => {
    res.render('garden_overview')
  })
})
//task
app.get('/task', (req, res) => {
  validateCookie(req,res, (decoded) => {
    res.render('task')
  })
})
//tools
app.get('/tools', (req, res) => {
  validateCookie(req,res, (decoded) => {
    res.render('tools')
  })
})
//process
app.get('/process', (req, res) => {
  validateCookie(req,res, (decoded) => {
    res.render('process')
  })
})
//plantcare
app.get('/plantcare', (req, res) => {
  validateCookie(req,res, (decoded) => {
    res.render('plantcare')
  })
})
//signin
app.get('/signin', (req, res) => {
  res.render('signin')
})
//email_popup
app.get('/email_popup', (req, res) => {
    res.render('email_popup')
  })

//Impressum
app.get('/Impressum', (req, res) => {
  res.render('Impressum')
})

//registration
app.get('/registration', (req, res) => {
  res.render('registration')
})

//about
app.get('/about-not-logged-in', (req, res) => {
  res.render('about-not-logged-in')
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

//nodemailer start
app.post('/email_popup', (req, res) => {
  const output = `
    <p>You have a new contact request</p> 
    <ul>  
      <li>Prename: ${req.body.name}</li>
      <li>Name: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
  // host: 'smtp.gmail.com',
  // port: 587,
  service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'urbangardeningwwu@gmail.com', // generated ethereal user
        pass: emailpassword  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
     // from: '"Nodemailer Contact" <urbangardeningwwu@gmail.com>', // sender address
      from: 'urbangardeningwwu@gmail.com', // sender address
      to: 'ContactUrbangardeningwwu@gmail.com', // list of receivers
      subject: 'Contact Request', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };
  //error message
  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('email_popup', {msg:'Email has been sent'}); //contact
  });
  });
  //nodemailer end
//add Routes from line 18-20...
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/taskManager', taskManagerRouter);
app.use('/plantManager', plantManagerRouter);
app.use('/processManager', processManagerRouter);
app.use('/objectManager', objectManagerRouter);
app.use('/api', apiRouter);

let apiDocumentation = require('./apiDocumentation');
app.use('/apiDocumentation', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

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