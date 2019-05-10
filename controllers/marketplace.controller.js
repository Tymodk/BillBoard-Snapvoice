const Platform = require('../models/platform.model');
const User = require('../models/user.model');
const Connection = require('../models/connection.model');
// TEST FUNCTION REMOVE IT OUT OF PRODUCTION 
exports.makeadmin = function (req, res) {
    //to be fixed
};

exports.index = function (req, res) {
    if(req.session.userId){
        User.findOne({_id: req.session.userId}, function(err, admin) {
            if(admin != null){
                if(admin.isAdmin){
                    Platform.find({isActive: true}, function(err, platforms){
                        res.render("marketplace", {admin: admin, platforms:platforms});
                    });
                } else {
                    Platform.find({isActive: true}, function(err, platforms){
                        res.render("marketplace", {admin: false, platforms:platforms});
                    });
                }
            }        
        });
    } else {
        Platform.find({isActive: true}, function(err, platforms){
            res.render("marketplace", {admin: false, platforms:platforms});
        });
    }
};

exports.manage = function (req, res) {
    if(!req.session.userId){
        res.render("unauthenticated")
    }
    User.findOne({_id: req.session.userId}, function(err, admin) {
        if(admin != null){
            if(admin.isAdmin){
                res.render("manage", {admin: admin});
            } else {
                res.redirect('/');            
            }
        }
    });
};
exports.add = function (req, res) {
    if(!req.session.userId){
        res.render("unauthenticated")
    }
    User.findOne({_id: req.session.userId}, function(err, admin) {
        if(admin != null){
            if(admin.isAdmin){
                res.render("addplatform", {admin: admin});
            } else {
                res.redirect('/');            
            }
        }
    });
};
exports.toDB = function (req, res) { 
    if(!req.session.userId){
        res.render("unauthenticated")
    }
    console.log(req.body);
    User.findOne({_id: req.session.userId}, function(err, admin) {
        var active = false;
        if (req.body.isActive){
             active = true;
        }
        if(admin != null){
            if(admin.isAdmin){
                platData = {
                    name: req.body.name,
                    image: req.body.imageurl,
                    description: req.body.description,
                    isActive: active,
                };
                
                Platform.findOneAndUpdate({name: req.body.name}, platData, {upsert:true}, function(err, doc){
                    if (err) return res.send(500, { error: err });
                    console.log("succesfully saved");
                });
                res.render("addplatform", {admin: admin});
            } else {
                res.redirect('/');            
            }
        }
    });
}

exports.products = function (req, res){
    name = req.params.name;
    Platform.findOne({name: name}, function(err, platform){
        console.log(platform);
        res.render("productdetail", {admin: true, platform:platform});
    });
}


exports.addToDash = function (req, res){
    name = req.params.name;
    res.redirect('/dashboard');
}


