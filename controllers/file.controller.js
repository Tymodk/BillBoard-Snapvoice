const Pdf = require('../models/pdf.model');
const fs = require("fs")

exports.pdfstore = function (req, res) {
    for (let index = 0; index < Object.keys(req.files).length; index++) {

        const file = req.files[Object.keys(req.files)[index]];
        position = './public/invoices/' + req.body.userId + '/'
        filepath = '/invoices/' + req.body.userId + '/'
        if (!fs.existsSync(position)){
            fs.mkdirSync(position);
        }
        file.mv(position + file.name, function(err) {
            if (err)
              console.log(err)
            pdfData = {
                Platform: req.body.Platform,
                userID: req.body.userId,
                name: req.body.userId + ' - ' + file.name ,
                date:  new Date(),
                location: filepath + file.name, 
            }            
            Pdf.findOneAndUpdate({name: req.body.userId + ' - ' + file.name, userID: req.body.userId}, pdfData, {upsert:true}, function(err, doc){
                console.log("succesfully saved");
            }); 
          });    
    }
    res.json({ pdfstore: 'Arrived'});
};
exports.fetchpdfs = function (req, res){
    console.log(req.query);
    
    platform = req.query.platform;
    userId = req.query.userId;
    Pdf.find({Platform: new RegExp(`^${platform}$`, 'i'), userID: new RegExp(`^${userId}$`, 'i')}, function(err, pdfs){
        res.json({data: pdfs});
    });
}
