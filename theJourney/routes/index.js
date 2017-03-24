var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/OdysseusDB');

var situationSchema = mongoose.Schema({
  title: String,
  situation: String,
  answers:[{
    answerText: String,
    answerScore: String,
  }]
});

var situation = mongoose.model('situations', situationSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error: '));
db.once('open', function(){
    console.log("MongoDB connected");
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('theJourney.html', { root : 'public' });
});

router.post('/answer', function(req,res,next){

});

router.get('/situations', function(req,res,next){
  console.log("In the situations route");
  situation.find(function(err,questions){
    if(err) return console.error(err);
    else{
      console.log(questions);
      res.json(questions[0]);
    }
  });
});

module.exports = router;
