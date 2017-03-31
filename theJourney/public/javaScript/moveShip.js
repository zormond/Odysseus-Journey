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
    //Initialize variables.
    var sailTime = 300;     var myAnswers = [];     var myShip = $("#ship");    var endPointX = 0;           var endPointY = 0;
    var angle1 = 0;         var angle2 = 0;         var stopCount = 0;          var wH = $(window).height(); var wW = $(window).width();
    var odyssian = 0;       var different = 0;      var brutal = 0;             var totalResult = []; 
    var validate = function (result) {
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
        
        var display = JSON.stringify(result);
        return {
            title:'Onward!',
            html: '<pre>' + addToTotalResult(result) + '</pre',
            width: 'auto',
            background: '#332106 url(../oldPaper.jpg)',
            allowOutsideClick: false,
            allowEscapeKey: false,
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
        return madLibCreated;
    }

    var createMadLibInput = function(currentMadLib){
          var totalInputs = "";
          for(var i = 0; i < currentMadLib.answers.length; i++)
          {
            var id = 'swal-input' + String(i+1);  
            totalInputs += '<input id="' +id + '" class="swal2-input" placeHolder="' + currentMadLib.answers[i].answerText + '">';
          }
          return totalInputs;       
    }


    var finalswal = function(result)
    {
        var totalMadLib ="<pre id='theStory'>" + totalResult + "</pre>"
        swal({
            title: "The Odyssey according to you: ",
            html: totalMadLib,
            background: '#332106 url(../oldPaper.jpg)',
            width: "auto",
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then(function(){
           getUsername();
        });
    }

    var getUsername = function(){
        swal({
            title: "Record results",
            input: 'text',
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            inputPlaceHolder: 'Enter your name!',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then(function(result){
            var madLibAndUser ={
                user: result,
                totalMadLib: totalResult
            }
            $.ajax({
                type: "POST",
                url: '/totalMadLib',
                data: madLibAndUser,
                success: function(data){
                    thankyouSwal(result);
                }
            });
        });
    }
    var people = [];
    var thankyouSwal = function(result){
        swal({
            type: 'success', 
            title: "Thank you " + result,
            confirmButtonText: "Again?",
            showCancelButton: true,
            cancelButtonText: 'Other stories',
            cancelButtonClass: 'btn btn-primary',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then(function(){
            location.reload(false);
        },function(dismiss){
            if(dismiss='cancel'){
                getAllStories();
            }
        });
    }




    var getAllStories = function(){
        $.get('/totalMadLibs',function(data){
            var jsonData = data;
            console.log(jsonData);
            var totalHtml = '<input id="searchBar" type="text" placeHolder="Search by name"><ul>';
            console.log(jsonData.length);
            for(var i = 0; i < jsonData.length; i++)
            {
                people.push(jsonData[i].user.toUpperCase());
                var id = 'story' + String(i);
                totalHtml += '<li class="user">' + jsonData[i].user + 
                             '<ul class="story" id="'+ id +'"><li><pre>' + jsonData[i].totalMadLib + '</pre></li></ul>' + 
                             '</li>';
            }
            totalHtml += '</ul>';
            console.log(people);
            swal({
                title: 'Other Stories:',
                html: totalHtml,
                width: 'auto',
                customClass: 'swal-wide',
                background: '#332106 url(../oldPaper.jpg)',
                allowOutsideClick: false,
                allowEscapeKey: false,
            });
        });
    }

    $('#searchBar').live('keyup',function(index)
    {
        var value = $('#searchBar').val();
        var users = $('.user');
        console.log(value);
        /*if(value === "")
        {
            users.css('display', 'block');
        }*/
        for(var i = 0; i < people.length; i++)
        {
            if(!people[i].includes(value.toUpperCase(),0))
            {
                users[i].style.display='none';
            }
            else if(people[i].includes(value.toUpperCase(),0))
            {
                users[i].style.display='block';
            }
        }
    });

    $('.user').live('click',function(index){
        var toShow ="#" + index.currentTarget.firstElementChild.id;
        if($(toShow).css('display') == 'none')
        {
            $(toShow).css({display: 'block'}).hide().slideDown();
        }
        else{
            $(toShow).slideToggle();
        }
    });

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
