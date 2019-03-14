const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let CodeSchema = new Schema({
    Code: {type: String, required: true, max: 100},
    userIDn: {type: Number, required: true},
});


// Export the model
module.exports = mongoose.model('Code', CodeSchema);