var mongoose = require('mongoose');
exports.madLibs = [{
    _id: 1,
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
    _id: 2,
    title: "Polyphemus",
    madLib: "   You escape the spellbinding effect of the Lotus Eaters. You land near <strong>%s</strong> Island, a\n"+
            "location near the Cyclopes. After going <strong>%s</strong> on the Cyclopes' island and you end up getting\n" +
            "captured by Polyphemus. Within 12 hours of meeting Polyphemus he eats <strong>%s</strong> of your men. The\n" +
            "need to escape is dire. After gathering some materials, you fashion a giant <strong>%s</strong> and stab it into\n " +
            "his eye. You then escape and tell Polyphemus your name is <strong>%s</strong>.\n\n",
    answers:[{
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
    _id: 3,
    title: "Laestrygones",
    madLib: "   After almost making it home, your men open a bag of <strong>%s</strong> which blows you back. You end up\n"+
            "in the land of the Laestrygonians. You disembark and send <strong>%s</strong> men to find the inhabitants. These\n"+
            "men go and implore a <strong>%s</strong> woman to tell them the whereabouts of the king. To their horror the\n" +
            "<strong>%s</strong> king takes one of them and makes dinner of him. As you try to escape a <strong>%s</strong> <strong>%s</strong>s\n"+ 
            "you. Luckily, you make it back to your ship and sail off.\n\n", 
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
    _id: 4,
    title: "Hades",
    madLib: "   Unfortunately only your ship escapes the Laestrygonian's onslaught of <strong>%s</strong> throwing. After saving\n"+
            "your men from being turned into <strong>%s</strong> for the rest of their lives due to the witch Circe, she tells you\n"+
            "that you must go to Hades to and speak to <strong>%s</strong> to find your way home. You rally your men and follow the\n"+
            "instructions that Circe gave you to reach the underworld. After performing the rituals, you end up talking with <strong>%s</strong>.\n"+
            "He tells you of a <strong>%s</strong> that <strong>%s</strong>s a lot.\n\n",
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
    _id: 5,
    title: "The Sirens",
    madLib: "   On your way back to Ithaca you must pass the <strong>%s</strong> sirens. You have the option to stuff everyone's\n"+
            "ears with wax including your own, or you can have your men tie you up while you <strong>%s</strong> to the siren's\n"+
            "song. You end up <strong>%s</strong> to the song and pass without problem.\n\n",
    answers:[{
      answerText: "Adjective"
    },{
      answerText: "Present tense verb"
    },{
      answerText: "Progressive verb(-ing)"
    }]
  },{
    _id: 6,
    title: "Calypso",
    madLib: "   After passing the Sirens, Scylla and Charybdis, your men <strong>%s</strong> and slaughter Helio's cattle. You\n"+
            "and your are then punished by <strong>%s</strong> with a great storm in which only you survive. You wash up on\n"+
            "Calypso's island. Calypso is quite into you. She asks you,\"Would you like a <strong>%s</strong>?\" You reply,\"No\n"+
            "thank you, I'm <strong>%s</strong>.\" After what seems like a billion offers, you finally accept to stay with her.\n"+
            "After <strong>%s</strong> years have passed, the great <strong>%s</strong> decide to convince Calypso to let you go.\n\n",
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
    _id: 7,
    title: "Ithica",
    madLib: "   You have finally returned to Ithica. You disguise yourself as a <strong>%s</strong> <strong>%s</strong> so that you can see\n"+
            "who has been loyal to you. After proving that you are Odysseus by shooting a <strong>%s</strong> through 12 <strong>%s</strong>,\n"+
            "you decide to <strong>%s</strong> all the suitors and take back you place as <strong>%s</strong> in Ithaca.\n\n",
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

exports.madLib = mongoose.model('madLib', madLibSchema);
