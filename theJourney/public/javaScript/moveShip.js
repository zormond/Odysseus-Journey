$(document).ready(function(){
    $.ajax({
        url:"/madLibs",
        dataType:"application/json",
        success:onDataRecieved
    });
    $("#music")[0].volume = .05;
});

var madLibs;
var stopCount = 0; 
var totalResult = []; 
var boatSounds;
function onDataRecieved(response) {

    madLibs = JSON.parse(response);
    /*Initialize variables.*/
    var sailTime = 300;     var myAnswers = [];     var myShip = $("#ship");    var endPointX = 0;           var endPointY = 0;
    var angle1 = 0;         var angle2 = 0;         var wH = $(window).height(); var wW = $(window).width();
    var odyssian = 0;       var different = 0;      var brutal = 0;             boatSounds = $("#boatSound");     
    var validate = function (result) {
            return new Promise(function (resolve, reject) {
                if (result) {
                    resolve()
                } else {
                    reject('You need to select something!')
                }
            })
        };

        /*Used for moving the boat*/
    var createParam = function(X, Y, a1,a2){
        boatSounds[0].play();
        boatSounds.animate({volume: .5}, 500);
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
        };
        return bezier_params;
    }

/*Start of the animations.*/
    swal({
        title:"Welcome to Odysseus' Journey!",
        html: "<h3 id='welcome'>Recreate the Odyssey</h3>",
        background: '#332106 url(../oldPaper.jpg)',
        width: '75%',
        padding: 50,            
        showCancelButton: true,
        cancelButtonText: 'Show stories',
        cancelButtonClass: 'btn btn-primary',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showLoaderOnConfirm: true,
        preConfirm: function(){
            return new Promise(function(resolve){
                getRandomWords(resolve);
            });
        }
    }).then(function(){
        endPointX = wW * .60;
        endPointY = wH * .65;
        angle2 = 40;
        myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2)),},sailTime, 'linear',startVoyage);
    },function(dismiss){
            if(dismiss='cancel'){
                getAllStories();
            }
    });

    var startVoyage = function()  {
        endPointX = wW * .25; endPointY =  wH * .65; angle1 = 0; angle2 = 0;
        myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime,'linear', function()
        {
            endPointX = wW * .06; endPointY =  wH * .40; angle1 = 0; angle2 = 0;
            myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear', firstStop);

        });
    };

    var firstStop = function() {
        swal(getSwalStop("The Lotus Eaters")).then(function(result){
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .13; endPointY = wH * .62; angle1 = 10; angle2 = 17;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear', secondStop);
            });
        });
    };

    var secondStop = function() {
        swal(getSwalStop("The Cyclops")).then(function(result){
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .09; endPointY = wH * .15; angle1 = 45; angle2 = 329;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',thirdStop);
            });
        });
    };

    var thirdStop = function() {
        swal(getSwalStop("The Laestrygonians")).then(function(result){
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .16; endPointY = wH * .10; angle1 = 343; angle2 = 30;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',fourthStop);
            });
        });
    };

    var fourthStop = function() {
        swal(getSwalStop("Hades")).then(function(result){
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .25; endPointY = wH * .35; angle1 = 33; angle2 = 315;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',fifthStop);
            });
        });
    };

    var fifthStop = function() {
        swal(getSwalStop("The Sirens")).then(function(result){
            swal(onwardSwal(result)).then(function(){
                stopCount++;
                endPointX = wW * .37; endPointY = wH * .63; angle1 = 326.565; angle2 = 47.452;
                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',sixthStop);
            });
        });
    };

    var sixthStop = function() {
        endPointX = wW * .45; endPointY = wH * .34; angle1 =44; angle2 = 317;
        myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, sailTime, 'linear',finalStop);
    };

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
    };
}
