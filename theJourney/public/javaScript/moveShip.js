$(document).ready(function(){
    var myShip = $("#ship");
    var counter = 0;
    var endPointX = 0;
    var endPointY = 0;
    var angle1 = 0;
    var angle2 = 0;
    var wH = $(window).height();
    var wW = $(window).width();

    var createParam = function(X, Y, a1,a2)
    {
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

    
    $("#theShip").click(function(){
            $("#seaWaves")[0].play();
            switch(counter){
                case 0:
                    endPointX = wW * .60;
                    endPointY = wH * .65;
                    angle2 = 40;
                    myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2)),},1500, 'linear',function(e) {
                        endPointX = wW * .13; endPointY =  wH * .75; angle1 = 0; angle2 = 0;
                        myShip.animate({path : new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500,'linear', function()
                        {
                            $("#seaWaves")[0].pause();
                        });
                    });
                    counter++; break;
                case 1: 
                    endPointX = wW * .25; endPointY = wH * .11; angle1 = 10; angle2 = 17;
                    myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear', function()
                    {
                            $("#seaWaves")[0].pause();  
                    });
                    counter++; break;
                case 2:
                    console.log("case2");
                    endPointX = wW * .20; endPointY = wH * .06; angle1 = 0; angle2 = 0;
                    myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()
                    {
                            $("#seaWaves")[0].pause();  
                    });
                    counter++; break;
                case 3:
                    endPointX = wW * .29; endPointY = wH * .14; angle1 = 0; angle2 = 0;
                    myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()
                    {
                            $("#seaWaves")[0].pause();  
                    });
                    counter++; break;
                case 4:
                    endPointX = wW * .33; endPointY = wH * .30; angle1 = 0; angle2 = 0;
                    myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()
                    {
                            $("#seaWaves")[0].pause();  
                    });
                    counter++; break;
                case 5:
                    endPointX = wW * .30; endPointY = wH * .59; angle1 = 318.565; angle2 = 62.452;
                    myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()
                    {
                            $("#seaWaves")[0].pause();  
                    });
                    counter++; break;
                default:
                    endPointX = wW * .63; endPointY = wH * .34; angle1 = 0; angle2 = 0;
                    myShip.animate({path: new $.path.bezier(createParam(endPointX,endPointY,angle1,angle2))}, 1500, 'linear',function()
                    {
                            $("#seaWaves")[0].pause();  
                    });
                    break;
            }
        });
});
