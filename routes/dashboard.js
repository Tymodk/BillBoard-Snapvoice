const express = require("express");
const Code = require('../models/code.model');
const User = require('../models/user.model');
const router = express.Router();

// Display the dashboard page
router.get("/", (req, res) => {
  User.findOne({_id: req.session.userId}, function (err, user) {  
    Code.findOne({userID: req.session.userId}, function (err, foundcode) {
        if (err) console.log(err);
        console.log(foundcode);
        if(foundcode === null){
          res.render("dashboard", { code: false, user:user});
        } else {
          res.render("dashboard", { code: foundcode.Code, user:user});
        }
    });
  });
});



module.exports = router;