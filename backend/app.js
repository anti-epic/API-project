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
    //   if(err.errors[i].toLowerCase().includes('email') && err.errors[i].toLowerCase().includes('username') ){
    //     errors.credential= err.errors[i];

    //   }
    //   else if(err.errors[i].includes('email') && !err.errors[i].includes('username')){
    //     // errors.email = err.errors[i]
    //     errors.push(err.errors[i])
    //   }
    //  else if(err.errors[i].includes('username') && !err.errors[i].includes('email')){
    //     errors.username = err.errors[i]
    //   }

    // if(err.errors[i].includes('username must be unique')){
    //   // errors.firstName = err.errors[i]
    //   errors.push('User with that username already exists')
    // }
    //   if(err.errors[i].includes('email must be unique')){
    //     errors.push('User with that email already exists')
    //   }
    //   if(err.errors[i].includes('Please provide a valid email')){
    //     errors.push('Invalid email')
    //   }
    //   if(err.errors[i].includes('Please provide a username with at least 4 characters')){
    //     errors.push(err.errors[i])
    //   }

    //   if(err.errors[i].includes('First')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Last')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Password is required')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Email or username is required')){
    //     errors.push(err.errors[i])
    //   }


    //   if(err.errors[i].includes('Price per day is required')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Description is required')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Name must be less than 50 characters')){
    //     errors.push(err.errors[i])
    //   }
    //    if(err.errors[i].includes('Longitude is not valid')){
    //     errors.push(err.errors[i])
    //   }
    //    if(err.errors[i].includes('Latitude is not valid')){
    //     errors.push(err.errors[i])
    //   }
    //    if(err.errors[i].includes('Country is required')){
    //     errors.push(err.errors[i])
    //   }
    //    if(err.errors[i].includes('State is required')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('City is required')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Street address is required')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes("The requested resource couldn't be found.")){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Review text is required')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Stars must be an integer from 1 to 5')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Page must be greater than or equal to 0')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Size must be greater than or equal to 0')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Maximum latitude is invalid')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Minimum latitude is invalid')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Maximum longitude is invalid')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Minimum longitude is invalid')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Maximum price must be greater than or equal to 0')){
    //     errors.push(err.errors[i])
    //   }
    //   if(err.errors[i].includes('Minimum price must be greater than or equal to 0')){
    //     errors.push(err.errors[i])
    //   }



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
