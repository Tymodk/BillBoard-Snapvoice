const express = require("express");
const Code = require('../models/code.model');
const Connection = require('../models/connection.model');
const User = require('../models/user.model');
const Platform =require('../models/platform.model');

const router = express.Router();

// Display the dashboard page
router.get("/", (req, res) => {
  User.findOne({_id: req.session.userId}, function (err, user) {  
    Code.findOne({userID: req.session.userId}, function (err, foundcode) {
      Connection.find({userID: req.session.userId}, function (err, fconnections) { 
        for (let i = 0; i < fconnections.length; i++) {
          const fconnection = fconnections[i];
        }     
        if (err) console.log(err);
        console.log(foundcode);
        if(foundcode === null){
          if(fconnections === null){
            res.render("dashboard", { code: false, connections:false, user:user});
          } else {
            res.render("dashboard", { code: false, connections:fconnections, user:user});
          }
        } else {
          if(fconnections === null){
            res.render("dashboard", { code: foundcode.Code, connections:false, user:user});
          }else{
            res.render("dashboard", { code: foundcode.Code, connections:fconnections, user:user});
          }
        }
      });
    });
  });
});



module.exports = router;