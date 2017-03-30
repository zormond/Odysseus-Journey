var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Filter = require("bad-words"), filter = new Filter();

mongoose.connect('mongodb://localhost/OdysseusDB');


var madLibs = [{
    _id: 0,
    title: "The Lotus Eaters",
    madLib: "After a terrible storm created by %s, you make your way to the Land of the Lotus Eaters. You send %s men to go greet " +
               "the %s people. Upon return, you find that these %s men that you sent have no wanting to go home anymore." + 
               " You don't care and shove them onto the ship anyway.\n\n",
    answers:[{
      answerText: "Name of person",
    },{
      answerText: "Number",
    },{
      answerText: "Adjective",
    },{
      answerText: "Adjective"
    },]
},{
    _id: 1,
    title: "Polyphemus",
    madLib: "After escaping the spellbinding effect of the %s Lotus Eaters you landed near %s Island, an island near the Cyclopes. You decided" +
               " to go %s where the Cyclopes live and end up being captured by Polyphemus. Within 12 hours of meeting Polyphemus he eats" +
               " %s of your men. The need to escape is %s. So you fashion a giant %s and stab it into his eye. You then escape and tell " +
               "Polyphemus your name is %s.\n\n",
    answers:[{
      answerText: "Adjective",
    },{
      answerText: "Noun (Plural or singular)",
    },{
      answerText: "Progressive verb(-ing verb)",
    },{
      answerText: "Number"
    },{
      answerText: "Adjective"
    },{
      answerText: "Noun"
    },{
      answerText: "Name of person"
    }]
},{
    _id: 2,
    title: "Laistrygones",
    madLib: "After almost making it home, your men open the bag of winds and %s you back %s. You end up in the land of the Laistrygonians." +
               "You disembark and send %s men to find the inhabitants. These men go and implore a young woman to tell them the whereabouts of the king." +
               " To their horror the %s king takes one of them and makes dinner of him. As you try to escape a %s %ss you. Luckily, you make it back" + 
               " to your ship and sail off.\n\n", 
    answers:[{
      answerText: "Plural noun",
    },{
      answerText: "Adverb",
    },{
      answerText: "Number",
    },{
      answerText: "Adjective",
    },{
      answerText: "Noun"
    },{
      answerText: "Present tense verb"
    }]
},{
    _id: 3,
    title: "Hades",
    madLib: "Unfortunetaly only your ship escapes the Laistrygonians onslaught of %s throwing. After saving your men from being %s the rest of their lives due" + 
               "to the witch Circe, she tells you that you must go to Hades to and speak to %s to find your way home. You %s your men and follow the instructions Circe" +
               "gave you to reach the underworld. After performing the rituals, you end up taking with %s. He tells you of a %s that %s a lot.\n\n",
    answers:[{
      answerText: "Singular noun",
    },{
      answerText: "Plural noun",
    },{
      answerText: "Name",
    },{
      answerText: "Present tense verb"
    },{
      answerText: "Name"
    },{
      answerText: "Singular noun"
    },{
      answerText: "Present tense verb"
    }]
},{
    _id: 4,
    title: "The Sirens",
    madLib: "On your way back to Ithaca you must pass the %s sirens. You have the option to stuff everyone's ears with %s including your own, or you can have" + 
               " your men tie you up while you %s to the sirens song. You end up %s to the song and pass without problem.\n\n",
    answers:[{
      answerText: "Adjective or adverb"
    },{
      answerText: "Noun",
    },{
      answerText: "Present tense verb"
    },{
      answerText: "Progressive verb(-ing)"
    }]
  },{
    _id: 5,
    title: "Calypso",
    madLib: "After passing the Sirens, Scylla and Charybdis, your men %s and slaughter Helio's cattle. You and your men are punished by %s with a great" +
               "storm in which only you survive and wash up on Calypso's island. Calypso is quite into you. She asks you,'Would you like a %s?'" + 
               "You reply,`No thank you, I'm %s.` After what seems like a billion offers, you finally accept to stay with her. After %s have passed, the "+
               "the %s decide to convince Calypso to let you go.\n\n",
    answers:[{
      answerText: "Present tense verb"
    },{
      answerText: "Name",
    },{
      answerText: "Singular noun"
    },{
      answerText: "Adjective"
    },{
      answerText: "Number"
    },{
      answerText: "Plural nouns"
    }]
  },{
    _id: 6,
    title: "Ithica",
    madLib: "You have finally returned to Ithica. You disguised yourself as a %s %s to see who has been loyal to you."+
               "After proving that you are Odysseus by shooting a %s through 12 %s, you decide to %s all the suitors and take back you place as %s.\n\n",
    answers:[{
      answerText: "Adjective",
    },{
      answerText: "Noun",
    },{
      answerText: "Noun",
    },{
      answerText: "Plural noun"
    },{
      answerText: "Present tense verb"
    },{
      answerText: "Noun"
    }]
  }];


var madLibSchema = mongoose.Schema({
  _id: Number,
  title: String,
  madLib: String,
  answers:[{
    answerText: String,

  }]
});

var totalMadLibSchema = mongoose.Schema({
  _id: Date,
  user: String,
  odyssian: Number,
  different: Number,
  brutal: Number,
  totalMadLib: String,
});

var totalMadLib = mongoose.model('totalMadLib', totalMadLibSchema);

var madLib = mongoose.model('madLib', madLibSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error: '));
db.once('open', function(){
    console.log("MongoDB connected");

});

var clearMadLibs = function(){
  madLib.remove({},function(err){
    if(err) {return console.error(err);}
    else
    {
      //console.log("This is the remove message: " + messsage);
    }
  });
};

var clearTotalMadLibs = function(){
  totalMadLib.remove({},function(err){
    if(err) {return console.error(err);}
    else{

    }
  });
}


 var initializeMadLibs = function()
 {for(var i = 0; i < madLibs.length; i++){
    var newMadLib = new madLib(madLibs[i]);
    newMadLib.save(function(err,totalMadLib){
      console.log("this is the totalMadLib from saving: " + totalMadLib);
    });
  }
}
clearMadLibs();
initializeMadLibs();
//clearResults();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('theJourney.html', { root : 'public' });
});

router.post('/totalMadLib', function(req,res,next){
  var cleanUser = filter.clean(req.body.user);
  var newResult = req.body;
  newResult.user = cleanUser;
  newResult._id = new Date();
  var resultToSave = new totalMadLib(newResult);
  resultToSave.save(function(err,totalMadLib){
    console.log(totalMadLib);
  });
  res.json({totalMadLib:"finished"});
});

router.get('/totalMadLibs',function(req,res,next){
  totalMadLib.find({}).sort({"_id":'-1'}).exec(function(err,totalMadLibs){
    if(err) return console.error(err);
    else{
      console.log(totalMadLibs);
      res.json(totalMadLibs);
    }
  })
});

router.get('/madLibs', function(req,res,next){
  console.log("In the madLibs route");
  madLib.find({}).sort({'_id': '1'}).exec(function(err,madLibs){
    if(err) return console.error(err);
    else{
      console.log(madLibs);
      res.json(madLibs);
    }
  });
});


module.exports = router;
