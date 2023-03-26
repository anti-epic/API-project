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

    res.status(err.status || 403);


    let resBody = {}


    // if(!err.status){
    //   // err.errors = []
    //   resBody.message = "User already exists";
    //   resBody.statusCode = 403;
    //   // console.log(err)
    //   resBody.errors = {[err.fields]: err.errors[0]};
    //   // console.log(resBody.errors.email)
    //   let errors = {}
    //   if(resBody.errors.email){
    //     // console.log('in')
    //     errors = {"email" :resBody.errors.email}

    //   }
    //   if(resBody.errors.username){
    //     // console.log('in')
    //     errors = {"username" : resBody.errors.username}
    //   }
    //   resBody.errors = {errors}
    //   // console.log('herer',resBody.errors)
    //       return     res.json({
    //     "message" : resBody.message,
    //     "statusCode" : resBody.statusCode,
    //     // errorsstack: isProduction ? null : err.stack
    //   });
    // }



    // console.log(err)
    let errors = []
    // console.log('start',errors,'end')



    for(let i = 0; i < err.errors.length; i++){


    if(err.errors[i].includes('Validation max on stars failed') || err.errors[i].includes('Validation min on stars failed') ){
      errors.push('Stars must be an integer from 1 to 5')
    }

   else if(!err.errors[i].includes('Invalid value')){
        errors.push(err.errors[i])
      }

    }


    if(err.status === 401){

      return res.json({
        "message": "Invalid credentials",
        "statusCode" : err.status
      })
    }




    return res.json({
      // title: err.title || 'Server Error',
      // message: err.message,
      message: "Validation error",
      statusCode: res.statusCode,
      errors
    });

  });







  module.exports = app;
