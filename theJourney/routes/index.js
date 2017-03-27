var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost/OdysseusDB');

var situations = [{
    _id: 0,
    title: "The Lotus Eaters",
    situation: "After a terrible storm created by Zeus, you make your way to the Land of the Lotus Eaters. You send 3 men to go greet " +
               "these people. Upon return, you find that these men have no wanting to go home anymore. What do you do? ",
    answers:[{
      answerText: "Force the men on the ship, no matter how much they cry.",
      answerScore: "Odyssian" //Odyssian
    },{
      answerText: "Kill these men for their mutiny and abandonment.",
      answerScore: "Brutal" //Brutal
    },{
      answerText: "Leave the men on the island to live onward in ignorant bliss.",
      answerScore: "Different" //Different
    }]
  },{
    _id: 1,
    title: "Polyphemus",
    situation: "After escaping the spellbinding effect of the Lotus Eaters you landed near the island of the Cyclopes. You decided" +
               " to go exploring where the Cyclopes live and end up being captured by Polyphemus. Within 12 hours of meeting Polyphemus he eats" +
               " four of your men. The need to escape is dire. How do you do so? ",
    answers:[{
      answerText: "Engage in hand to hand combat with Polyphemus. The other giants here the conflict, opening the giant door, and allowing you to escape.",
      answerScore: "2" //Different
    },{
      answerText: "Somehow sweet talk Polyphemus into accepting a sacrifice of your crew in the cave in return for only your escape.",
      answerScore: "Brutal" //Brutal
    },{
      answerText: "Fashion a giant shiv and stab him in the eye which leads Polyphemus to open the door, leading to your escape.",
      answerScore: "Odyssian" //Odyssian
    }]
  },{
    _id: 2,
    title: "Laistrygones",
    situation: "After almost making it home, your men open the bag of winds and blow you back. You end up in the land of the Laistrygonians." +
               "You disembark and send 3 men to find the inhabitants. These men go and implore a young woman to tell them of the king of the land." +
               "To their horror the leader takes one of them and makes dinner of him. As you try to escape with your men...",
    answers:[{
      answerText: "You throw some of your own men down to slow the oncoming Laistrygonians, easily making back to your own ship in time.",
      answerScore: "Brutal" //Brutal
    },{
      answerText: "You cut your own ship free and flee as fast as you can, only worrying about the men on your ship.",
      answerScore: "Odyssian" //Odyssian
    },{
      answerText: "You run towards the Laistrygones as a distraction to save your men. You still luckily make it back to your ship in time.",
      answerScore: "Different" //Different
    }]
  },{
    _id: 3,
    title: "Hades",
    situation: "Unfortunetaly only your ship escapes the Laistrygonians onslaught of boulder throwing. After saving your men from being pigs the rest of their lives from" + 
               "the witch Circe, she tells you that you must go to Hades to and speak to Tiresias to find your way home. You rally your men and follow the instructions Circe" +
               "gave you to reach the underworld. After performing the rituals, who do you choose to speak to? ",
    answers:[{
      answerText: "Elpenor, Tiresias, Agamemnon, Achilles, Ajax Odyssian",
      answerScore: "Odyssian" //Odyssian
    },{
      answerText: "Only talk to Tiresias to receive the prophecy and leave.",
      answerScore: "Brutal" //Brutal
    },{
      answerText: "Speak with everyone that approaches.",
      answerScore: "Different" //Different
    }]
  },{//This one has two answers.
    _id: 4,
    title: "The Sirens",
    situation: "On your way back to Ithaca you must pass the deadly sirens. You have the option to stuff everyone's ears with wax including your own, or you can have" + 
               " your men tie you up while you listen. Which do you choose?",
    answers:[{
      answerText: "Stuff everyone's ears with wax, including your own",
      answerScore: "Different"//Different
    },{
      answerText: "Stuff everyone's ears but your own.",
      answerScore: "Odyssian" //Odyssian
    },{
      answerText: "Lead an onslaught against the Sirens, losing half of your men.",
      answerScore: "Brutal"//Brutal
    }]
  },{
    _id: 5,
    title: "Calypso",
    situation: "After passing the Sirens and Scylla and Charybdis, your men disobey you and slaughter Helio's cattle. You and your men are punished by Zeus with a great" +
               "storm in which only you survive and wash up on Calypso's island. Calypso is quite into you... what do you do?",
    answers:[{
      answerText: "Live on your own, remembering that you have a wife in Ithica, and wait to see if the gods will help you.",
      answerScore: "Different"//Different
    },{
      answerText: "Resist but give in and enjoy your stay until the gods 'save' you.",
      answerScore: "Odyssian" //Odyssian
    },{
      answerText: "Welcome Calypso into your life and enjoy your stay until the gods 'save' you.",
      answerScore: "Brutal" //Brutal
    }]
  },{
    _id: 6,
    title: "Ithica",
    situation: "You have returned to Ithaca after the gods decided to convince Calypso to let you return home. You disguised yourself to see who has been loyal to you"+
               " all this time. After passing Penolope's test, what do you decide to do with the suitors?",
    answers:[{
      answerText: "Slaughter them all, showing no mercy.",
      answerScore: "Odyssian" //Odyssian
    },{
      answerText: "Let the suitors live, but force them from your home.",
      answerScore: "Different" //different
    },{
      answerText: "Banish the suitors from Ithaca, making sure that they never have any influence ever again.",
      answerScore: "Different" //different
    }]
  }];


var situationSchema = mongoose.Schema({
  _id: Number,
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

var clearSituations = function(){
  situation.remove({},function(err){
    if(err) {return console.error(err);}
    else
    {
      //console.log("This is the remove message: " + messsage);
    }
  });
};


 var initializeSituations = function()
 {for(var i = 0; i < situations.length; i++){
    var newSituation = new situation(situations[i]);
    newSituation.save(function(err,result){
      console.log("this is the result from saving: " + result);
    });
  }
}
clearSituations();
initializeSituations();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('theJourney.html', { root : 'public' });
});

router.post('/situations', function(req,res,next){

});

router.get('/situations', function(req,res,next){
  console.log("In the situations route");
  situation.find({}).sort({'_id': '1'}).exec(function(err,Situations){
    if(err) return console.error(err);
    else{
      console.log(Situations);
      res.json(Situations);
    }
  });
});


module.exports = router;
