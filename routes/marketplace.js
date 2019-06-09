const express = require("express");
const marketplace_controller = require('../controllers/marketplace.controller.js');


const router = express.Router();

// Home page
router.get("/", marketplace_controller.index);
router.get("/manage", marketplace_controller.manage);
router.get("/manage/add", marketplace_controller.add);
router.post("/manage/add", marketplace_controller.toDB);
router.get("/product/:name", marketplace_controller.products);
router.post("/product/:name", marketplace_controller.addToDash);
router.get("/manage/:name", marketplace_controller.edit);
router.post("/manage/:name", marketplace_controller.update);










module.exports = router;