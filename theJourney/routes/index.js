var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Filter = require("bad-words"), filter = new Filter();
var request = require('request');
var randomWords = require('random-words');

mongoose.connect('mongodb://localhost/OdysseusDB');


var madLibs = [{
    _id: 0,
    title: "The Lotus Eaters",
    madLib: "   After a terrible storm created by <strong>%s</strong>, you make your way to the Land of the Lotus Eaters.\n"+
            "You send <strong>%s</strong> men to go greet the <strong>%s</strong> inhabitants of the land. Upon return, you\n"+
            "find that these <strong>%s</strong> men that you sent don't want to go home anymore. You don't care and shove\n"+
            "them onto your <strong>%s</strong> anyway.\n\n",
    answers:[{
      answerText: "Name of person",
    },{
      answerText: "Number",
    },{
      answerText: "Adjective",
    },{
      answerText: "Adjective"
    },{
      answerText: "Singular noun"
    }]
},{
    _id: 1,
    title: "Polyphemus",
    madLib: "   You escape the spellbinding effect of the Lotus Eaters. You land near <strong>%s</strong> Island, a\n"+
            "location near the Cyclopes. After going <strong>%s</strong> on the Cyclopes' island, you end up getting\n" +
            "captured by Polyphemus. Within 12 hours of meeting Polyphemus he eats <strong>%s</strong> of your men. The\n" +
            "need to escape is dire. After gathering some materials, you fashion a giant <strong>%s</strong> and stab\n " +
            " it into his eye. You then escape and tell Polyphemus your name is <strong>%s</strong>.\n\n",
    answers:[{
      answerText: "Noun (Plural or singular)",
    },{
      answerText: "Progressive verb(-ing verb)",
    },{
      answerText: "Number"
    },{
      answerText: "Noun"
    },{
      answerText: "Name of person"
    }]
},{
    _id: 2,
    title: "Laestrygones",
    madLib: "   After almost making it home, your men open a bag of <strong>%s</strong> which blows you back. You end up\n"+
            "in the land of the Laestrygonians. You disembark and send <strong>%s</strong> men to find the inhabitants. These\n"+
            "men go and implore a <strong>%s</strong> woman to tell them the whereabouts of the king. To their horror the\n" +
            "<strong>%s</strong> king takes one of them and makes dinner of him. As you try to escape a <strong>%s</strong>\n"+ 
            "<strong>%ss</strong> you. Luckily, you make it back to your ship and sail off.\n\n", 
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
      answerText: "Present tense verb"
    }]
},{
    _id: 3,
    title: "Hades",
    madLib: "   Unfortunately only your ship escapes the Laestrygonian's onslaught of <strong>%s</strong> throwing. After\n"+
            "saving your men from being turned into <strong>%s</strong> for the rest of their lives due to the witch Circe,\n"+
            "she tells you that you must go to Hades to and speak to <strong>%s</strong> to find your way home. You rally\n"+
            "your men and follow the instructions that Circe gave you to reach the underworld. After performing the rituals,\n"+
            "you end up talking with <strong>%s</strong>. (S)He tells you of a(n) <strong>%s</strong> that <strong>%ss</strong> a lot.\n\n",
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
    madLib: "   On your way back to Ithaca you must pass the <strong>%s</strong> sirens. You have the option to stuff\n"+
            "everyone's ears with wax including your own, or you can have your men tie you up while you <strong>%s</strong>\n"+
            "to the siren's song. You end up <strong>%s</strong> to the song and pass without problem.\n\n",
    answers:[{
      answerText: "Adjective"
    },{
      answerText: "Present tense verb"
    },{
      answerText: "Progressive verb(-ing)"
    }]
  },{
    _id: 5,
    title: "Calypso",
    madLib: "   After passing the Sirens, Scylla and Charybdis, your men <strong>%s</strong> and slaughter Helio's cattle.\n"+
            "You and your men are then punished by <strong>%s</strong> with a great storm in which only you survive. You wash\n"+
            "up on Calypso's island. Calypso is quite into you. She asks you,\"Would you like a <strong>%s</strong>?\" You\n"+
            "reply,\"No thank you, I'm <strong>%s</strong>.\" After what seems like a billion offers, you finally accept to\n"+
            "stay with her. After <strong>%s</strong> years have passed, the great <strong>%s</strong> decide to convince\n" +
            "Calypso to let you go.\n",
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
      answerText: "Plural noun"
    }]
  },{
    _id: 6,
    title: "Ithica",
    madLib: "   You have finally returned to Ithica. You disguise yourself as a <strong>%s</strong> <strong>%s</strong> so\n"+
            "that you can see who has been loyal to you. After proving that you are Odysseus by shooting a <strong>%s</strong>\n"+
            "through 12 <strong>%s</strong>,you decide to <strong>%s</strong> all the suitors and take back you place as <strong>%s</strong>\n" + 
            " in Ithaca.\n",
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

router.get('/randomWords', function(req,res,next){
  res.json(randomWords(30));
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
