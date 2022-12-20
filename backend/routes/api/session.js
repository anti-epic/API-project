// backend/routes/api/session.js
const express = require('express')
const router = express.Router();
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Email or username is required'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Password is required'),
    handleValidationErrors
  ];


// Log in
router.post('/', validateLogin, async (req, res, next) => {
      const { credential, password } = req.body;
  console.log(credential)
      const user = await User.login({ credential, password });

      if (!user) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = ['The provided credentials were invalid.'];
        return next(err);
      }

      await setTokenCookie(res, user);

      return res.json({
     user

});
    });



// Log out
router.delete('/', (_req, res) => {
          res.clearCookie('token');
          return res.json({ message: 'success' });
});


 router.get('/', restoreUser, (req, res) => {
  const { user } = req;
  console.log(document.cookie)
  if (user) {
    return res.json({
      user: user.toSafeObject(),
    });
  }
  else {
    res.statusCode = 401
  return  res.json({

    "message": "Authentication required",
  "statusCode": 401 })}
});


module.exports = router;
