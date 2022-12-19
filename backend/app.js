const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');


const { environment } = require('./config');
const isProduction = environment === 'production'

const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

// Security Middleware
if (!isProduction) {
    // enable cors only in development
    app.use(cors());
  }

  // helmet helps set a variety of headers to better secure your app
  app.use(
    helmet.crossOriginResourcePolicy({
      policy: "cross-origin"
    })
  );

  // Set the _csrf token and create req.csrfToken method
  app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
  );


  const routes = require('./routes');

  app.use(routes);



  app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
  });



  const { ValidationError } = require('sequelize');

  // ...

  // Process sequelize errors
  app.use((err, _req, _res, next) => {
    // check if error is a Sequelize error:
    if (err instanceof ValidationError) {
      err.errors = err.errors.map((e) => e.message);
      err.title = 'Validation error';
    }
    next(err);
  });

  app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    // console.error(err);
    let resBody = {}
    if(!err.status){
      resBody.message = "User already exists";
      resBody.statusCode = 403;
      // console.log(err)
      resBody.errors = {[err.fields[0]]: err.errors[0]};
          return     res.json({
        "message" : resBody.message,
        "statusCode" : resBody.statusCode,
        "errors": resBody.errors

        // stack: isProduction ? null : err.stack
      });
    }
    console.log(err)
    let errors = {}

    for(let i = 0; i < err.errors.length; i++){
      if(err.errors[i].includes('email')){
        errors.email = err.errors[i]
      }
      if(err.errors[i].includes('username')){
        errors.username = err.errors[i]
      }
      if(err.errors[i].includes('First')){
        errors.firstName = err.errors[i]
      }
      if(err.errors[i].includes('Last')){
        errors.lastName = err.errors[i]
      }
      if(err.errors[i].includes('Password')){
        errors.password = err.errors[i]
      }
    }
    res.json({
      // title: err.title || 'Server Error',
      // message: err.message,
      message: "Validation error",
      statusCode: 400,
      errors
      // stack: isProduction ? null : err.stack
    });
  });







  module.exports = app;
