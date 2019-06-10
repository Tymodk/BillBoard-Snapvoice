const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let MaintenanceSchema = new Schema({
    id: {type: String, required: true},
    date: {type: String, required: true},
    message: {type: String, required: true},
    priority: {type: String, required: true},
    isActive: {type: Boolean, required: true, default: false}
    
});


// Export the model
module.exports = mongoose.model('Maintenance', MaintenanceSchema);