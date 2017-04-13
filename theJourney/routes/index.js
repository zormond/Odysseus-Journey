var express = require('express');
var router = express.Router();
var Filter = require("bad-words"), filter = new Filter();
var request = require('request');
var randomWords = require('random-words');

var madLib = require('../models/madLibsModel.js').madLib;
var madLibs = require('../models/madLibsModel.js').madLibs;
var totalMadLib = require('../models/totalMadLibsModel.js').totalMadLib;

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

  router.get('/', function(req,res){
    res.sendFile('login.html', {message: req.flash('message'),root: 'public'});
  })

  router.get('/theJourney', isAuthenticated, function(req, res){
    res.sendFile('/theJourney.html', {user: req.user, root: 'views'});
	});

  router.post('/login', passport.authenticate('login',{
    successRedirect: '/theJourney',
    failureRedirect: '/',
    failureFlash: true
  }));

  router.post('/signUp',passport.authenticate('signup',{
    successRedirect: '/theJourney',
    failureRedirect: '/',
  }));

  router.get('/signout', isAuthenticated, function(req, res) {
    console.log("in the sign out route");
    req.logout();
    res.send({msg:'redirect',redirectTo: '/'});
    console.log("redirected after signout");
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

 var initializeMadLibs = function(){
   //console.log(madLibs);
   for(var i = 0; i < madLibs.length; i++){
    var newMadLib = new madLib(madLibs[i]);
    newMadLib.save(function(err,totalMadLib){
      if(err) console.error(err);
      //else{console.log("this is the totalMadLib from saving: " + totalMadLib);}
    });
  }
}

var clearTotalMadLibs = function(){
  totalMadLib.remove({},function(err){
    if(err) {return console.error(err);}
    else{

    }
  });
}



clearMadLibs();
initializeMadLibs();




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
 return router;
}