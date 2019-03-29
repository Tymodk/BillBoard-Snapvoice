const express = require('express');
const router = express.Router();

const scrape_controller = require('../controllers/scrape.controller.js');


router.get('/', scrape_controller.scrape);
router.get('/generate', scrape_controller.generate);
router.post('/:id', scrape_controller.post);
router.get('/paths', scrape_controller.paths);
router.get('/paths/:id', scrape_controller.python);
module.exports = router;


/*

router.get("/:id", (req,res)=>{
    console.log(req.params.id);
    res.render("scraper");
});

module.exports = router;

*/