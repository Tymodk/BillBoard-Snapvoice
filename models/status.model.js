const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let StatusSchema = new Schema({
    status: {type: String, required: true},
    Platform: {type: String, required: true},
    userID: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Status', StatusSchema);