// backend/routes/api/users.js
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    check('firstName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('First Name must be atleast one letter'),
    check('lastName')
      .exists({ checkFalsy: true })
      .isLength({ min: 1 })
      .withMessage('Last Name must be atleast one letter'),
    handleValidationErrors
  ];


// Sign up
router.post('/', validateSignup, async (req, res) => {
      const { email, password, username, firstName, lastName } = req.body;
      const user = await User.signup({ email, username, password, firstName, lastName });

      await setTokenCookie(res, user);


  let cookie = req.cookies.token

      user.dataValues.token = cookie



      return res.json({
   user
      });
    });




    module.exports = router;
