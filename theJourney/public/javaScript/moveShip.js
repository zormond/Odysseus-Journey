$(document).ready(function(){
    $("#music")[0].volume = .05;
    $.ajax({
        url:"/situations",
        dataType:"application/json",
        success:onDataRecieved
    })
});

function onDataRecieved(response) {
    var boatSounds = $("#boatSound");
    var questions = JSON.parse(response);
    console.log(questions);
    var options = {
        option1: "Option 1",
        option2: "Option 2",
        option3: "Option 3"
    };
    var sailTime = 300;
    var myAnswers = [];
    var myShip = $("#ship");
    var endPointX = 0;
    var endPointY = 0;
    var angle1 = 0;
    var angle2 = 0;
    var stopCount = 0;
    var wH = $(window).height();
    var wW = $(window).width();
    var validate =
        function (result) {
            return new Promise(function (resolve, reject) {
                if (result) {
                    resolve()
                } else {
                    reject('You need to select something!')
                }
            })
        };

    var onwardSwal = function(result){
        var display;
        if (result === "option1"){
          display = questions[stopCount].answers[0].answerText;
          myAnswers.push(questions[stopCount].answers[0].answerScore);
        } 
        else if(result === "option2")
        {
          display = questions[stopCount].answers[1].answerText;
          myAnswers.push(questions[stopCount].answers[1].answerScore);;
        }
        else{
          display = questions[stopCount].answers[2].answerText;
          myAnswers.push(questions[stopCount].answers[2].answerScore);
        }
        console.log(myAnswers);
        return {
            title:'Onward!',
            html: 'You selected: ' + display,
            background: '#332106 url(../oldPaper.jpg)',
        };
    }
    var odyssian = 0; var different = 0; var brutal = 0;
    var calculateResult = function(){

        for(var i = 0; i < myAnswers.length; i++)
        {
            var answer = myAnswers[i]; 
            if(answer === "Odyssian") {odyssian++;}
            else if(answer ==="Brutal") {brutal++;}
            else {different++;}
        }
        var max = Math.max(odyssian,Math.max(brutal,different));
        if(max === odyssian)
        {
            return "An Odyssian type of leader! Take it or leave it."
        }
        else if(different === max)
        {
            return "A one of a kind leader! No one is like you."
        }
        else{
            return "An awfully brutal leader! I hope that you don't lead me."
        }
    }


    var getSwalStop = function(name){
        boatSounds.animate({volume: 0}, 500, function(){
            boatSounds[0].pause();
        });

        return{
            title:name,
            html: createQuestion(questions[stopCount]),
            input:"radio",
            inputOptions:options,
            background: '#332106 url(../oldPaper.jpg)',
            width: '75%',
            padding: 75,
            inputValidator: validate,
            allowOutsideClick: false,
            allowEscapeKey: false
        }
    }

    var createParam = function(X, Y, a1,a2){
        boatSounds[0].play();
        boatSounds.animate({volume: .5}, 500,function(){

        });

        bezier_params = {
            start: {
                x: $("#ship").position().left,
                y: $("#ship").position().top,
                angle: a1
            },
            end: {
                x: X,
                y: Y,
                angle: a2,
                length: 1
                }
        }
        return bezier_params;
    }

    var displayResultsSwal =function(results){
        var myResults = JSON.parse(results);
        console.log(myResults);
        var totalHTML = "<ul id='resultList'>";
        for(var i = 0; i < myResults.length; i++){
            totalHTML += "<li id='listItem'>" + myResults[i].user + ":" +
                            "<ul>" +
                                "<li id='fullResult'>Full result: " +myResults[i].result + "</li>" + 
                                "<li>Odyssian: " + myResults[i].odyssian + "</li>" +
                                "<li>Brutal: " + myResults[i].brutal + "</li>" + 
                                "<li>Different: " + myResults[i].different + "</li>" +
                            "</ul>" + 
                         "</li>";
        }
        totalHTML += "</ul>";
        swal({
            title: "Here are everyone's results: ",
            html: totalHTML,
            background: '#332106 url(../oldPaper.jpg)',
            confirmButtonText: "Play again?"
        }).then(function(){
            location.reload(false)
        });
    }


    var createQuestion = function(curQ){
        return "<span>"+ curQ.situation +"</span><br><br><span>Option 1: " +curQ.answers[0].answerText +
               "</span><br><br><span>Option 2: " +curQ.answers[1].answerText + "</span><br><br><span>Option 3: "+curQ.answers[2].answerText+"</span>"
    }

    var totalResult; 
    var finalswal = function(result)
    {
        totalResult = calculateResult();
        swal({
            title: "You are...",
            html: "<span>" + totalResult + "</span>",
            background: '#332106 url(../oldPaper.jpg)',
        }).then(function(){
            recordResult()
        });
    }

    var recordResult = function(){
        swal({
            title: "Record results",
            input: 'text',
            confirmButtonText: 'Submit',
            inputPlaceHolder: 'Enter your name!',
            background: 'url(../oldPaper.jpg)',
        }).then(function(result){
            postNameAndResult(result);
        });
    }

    var postNameAndResult = function(result){
        var resultObject = {
            user: result,
            odyssian: odyssian,
            different: different,
            brutal: brutal,
            result: totalResult
        }
        $.ajax({
            type: 'POST',
            url: '/result',
            data: resultObject,
            success: function(data){
                console.log(data);
                swal({
                    type: 'success',
                    title: "Thank you " + result + "!" 
                }).then(function(){
                    getAllResults()
                });
            }
        }); 
    }

    var getAllResults = function(){
        $.ajax({
            type: "GET",
            dataType: 'application/json',
            url: '/results',
            success: function(data){
                displayResultsSwal(data);
            }
        });

    }


swal({
        title:"Welcome to Odysseus' Journey!",
        text: "The point of this is for you to take Odysseus position to see what kind of leader you are compared to Odysseus.",
        background: '#332106 url(../oldPaper.jpg)',
        width: '75%',
        padding: 75,
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(function(){
        endPointX = wW * .60;
        endPointY = wH * .65;
        angle2 = 40;
        myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2)),},sailTime, 'linear',startVoyage);
    });

    var startVoyage = function()  {
        endPointX = wW * .25; endPointY =  wH * .65; angle1 = 0; angle2 = 0;
        myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime,'linear', function()
        {
            endPointX = wW * .06; endPointY =  wH * .40; angle1 = 0; angle2 = 0;
            myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear', firstStop);

        });
    }

    var firstStop = function() {
        swal(getSwalStop("The Lotus Eaters")).then(function(result){
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .13; endPointY = wH * .62; angle1 = 10; angle2 = 17;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear', secondStop);
            });
        });
    }

    var secondStop = function() {
        swal(getSwalStop("The Cyclops")).then(function(result){
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .09; endPointY = wH * .15; angle1 = 45; angle2 = 329;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',thirdStop);
            });
        });
    }

    var thirdStop = function() {
        swal(getSwalStop("The Laistrygonians")).then(function(result){
           
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .16; endPointY = wH * .10; angle1 = 343; angle2 = 30;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',fourthStop);
            });
        });
    }

    var fourthStop = function() {
        swal(getSwalStop("Hades")).then(function(result){
        
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .25; endPointY = wH * .35; angle1 = 33; angle2 = 315;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',fifthStop);
            });
        })
    }

    var fifthStop = function() {
        swal(getSwalStop("The Sirens")).then(function(result){
      
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .37; endPointY = wH * .63; angle1 = 326.565; angle2 = 47.452;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',sixthStop);
            });
        });
    }

    var sixthStop = function() {
        endPointX = wW * .45; endPointY = wH * .34; angle1 =44; angle2 = 317;
        myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',finalStop);
    }

    var finalStop = function() {
        swal(getSwalStop("Calypso")).then(function(result){
            swal(onwardSwal(result)).then(function()
            {
                stopCount++;
                endPointX = wW * .55; endPointY = wH * .50; angle1 =44; angle2 = 317;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',function(){
                    swal(getSwalStop("Ithaca")).then(function(result)
                    {
                        swal(onwardSwal(result)).then(function()
                        {
                            finalswal();
                        });
                    });
                });
            });
        });
    }
}
