const express = require('express');
const router = express.Router();

const scrape_controller = require('../controllers/scrape.controller.js');


router.get('/', scrape_controller.scrape);
router.get('/generate', scrape_controller.generate);
router.get('/:id', scrape_controller.post);
module.exports = router;


/*

router.get("/:id", (req,res)=>{
    console.log(req.params.id);
    res.render("scraper");
});

module.exports = router;

*/