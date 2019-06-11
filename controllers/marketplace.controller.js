const Platform = require('../models/platform.model');
const User = require('../models/user.model');
const Connection = require('../models/connection.model');
const crypto = require('crypto');
const Maintenance = require('../models/maintenance.model');

exports.index = function (req, res) {
    //potential dupecode due to header error otherwise
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
                Platform.find({}, function(err, platforms){
                    res.render("manage", {admin: admin, platforms:platforms});
                });

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
exports.maintenance = function (req, res) {
    if(!req.session.userId){
        res.render("unauthenticated")
    }
    User.findOne({_id: req.session.userId}, function(err, admin) {
        if(admin != null){
            if(admin.isAdmin){
                name = req.params.name;
                Maintenance.findOne({id: '1'}, function(err, maintenance){
                    console.log(maintenance);
                    res.render("maintenance", {admin: admin,  maintenance:maintenance});
                });
            } else {
                res.redirect('/');            
            }
        }
    });
};
exports.updateMaintenance = function (req, res) { 
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
                msgData = {
                    id: 1,
                    message: req.body.message,
                    priority: req.body.priority,
                    date: new Date(),
                    isActive: active
                };
                console.log(msgData);
                Maintenance.findOneAndUpdate({id: 1}, msgData, {upsert:true}, function(err, doc){
                    if (err) return res.send(500, { error: err });
                    console.log("succesfully saved maintenance");
                });
                res.redirect('/marketplace/manage');
            } else {
                res.redirect('/');            
            }
        }
    });
}

exports.edit = function (req, res) {
    if(!req.session.userId){
        res.render("unauthenticated")
    }
    User.findOne({_id: req.session.userId}, function(err, admin) {
        if(admin != null){
            if(admin.isAdmin){
                name = req.params.name;
                Platform.findOne({name: name}, function(err, platform){
                    console.log(platform);
                    res.render("editplatform", {admin: admin,  platform:platform});
                });
            } else {
                res.redirect('/');            
            }
        }
    });
};
exports.update = function (req, res) { 
    platname = req.params.name;
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
                
                Platform.findOneAndUpdate({name: platname}, platData, function(err, doc){
                    if (err) return res.send(500, { error: err });
                    console.log("succesfully saved");
                });
                res.redirect('/marketplace/manage');
            } else {
                res.redirect('/');            
            }
        }
    });
}
exports.delete = function (req, res) { 
    platname = req.params.name;
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
                Platform.deleteOne({name: platname}, function(err, doc){
                    if (err) return res.send(500, { error: err });
                    console.log("succesfully deleted");
                });
                Connection.deleteMany({Platform: platname}, function(err, doc){
                    if (err) return res.send(500, { error: err });
                    console.log("succesfully deleted connections");
                });                
                res.redirect('/marketplace/manage');
            } else {
                res.redirect('/');            
            }
        }
    });
}

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
    if(!req.session.userId){
        Platform.findOne({name: name}, function(err, platform){
            res.render("productdetail", {admin: false, platform:platform});
        });
    } else{
        Platform.findOne({name: name}, function(err, platform){
            Connection.findOne({userID: req.session.userId, Platform: name}, function(err, connection){
                console.log(connection)
                res.render("productdetail", {admin: false, platform:platform, details:connection});            
            });
        });
    }
}
exports.deleteConnection = function (req, res){
    name = req.params.name;
    if(!req.session.userId){
        Platform.findOne({name: name}, function(err, platform){
            res.render("productdetail", {admin: false, platform:platform});
        });
    } else{
        Connection.deleteOne({userID: req.session.userId, Platform: name}, function(err, doc){
            res.redirect("/marketplace/product/" + name);            
        });
    }
}



exports.addToDash = function (req, res){
    if(!req.session.userId){
        res.render("unauthenticated")
    }
    enckey = req.body.encryptionkey
    let keyvar = ''
    for (let index = 0; index < 32; index++) {
        keyvar += req.body.encryptionkey[index%enckey.length];
        
    }
    console.log(keyvar)
    var iv = new Buffer('asdfasdfasdfasdf')
    var key = new Buffer(keyvar)
    var cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    cipher.update(new Buffer(req.body.password));
    var enc = cipher.final('base64');
    console.log(enc)
    connectionData = {
        Platform: req.params.name,
        PlatformUsername: req.body.username,
        PlatformPassword: enc,
        userID: req.session.userId,
    }
    Connection.findOneAndUpdate({Platform: req.params.name, userID: req.session.userId}, connectionData, {upsert:true}, function(err, doc){
        console.log(err);
        console.log("succesfully saved");
    });   
    res.redirect('/dashboard');
}


