const express = require('express');
const router = express.Router();

const status_controller = require('../controllers/status.controller.js');


router.post('/getStatus', status_controller.getStatus);
router.post('/updateStatus/:platform', status_controller.updateStatus);



module.exports = router;


