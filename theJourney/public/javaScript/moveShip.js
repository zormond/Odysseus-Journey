$(document).ready(function(){
    var myShip = $("#ship");
    var endPointX = 0;
    var endPointY = 0;
    var angle1 = 0;
    var angle2 = 0;
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
        return {
            title:'Onward!',
            html: 'you selected ' + result,
        };
    }
    var text1 ="<span>This is the question</span><br><span>1. Answer</span><br><span>2. Answer</span><br><span>3. Answer</span>";
    var options1 = {
        option1: "Option 1",
        option2: "Option 2",
        option3: "Option 3"
    };
    var options2 =  {
        'option2-1': "Option 2-1",
        'option2-2': "Option 2-2",
        'option2-3': "Option 2-3"
    };

    var options3 = {
        'option3-1': "Option 3-1",
        'option3-2': "Option 3-2",
        'option3-3': "Option 3-3"
    };
    var options4 = {
        'option4-1': "Option 4-1",
        'option4-2': "Option 4-2",
        'option4-3': "Option 4-3"
    };;
    var options5 = {
        'option5-1': "Option 5-1",
        'option5-2': "Option 5-2",
        'option5-3': "Option 5-3"
    };;
    var options6 = {
        'option6-1': "Option 6-1",
        'option6-2': "Option 6-2",
        'option6-3': "Option 6-3"
    };; 
    var options7 = {
        'option7-1': "Option 7-1",
        'option7-2': "Option 7-2",
        'option7-3': "Option 7-3"
    };

    var getSwalStop = function(name,options){
        return{
            title:name,
            html: text1,
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

    
swal({
        title:"Welcome to Odysseus' Journey!",
        text: "These are the directions",
        background: '#332106 url(../oldPaper.jpg)',
        width: '75%',
        padding: 75,
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then(function(){
        $("#seaWaves")[0].play();
        endPointX = wW * .60;
        endPointY = wH * .65;
        angle2 = 40;
        myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2)),},1500, 'linear',function(e) {
            endPointX = wW * .25; endPointY =  wH * .65; angle1 = 0; angle2 = 0;
            myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500,'linear', function()
            {
                endPointX = wW * .10; endPointY =  wH * .40; angle1 = 0; angle2 = 0;
                myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear', function(){//first stop
                    $("#seaWaves")[0].pause();
                    swal(getSwalStop("The Lotus Eaters",options1)).then(function(result){
                        swal(onwardSwal(result)).then(function(){
                                endPointX = wW * .15; endPointY = wH * .60; angle1 = 10; angle2 = 17;
                                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear', function()//second stop
                                {
                                    $("#seaWaves")[0].pause();  
                                    swal(getSwalStop("The Cyclops",options2)).then(function(result){
                                        swal(onwardSwal(result)).then(function(){
                                        endPointX = wW * .11; endPointY = wH * .15; angle1 = 45; angle2 = 329;
                                        myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()//third stop
                                        {
                                            $("#seaWaves")[0].pause();
                                            swal(getSwalStop("The Lyc",options3)).then(function(result){
                                                swal(onwardSwal(result)).then(function(){
                                                    endPointX = wW * .16; endPointY = wH * .10; angle1 = 343; angle2 = 30;
                                                    myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()//fourth stop
                                                    {
                                                        $("#seaWaves")[0].pause();  
                                                        swal(getSwalStop("Hades",options4)).then(function(result){
                                                            swal(onwardSwal(result)).then(function(){
                                                                endPointX = wW * .25; endPointY = wH * .35; angle1 = 33; angle2 = 315;
                                                                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()//fifth stop
                                                                {
                                                                    $("#seaWaves")[0].pause();
                                                                    swal(getSwalStop("The Sirens",options5)).then(function(result){
                                                                        swal(onwardSwal(result)).then(function(){
                                                                            endPointX = wW * .37; endPointY = wH * .63; angle1 = 326.565; angle2 = 47.452;
                                                                            myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()//sixth stop
                                                                            {
                        
                                                                                endPointX = wW * .45; endPointY = wH * .34; angle1 =44; angle2 = 317;
                                                                                myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()//final stop
                                                                                {
                                                                                    $("#seaWaves")[0].pause();
                                                                                    swal(getSwalStop("Calypso",options6)).then(function(result){
                                                                                        swal(onwardSwal(result)).then(function()
                                                                                        {
                                                                                            endPointX = wW * .55; endPointY = wH * .50; angle1 =44; angle2 = 317; 
                                                                                            myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function(){
                                                                                                
                                                                                            });
                                                                                        });
                                                                                    });
                                                                                });
                                                                            });                                                                                                                      
                                                                        }); 
                                                                    });
                                                                });                                                        
                                                            });
                                                        })
                                                    });                                                   
                                                });
                                            });  
                                        });  
                                    });
                                });
                            });
                        });
                    });
                });

            });
        });
    });   
});
