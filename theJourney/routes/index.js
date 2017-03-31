var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Filter = require("bad-words"), filter = new Filter();

mongoose.connect('mongodb://localhost/OdysseusDB');


var madLibs = [{
    _id: 0,
    title: "The Lotus Eaters",
    madLib: "   After a terrible storm created by <strong>%s</strong>, you make your way to the Land of the Lotus Eaters.\n"+
            "You send <strong>%s</strong> men to go greet the <strong>%s</strong> people. Upon return, you find that these <strong>%s</strong> men that\n"+
            "you sent have no wanting to go home anymore. You don't care and shove them onto the ship\n"+
            "anyway.\n\n",
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
    madLib: "   You escape the spellbinding effect of the <strong>%s</strong> Lotus Eaters. You land near <strong>%s</strong> Island, an\n"+
            "island near the Cyclopes. You decide to go <strong>%s</strong> where the Cyclopes live and end up being\n" +
            "captured by Polyphemus. Within 12 hours of meeting Polyphemus he eats <strong>%s</strong> of your men. The\n" +
            "need to escape is <strong>%s</strong>. So you fashion a giant <strong>%s</strong> and stab it into his eye. You then escape\n"+
            "and tell Polyphemus your name is <strong>%s</strong>.\n\n",
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
    title: "Laestrygones",
    madLib: "   After almost making it home, your men open the bag of <strong>%s</strong> that blows you back. You end up\n"+
            "in the land of the Laestrygonians. You disembark and send <strong>%s</strong> men to find the inhabitants. These\n"+
            "men go and implore a <strong>%s</strong> woman to tell them the whereabouts of the king. To their horror the\n" +
            "<strong>%s</strong> king takes one of them and makes dinner of him. As you try to escape a <strong>%s</strong> <strong>%s</strong> you. Luckily,\n"+
            "you make it back to your ship and sail off.\n\n", 
    answers:[{
      answerText: "Plural noun",
    },{
      answerText: "Number",
    },{
      answerText: "Adjective",
    },{
      answerText: "Adjective",
    },{
      answerText: "Noun"
    },{
      answerText: "Verb connected with previous noun "
    }]
},{
    _id: 3,
    title: "Hades",
    madLib: "   Unfortunetaly only your ship escapes the Laistrygonians onslaught of <strong>%s</strong> throwing. After saving\n"+
            "your men from being <strong>%s</strong> the rest of their lives due to the witch Circe, she tells you that you must\n"+
            "go to Hades to and speak to <strong>%s</strong> to find your way home. You rally your men and follow the instructions\n"+
            "Circe gave you to reach the underworld. After performing the rituals, you end up talking with <strong>%s</strong>. He\n"+
            "tells you of a <strong>%s</strong> that <strong>%s</strong> a lot.\n\n",
    answers:[{
      answerText: "Singular noun",
    },{
      answerText: "Plural noun",
    },{
      answerText: "Name",
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
    madLib: "   On your way back to Ithaca you must pass the <strong>%s</strong> sirens. You have the option to stuff everyone's\n"+
            "ears with <strong>%s</strong> including your own, or you can have your men tie you up while you <strong>%s</strong> to the sirens\n"+
            "song. You end up <strong>%s</strong> to the song and pass without problem.\n\n",
    answers:[{
      answerText: "Adjective"
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
    madLib: "   After passing the Sirens, Scylla and Charybdis, your men <strong>%s</strong> and slaughter Helio's cattle. You\n"+
            "and your men are punished by <strong>%s</strong> with a great storm in which only you survive and wash up on\n"+
            "Calypso's island. Calypso is quite into you. She asks you,'Would you like a <strong>%s</strong>?' You reply,`No\n"+
            "thank you, I'm <strong>%s</strong>.` After what seems like a billion offers, you finally accept to stay with her.\n"+
            "After <strong>%s</strong> years have passed, the <strong>%s</strong> decide to convince Calypso to let you go.\n\n",
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
    madLib: "   You have finally returned to Ithica. You disguised yourself as a <strong>%s</strong> <strong>%s</strong> to see who has been\n"+
            "loyal to you. After proving that you are Odysseus by shooting a <strong>%s</strong> through 12 <strong>%s</strong>, you decide to\n"+
            "<strong>%s</strong> all the suitors and take back you place as <strong>%s</strong>.\n\n",
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
