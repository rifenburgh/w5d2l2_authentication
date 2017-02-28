const express         = require('express');
const authRoutes      = express.Router();
const User            = require('../models/user-model.js');
const bcrypt          = require('bcrypt');
authRoutes.get('/signup', (req, res, next) => {
  res.render('auth/signup.ejs');
});
authRoutes.post('/signup', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({username: username}, {username: 1}, (err, foundUser) => {
    if (err) {
      next (err);
      return;
      }
    if (foundUser !== null) {
      res.render('auth/signup.ejs', {
        errorMessage: "Username Already Exist",
        foundUesr: foundUser
      });
      return;
    }
    const errorMessage = false;
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    const userInfo = {
      username: username,
      password: hashPassword
    };
    newUser = new User(userInfo);
    newUser.save((err) => {
      res.redirect('/');
    });
  });
});
module.exports = authRoutes;
