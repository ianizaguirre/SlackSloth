"use strict";

const express      = require('express');

const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');

const flash = require('connect-flash');
const expressValidator = require('express-validator');

const session 		 = require("express-session");
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const passport 		 = require("passport");



/* --- Run this without needing to call it ---- */
require("./config/mongoose-setup");
require("./config/passport-setup");

/* --------------------- */


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Slack Sloth';





/* ----------- Global MiddleWare ------------------ */

// Exposes a bunch of methods for validating data. 
app.use(expressValidator());


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);


// app.use(
//         session ({
//         resave: true,
//         saveUninitialized: true,
//         secret: "this string is to avoid a depreciation warning"
//     })
// );


// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: "this string is to avoid a depreciation warning",
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));






app.use(passport.initialize());
app.use(passport.session());





// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
app.use(flash());


app.use((req, res, next) => {
    // Passport defines "req.user" if the user is logged in
    // ("req.user" is the result of deserialize)
    res.locals.currentUser = req.user;

    // call "next()" to tell Express that we've finished
    // (otherwise your browser will hang)
    next();
});

/* ----------------END Global MiddleWare------------------------------ */




/*---Routes-------------------------------------------------------------*/

const index = require('./routes/index');
app.use('/', index);


const myUserRouter = require("./routes/user-router");
app.use(myUserRouter);

const mySlothRouter = require("./routes/sloth-router");
app.use(mySlothRouter);

/*----------------------------------------------------------------*/














// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
