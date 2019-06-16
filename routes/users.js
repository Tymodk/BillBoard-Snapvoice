const express = require("express");
const User = require('../models/user.model');


const router = express.Router();

// Log a user out
router.get('/logout', function(req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function(err) {
      if(err) {
        return next(err);
      } else {
        return res.redirect('/');
      }
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", (req, res) =>{
  if (req.body.email && req.body.password) {
      User.authenticate(req.body.email, req.body.password, function (error, user) {
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          return res.redirect('/users/login');
        } else {
          req.session.userId = user._id;
          return res.redirect('/dashboard');
        }
      });
    } else {
      res.redirect('/');
    }

})

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register",(req, res) => {
  if (req.body.email &&
    req.body.username &&
    req.body.password) {
  
    var userData = {
      email: req.body.email,
      username: req.body.username,
      password: req.body.password,
    }
    exists = false;
    User.findOne({email: req.body.email}, function(err, user){
      if(user != null){
        return res.render('register',  { err: 'E-mail already taken'});
      }
    });
    User.findOne({username: req.body.username}, function(err, user){
      if(user != null){
        return res.render('register',  { err: 'Username has already been taken'});
      }
    });
    //use schema.create to insert data into the db
    User.create(userData, function (err, user) {
      if (err) {
        console.log(err)
      } else {
        return res.redirect('/users/login');
      }
    });
  }
});

module.exports = router;