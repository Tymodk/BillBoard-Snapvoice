const Platform = require('../models/platform.model');
const Admin = require('../models/admin.model');

// TEST FUNCTION REMOVE IT OUT OF PRODUCTION 
exports.makeadmin = function (req, res) {
    let admin = new Admin({
        userID: req.user.id,
    })
    admin.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    res.redirect('/');
};

exports.index = function (req, res) {
    Admin.findOne({userID: req.user.id}, function(err, admin) {
        if(admin != null){
            Platform.find({}, function(err, platforms){
                res.render("marketplace", {admin: true, platforms:platforms});
            });
        } else {
            res.render("marketplace", {admin: false});
        }
    });
};

exports.manage = function (req, res) {
    Admin.findOne({userID: req.user.id}, function(err, admin) {
        if(admin != null){
            res.render("manage", {admin: true});
        } else {
            res.redirect('/');            
        }
    });
};
exports.add = function (req, res) {
    Admin.findOne({userID: req.user.id}, function(err, admin) {
        if(admin != null){
            res.render("addplatform", {admin: true});
        } else {
            res.redirect('/');            
        }
    });
};
exports.toDB = function (req, res) { 
    console.log(req.body);
    Admin.findOne({userID: req.user.id}, function(err, admin) {
        var active = false;
        if (req.body.isActive){
             active = true;
        }
        if(admin != null){
            let platform = new Platform({
                name: req.body.name,
                image: req.body.imageurl,
                isActive: active,
            });
            platform.save(function (err) {
                if (err) {
                    console.log(err);
                }
            });
            console.log(platform);
            res.render("addplatform", {admin: true});
        } else {
            res.redirect('/');            
        }
    });
}

exports.products = function (req, res){
    Admin.findOne({userID: req.user.id}, function(err, admin) {
        if(admin != null){
            name = req.params.name;
            Platform.find({name: name}, function(err, platforms){
                res.render("marketplace", {admin: true, platforms:platforms});
            });
            
        } else {
            res.redirect('/');            
        }
    });
}



