const Code = require('../models/code.model');


function makeid(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }

exports.scrape = function (req, res) {
  res.render("scraper");
};
exports.post = function (req, res){
    console.log(req.params.id);
};
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