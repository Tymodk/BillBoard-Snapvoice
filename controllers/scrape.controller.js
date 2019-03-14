const Code = require('../models/code.model');

//Simple version, without validation or sanitation
exports.scrape = function (req, res) {
  res.render("scraper");
};
exports.genereate = function (req, res) {
    if(req.user === undefined){
        res.render("unauthenticated");
    }
    else{
        res.render("scraper");
    }
}