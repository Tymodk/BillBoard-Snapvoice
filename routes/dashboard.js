const express = require("express");
const Code = require('../models/code.model');

const router = express.Router();

// Display the dashboard page
router.get("/", (req, res) => {
  Code.findOne({userID: req.user.id}, function (err, foundcode) {
      if (err) console.log(err);
      console.log(foundcode);
      if(foundcode === null){
        res.render("dashboard", { code: false});
      } else {
        res.render("dashboard", { code: foundcode.Code});
      }
  });
});
router.get('/test', (req, res) => {
  res.json({ profile: req.user ? req.user : null });
});


module.exports = router;