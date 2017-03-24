var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('theJourney.html', { root : 'public' });
});

router.post('/answer', function(req,res,next){

});

router.get('/question', function(req,res,next){

});

module.exports = router;
