var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/OdysseusDB');

var questions = [{

    _id: 0,
    title: "The Lotus Eaters",
    question: "How does Odysseus handle the men that eat the Lotus?",
    answers:[{
      answerText: "He kills them.",
      answerScore: "0"
    },{
      answerText: "He forces them onto the ship.",
      answerScore: "5"
    },{
      answerText: "He lets them live on the island with the Lotus Eaters.",
      answerScore: "0"
    }]
  },{
    _id: 1,
    title: "Polyphemus",
    question: "What does Odysseus tell Polyphemus his name is after escaping?",
    answers:[{
      answerText: "Noman",
      answerScore: "0"
    },{
      answerText: "Odysseus",
      answerScore: "5"
    },{
      answerText: "Achilles",
      answerScore: "0"
    }]
  },{
    _id: 2,
    title: "Laistrygones",
    question: "What happens to Odyseus' three men that meet the king?",
    answers:[{
      answerText: "The king eats one of the men, they other two run. ",
      answerScore: "5"
    },{
      answerText: "They are graciously accepted and treated well.",
      answerScore: "0"
    },{
      answerText: "They are rejected and told to leave.",
      answerScore: "0"
    }]
  },{
    _id: 3,
    title: "Hades",
    question: "Who does Odysseus go to speak to in the underworld?",
    answers:[{
      answerText: "Agamemnon",
      answerScore: "0"
    },{
      answerText: "Achilles",
      answerScore: "0"
    },{
      answerText: "Tiresias",
      answerScore: "5"
    }]
  },{
    _id: 4,
    title: "The Sirens",
    question: "How does Odysseus and his crew successfully pass the Sirens?",
    answers:[{
      answerText: "Odysseus stuffs everyone's ears with wax except his own.",
      answerScore: "5"
    },{
      answerText: "They lead an onslaught on the Sirens.",
      answerScore: "0"
    },{
      answerText: "They take the time to sail around.",
      answerScore: "0"
    }]
  },{
    _id: 5,
    title: "Calypso",
    question: "How does Odysseus get off Calypso's island?",
    answers:[{
      answerText: "He contructs his own ship behind Calypso's back.",
      answerScore: "0"
    },{
      answerText: "Wait until the God's convince Calypso to let you leave.",
      answerScore: "5"
    },{
      answerText: "He doesn't, he stays with Calypso for the rest of his life. ",
      answerScore: "0"
    }]
  },{
    _id: 6,
    title: "Ithica",
    question: "How does Eurycleia recognize Odysseus even though he is in disguise?",
    answers:[{
      answerText: "The scar on his foot.",
      answerScore: "5"
    },{
      answerText: "His voice.",
      answerScore: "0"
    },{
      answerText: "His ability to shoot an arrow through 12 axe heads with Odysseus' bow.",
      answerScore: "0"
    }]
  }];





var questionSchema = mongoose.Schema({
  _id: Number,
  question: String,
  answers: [{
    answerText: String,
    answerScore: String
  }],
});

var quizResultSchema = mongoose.Schema({
  user: String,
  score: Number,
});

var Question = mongoose.model('Question', questionSchema);
var quizResult = mongoose.model('quizResult', quizResultSchema);
var db = mongoose.connection;
db.on('error', console.error.bind(console,'connection error: '));
db.once('open', function(){
    console.log("MongoDB connected");
});

var removeQuestions = function(){
    Question.remove({},function(err){
    if(err) return console.errror(err);
    else{

    }
  });
};

var setQuestions = function(){
  for(var i = 0; i < questions.length; i++)
  {
    var newQuestion = new Question(questions[i]);
    newQuestion.save(function(err,post){
      if(err) return console.error(err);
      else{
        console.log("This was added to the database" + post);
      }
    })
  }
};

//removeQuestions();
//setQuestions();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('theJourney.html', { root : 'public' });
});

router.post('/quizResult', function(req,res,next){
  console.log("in the quizResultsPost route");
  var newQuizResult = new quizResult(req.body);
  newQuizResult.save(function(err,post){
    if(err) return console.error(err);
    else{
      res.json({status: 'success'});
    }
  });
});

router.get('/quizResults',function(req,res,next){
  quizResult.find({}).sort({'score': -1}).limit(10).exec(function(err,scoreList){
    if(err) return console.error(err);
    else{
      console.log(scoreList);
      res.json(scoreList);
    }
  });
});



router.get('/questions', function(req,res,next)
{
  Question.find({},function(err,questionList){
    console.log("This is the question list given back: " + questionList);
    res.json(questionList);
  });
});

module.exports = router;
