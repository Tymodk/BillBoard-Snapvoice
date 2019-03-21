const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let pathSchema = new Schema({
    userID: {type: String, required: true},
    path: {type: [String], required: true},
});


// Export the model
module.exports = mongoose.model('Path', pathSchema);