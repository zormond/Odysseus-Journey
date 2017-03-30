$(document).ready(function(){
    $("#music")[0].volume = .05;
    $.ajax({
        url:"/madLibs",
        dataType:"application/json",
        success:onDataRecieved
    })
});

function onDataRecieved(response) {
    var boatSounds = $("#boatSound");
    var madLibs = JSON.parse(response);
    console.log(madLibs);
    //Initialize variables.
    var sailTime = 300;     var myAnswers = [];     var myShip = $("#ship");    var endPointX = 0;           var endPointY = 0;
    var angle1 = 0;         var angle2 = 0;         var stopCount = 0;          var wH = $(window).height(); var wW = $(window).width();
    var odyssian = 0;       var different = 0;      var brutal = 0;             var totalResult = []; 
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

        //Used for moving the boat
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

    var onwardSwal = function(result){
        addToTotalResult(result);
        var display = JSON.stringify(result);
        return {
            title:'Onward!',
            html: 'Your answers were:  ' + display,
            background: '#332106 url(../oldPaper.jpg)',
        };
    }

    var resolveArray = [];
    var getSwalStop = function(name){
        boatSounds.animate({volume: 0}, 500, function(){ //Fade out the boat sounds.
            boatSounds[0].pause();
        });

        return{
            title:name,
            html: createMadLibInput(madLibs[stopCount]),
            background: '#332106 url(../oldPaper.jpg)',
            preConfirm: function () {//Dynamically create inputs to resolve.
                return new Promise(function (resolve) {
                for(var i = 0; i < madLibs[stopCount].answers.length; i++)
                {
                    var id = "#swal-input" + String(i+1);
                    console.log(id);
                    resolveArray.push($(id).val().toLowerCase());
                }
                resolve(resolveArray);
                resolveArray = [];
                })
            },
            onOpen: function () {
                $('#swal-input1').focus();
            },
            width: '75%',
            padding: 75,
            allowOutsideClick: false,
            allowEscapeKey: false,
        }
    }

    var addToTotalResult = function(answers){
        var createMadLib = madLibs[stopCount].madLib;
        var madLibCreated = vsprintf(createMadLib,answers);
        totalResult += madLibCreated;
        console.log(totalResult);
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


    var createMadLibInput = function(currentMadLib){
          var totalInputs = "";
          console.log(currentMadLib);
          console.log(currentMadLib.answers.length);
          for(var i = 0; i < currentMadLib.answers.length; i++)
          {
            var id = 'swal-input' + String(i+1);  
            totalInputs += '<input id="' +id + '" class="swal2-input" placeHolder="' + currentMadLib.answers[i].answerText + '">';
          }
          console.log(totalInputs);
          return totalInputs;       
    }


    var finalswal = function(result)
    {
        totalResult = calculateResult();
        swal({
            title: "You are...",
            html: "",
            background: '#332106 url(../oldPaper.jpg)',
        }).then(function(){
           
        });
    }


//Start
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
