/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['delegate/_loginDelegate'], function() {
    
	
	
	
	
	
	

	
	App.Delegate.LoginDelegate = ({
			


        loginUser: function(login, callback, callbackError) {
//            alert('ALERT DELEGATE');
//			alert('JSON Enviado: '+JSON.stringify(login));
            $.ajax({
                type: "POST",
                url: "http://localhost:8089/webresources/Auth/login_test",
                crossDomain: true,
                dataType: 'json',
				data : JSON.stringify(login),
                contentType: "application/json"
				}).done(_.bind(function(data) {
                console.log(data);
				alert('USUARIO AUTENTICADO');
                callback(data);
               
           }, this)).error(_.bind(function(data) {
               console.log("data");
			   alert('USUARIO NO AUTENTICADO');
			   window.location.href = '../Sport_web/error.html';
               callbackError(data);
           }, this));
       }
		
});


});



