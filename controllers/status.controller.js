const Status = require('../models/status.model');

exports.updateStatus = function (req, res) {
    statusData = {
        Platform: req.params.platform,
        userID: req.body.userId,
        status: req.body.status,
        
    }            
    console.log(statusData);
    Status.findOneAndUpdate({Platform: new RegExp(`^${req.params.platform}$`, 'i'), userID: new RegExp(`^${req.body.userId}$`, 'i')}, statusData, {upsert:true}, function(err, status){
        res.json({status: status});
    }); 
}

exports.getStatus = function (req, res){
    Status.findOne({Platform: req.body.platform, userID: req.body.userId}, function(err, status){
        res.json({status: status.status});
    });
}
