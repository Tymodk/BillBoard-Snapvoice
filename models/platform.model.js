const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let platformSchema = new Schema({
    name: {type: String, required: true},
    image: {type: String, required: true},
    isActive: {type: Boolean, required: true, default: false},
});


// Export the model
module.exports = mongoose.model('Platform', platformSchema);