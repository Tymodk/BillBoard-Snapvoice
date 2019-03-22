const Code = require('../models/code.model');
const Path = require('../models/path.model');

function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

exports.scrape = function (req, res) {
    if(req.user === undefined){
        res.render("unauthenticated");
    }
    else{
        Path.find({userID: req.user.id}, function(err, paths) {
            res.render("scraper", {pathCollection: paths});
        });
    }

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
    if(req.user === undefined){
        res.render("unauthenticated");
    }
    else{
        Path.find({userID: req.user.id}, function(err, paths) {
            if (err) console.log(err);
            res.render("paths",{paths: paths})
        });
    }
}
exports.generate = function (req, res) {
    if(req.user === undefined){
        res.render("unauthenticated");
    }
    else{
        Code.findOne({userID: req.user.id}, function (err, foundcode) {
            if (err) console.log(err);
            console.log(foundcode);
            if(foundcode === null){
                let gentoken = makeid(8);
                let code = new Code({
                    Code: gentoken,
                    userID: req.user.id,
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