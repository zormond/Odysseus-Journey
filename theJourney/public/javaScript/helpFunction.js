    
 /*###################################################################*/ 
 /*These functions are used to created the random words displayed on each swal.*/

var randomWords; 
var wordList = "";
var getRandomWords = function(resolve){
    $.get('/randomWords',function(data){
        randomWords = data;
        
          for(var i = 0; i < randomWords.length; i++){ //Create list from getting random words.
            wordList +="<li>" + randomWords[i] + "</li>";
          }
        if(resolve != null)
        {
            resolve();
        }
        
    });
};

var getRandomWordsWithoutResolve =function(){
        $.get('/randomWords',function(data){
        newWords = data;
        
          for(var i = 0; i < newWords.length; i++){ //Create list from getting random words.
            wordList +="<li>" + newWords[i] + "</li>";
          }
        $('.words')[0].innerHTML = wordList;
        $('.words').slideDown();
        });
};

/*############################################################################
These live functions are used to animations throughout the project.*/

var people = [];
$('#newWordsButton').live('click',function(){
    $('.words').slideUp('fast',function(){
        
        wordList = [];
        randomWords = "";
        newList = getRandomWordsWithoutResolve();
    });
});

$('#searchBar').live('keyup',function(index)
{
    var value = $('#searchBar').val();
    var users = $('.user');
    
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

$('.user').live('mouseover', function(index){
        
        var toShow ="#" + index.currentTarget.firstElementChild.id;
        var mine ="#" + index.currentTarget.id;
        if($(toShow).css('display') == 'none')
        {
            $(mine).css("opacity", ".5");
        }
    });

$('.user').live('mouseout', function(index){
        var mine ="#" + index.currentTarget.id;
        $(mine).css("opacity", "1"); 
    });
/*#######################################################################
//Helper functions for creating madLibs.*/


var addToTotalResult = function(answers){
    var createMadLib = madLibs[stopCount].madLib;
    var madLibCreated = vsprintf(createMadLib,answers);
    totalResult += madLibCreated;
    return madLibCreated;
};

var createMadLibInput = function(currentMadLib){

        var totalInputs = "<div class='container-fluid'><div class='row'><div id='myInputs' class='col-xs-4 col-sm-4 col-md-4 col-lg-4'>";
        for(var i = 0; i < currentMadLib.answers.length; i++)
        {
            var id = 'swal-input' + String(i+1);  
            totalInputs += '<input id="' +id + '" class="swal2-input" placeHolder="' + currentMadLib.answers[i].answerText + '">';
        }
        totalInputs += "</div>" + //Create html for random words.
                        "<div class='col-xs-8 col-sm-8 col-md-8 col-lg-8'>" + 
                            "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>" + 
                                "<ul class='words'>"+wordList + "</ul>" +  
                            "<button id='newWordsButton' class='btn btn-default'>New Words</button></div>" +  
                        "</div>"+
                        "</div></div>";
        return totalInputs;       
};

/*/###########################################################
//Swal functions. These are the basic templates for the swal functions that are used throughout.*/

var finalswal = function(result)
{
    var totalMadLib ="<pre id='theStory'>" + totalResult + "</pre>";
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
};

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
        };
        $.ajax({
            type: "POST",
            url: '/totalMadLib',
            data: madLibAndUser,
            success: function(data){
                thankyouSwal(result);
            }
        });
    });
};

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
};

var getAllStories = function(){
    $.get('/totalMadLibs',function(data){
        var jsonData = data;
        
        var totalHtml = '<input id="searchBar" type="text" placeHolder="Search by name"><ul>';
        
        for(var i = 0; i < jsonData.length; i++)
        {
            people.push(jsonData[i].user.toUpperCase());
            var id = 'story' + String(i);
            var userId = 'user' + String(i);
            totalHtml += '<li class="user" id="'+userId + '">' + jsonData[i].user + 
                            '<ul class="story" id="'+ id +'"><li><pre>' + jsonData[i].totalMadLib + '</pre></li></ul>' + 
                            '</li>';
        }
        totalHtml += '</ul>';
        
        swal({
            title: 'Other Stories:',
            html: totalHtml,
            width: 'auto',
            confirmButtonColor: '#49483E',
            customClass: 'swal-wide',
            background: '#332106 url(../oldPaper.jpg)',
            allowOutsideClick: false,
            allowEscapeKey: false,
        }).then(function(){
            location.reload(false);
        });
    });
};

var onwardSwal = function(result){
    var display = JSON.stringify(result);
    return {
        title:'Onward!',
        html: '<pre class="unstyled">' + addToTotalResult(result) + '</pre>',
        width: 'auto',
        background: '#332106 url(../oldPaper.jpg)',
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonColor: '#49483E',        
    };
};

var resolveArray = [];
var getSwalStop = function(name){
    boatSounds.animate({volume: 0}, 500, function(){ //Fade out the boat sounds.
        boatSounds[0].pause();

    });
        return{
        title:name,
        confirmButtonColor: '#49483E',        
        html: createMadLibInput(madLibs[stopCount]),
        background: '#332106 url(../oldPaper.jpg)',
        preConfirm: function () {//Dynamically create inputs to resolve.
            return new Promise(function (resolve) {
            for(var i = 0; i < madLibs[stopCount].answers.length; i++)
            {
                var id = "#swal-input" + String(i+1);
                resolveArray.push($(id).val());
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
    };

};

/*###########################################################################*/
