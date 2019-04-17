const express = require("express");
const marketplace_controller = require('../controllers/marketplace.controller.js');


const router = express.Router();

// Home page
router.get("/", marketplace_controller.index);
router.get("/manage", marketplace_controller.manage);
router.get("/manage/add", marketplace_controller.add);
router.post("/manage/add", marketplace_controller.toDB);
router.get("/product/:name", marketplace_controller.products);










// TEST FUNCTION REMOVE IT OUT OF PRODUCTION 
router.get("/makemeadmin", marketplace_controller.makeadmin);

module.exports = router;