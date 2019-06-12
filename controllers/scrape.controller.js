const Code = require('../models/code.model');
const Path = require('../models/path.model');
const User = require('../models/user.model');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

exports.scrape = function (req, res) {
    if(!req.session.userId === undefined){
        res.render("unauthenticated");
    }
    else{
        User.findOne({_id: req.session.userId}, function (err, user) {  
            Code.findOne({userID: req.session.userId}, function (err, foundcode) {
                if (err) console.log(err);
                console.log(foundcode);
                if(foundcode === null){
                  res.render("scraper", { code: false, user:user});
                } else {
                  res.render("scraper", { code: foundcode.Code, user:user});
                }
            });
        });
    }

};
exports.python = function (req, res) {
    res.send('UNDER CONSTRUCTION');
    // TODO: FLASK SERVER END POINT TO THEN CALL SCRAPER AND RETURN INFO 
};
exports.post = function (req, res){
    console.log(req.params.id);
    console.log(req.body);
    Code.findOne({Code: req.params.id}, function (err, foundcode) {
        if (err) console.log(err);
        console.log(foundcode);
        if(foundcode != null){
            let path = new Path({
                userID: foundcode.userID,
                path: req.body, 
            })
            path.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            res.json({ succes: path});
        } else {
            res.json({ error: 'Not found'});
        }
    });
};
exports.paths = function (req, res) {
    if(!req.session.userId){
        res.render("unauthenticated");
    }
    else{
        Path.find({userID: req.session.userId}, function(err, paths) {
            if (err) console.log(err);
            res.render("paths",{paths: paths})
        });
    }
}
exports.generate = function (req, res) {
    if(!req.session.userId){
        res.render("unauthenticated");
    }
    else{
        Code.findOne({userID: req.session.userId}, function (err, foundcode) {
            if (err) console.log(err);
            console.log(foundcode);
            if(foundcode === null){
                let gentoken = makeid(8);
                let code = new Code({
                    Code: gentoken,
                    userID: req.session.userId,
                })
                code.save(function (err) {
                    if (err) {
                        console.log(err);
                    }
                });
                res.render("generator", { code: gentoken});
            } else {
                res.render("generator", { code: foundcode.Code});
            }
        });
    }
}

exports.callScraper = function (req, res){
    console.log(req.body);  
    var params = {
        "username": req.body.username,
        "password": req.body.password,
        "userId": req.body.userId,
        "key": req.body.keyvar
      }
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
              console.log("Ready")
          }
      }
      xmlHttp.open("POST", `http://localhost:5002/${req.params.platform.toLowerCase().replace('.','')}scraper/`, true); // true for asynchronous
      xmlHttp.setRequestHeader('Content-type', 'application/json')
      xmlHttp.send(JSON.stringify(params));
      res.json({'status':'finished'});    
}