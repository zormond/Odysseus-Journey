$(document).ready(function(){

    swal({
        title:"Welcome to Odysseus' Journey!",
        html: "<h3 id='welcome'>Please login or sign up</h3>",
        background: '#332106 url(../oldPaper.jpg)',
        width: '75%',
        padding: 50,            
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: 'Sign Up',
        cancelButtonClass: 'btn btn-primary',
        allowOutsideClick: false,
        allowEscapeKey: false,
        showLoaderOnConfirm: true,
    }).then(function(){
        loginSwal();
    },function(dismiss){
        if(dismiss==='cancel'){
            signUpSwal();
        }
    });

    var loginSwal = function(){
        swal({
            title:"Login",
            html:
                '<form action="/login" method="post">' + 
                '<input id="swal-input1" class="swal2-input" name="username" placeHolder="User name">' +
                '<input id="swal-input2" class="swal2-input" name="password" placeHolder="Password" type="password">' +
                '<input class="btn btn-default btn-lg" type="submit" value="Login"/>' +
                '</form>',
            background: '#332106 url(../oldPaper.jpg)',
            width: '75%',
            padding: 50,
            confirmButtonText: "Go to sign up",            
            cancelButtonText: 'Sign Up',
            cancelButtonClass: 'btn btn-primary',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showLoaderOnConfirm: true,
        }).then(function(){
            signUpSwal();
        });
    };

    var signUpSwal = function(){
        swal({
            title:"Sign Up",
            html:
                '<form action="/signUp" method="post">' + 
                '<input id="swal-input1" class="swal2-input" name="username" placeHolder="User name">' +
                '<input id="swal-input2" class="swal2-input" name="password" placeHolder="Password" type="password">' +
                '<input class="btn btn-default btn-lg" type="submit" value="Sign Up"/>' +
                '</form>',
            background: '#332106 url(../oldPaper.jpg)',
            width: '75%',
            padding: 50,            
            confirmButtonText: 'Go to Login',
            cancelButtonText: 'Go to Login',
            cancelButtonClass: 'btn btn-primary',
            allowOutsideClick: false,
            allowEscapeKey: false,
            showLoaderOnConfirm: true,
        }).then(function(){
            loginSwal();

        });
    };
});

