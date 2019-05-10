const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ConnectionSchema = new Schema({
    Platform: {type: String, required: true},
    PlatformUsername: {type: String, required:true},
    PlatformPassword: {type: String, required:true},
    userID: {type: String, required: true},
});


// Export the model
module.exports = mongoose.model('Connection', ConnectionSchema);