const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let PdfSchema = new Schema({
    Platform: {type: String, required: true},
    userID: {type: String, required: true},
    name: {type: String, required:true},
    date: {type: String, required:true},
    location: {type: String, required:true},    

});


// Export the model
module.exports = mongoose.model('Pdf', PdfSchema);