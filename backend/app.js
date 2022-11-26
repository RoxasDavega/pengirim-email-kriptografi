
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const userRouter = require('./app/user/route');
const mailRouter = require('./app/mail/route');
const customErrorHandler = require('./middleware/customErrorHandler');
const handler404NotFound = require('./middleware/handler404NotFound');
var app = express();



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials", 'true');
  next();
});

app.use('/user', userRouter);
app.use('/mail', mailRouter);

app.use(customErrorHandler);
app.use(handler404NotFound);



module.exports = app;
