const express = require("express");
const Connection = require('../models/connection.model');
const User = require('../models/user.model');
const Platform =require('../models/platform.model');

const router = express.Router();

function inactivity(fconnections){
  return new Promise((resolve, reject) => {
    var toremove = [];
    for (let i = 0; i < fconnections.length; i++) {
      const fconnection = fconnections[i];
      Platform.findOne({name: fconnection.Platform}, function(err, platform){
        if(!platform.isActive){
          toremove.push(i);
        }
        if(i == fconnections.length-1){     
          if(toremove.length == 0){
            resolve(fconnections);       

          }     
          for (let index = 0; index < toremove.length; index++) {
            const i = toremove[index];
            delete fconnections[i];
            if(index == toremove.length-1){
              resolve(fconnections);        
            }        
          }
        }
      });
    }  
  })
};


// Display the dashboard page
router.get("/", (req, res) => {
  User.findOne({_id: req.session.userId}, function (err, user) {  
    Connection.find({userID: req.session.userId}, async function (err, fconnections) {  
      console.log(fconnections.length);
      if(fconnections.length === 0){
        res.render("dashboard", {connections:false, user:user});
      } else {
        let fconnectionsfinal;
        try {
          fconnectionsfinal = await inactivity(fconnections);
        } catch(e){
          console.log(e);
        }     
        if (err) console.log(err);
        res.render("dashboard", {connections:fconnectionsfinal, user:user});
      }
      
    });
  });
});



module.exports = router;