var express = require('express');
var router = express.Router();
const env = require('../env.js');




/* GET home page. */
router.get('/', function(req, res, next) {  
  res.render('index', { title: 'BillBoard'});
});


module.exports = router;
