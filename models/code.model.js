const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CodeSchema = new Schema({
    Code: {type: String, required: true, max: 100},
    userID: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Code', CodeSchema);