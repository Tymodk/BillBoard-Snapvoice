const express = require("express");
const file_controller = require('../controllers/file.controller.js');


const router = express.Router();

// Home page
router.post("/pdfstore", file_controller.pdfstore);
router.get("/getPdfs/", file_controller.fetchpdfs);











module.exports = router;