const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let adminSchema = new Schema({
    userID: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Admin', adminSchema);