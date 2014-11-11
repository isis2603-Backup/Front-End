/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['controller/_loginController','delegate/loginDelegate'], function() {
    App.Controller.LoginController = App.Controller._LoginController.extend({
		
		login: function() {
            var self = this;
            var model = $('#' + this.componentId + '-loginForm').serializeObject();
			var hash = model["password"];
			var hash1 = CryptoJS.SHA1(hash);
			//this.model.set("password", hash);
			console.log(hash1);
			alert(hash1);
			var token_JWT;
			
			App.Delegate.LoginDelegate.loginUser(model,function(data){
				self.token_JWT= data;
				sessionStorage.setItem('auth_token',self.token_JWT);
				var tok = sessionStorage.getItem('auth_token');
				console.log("datos partidos: "+tok.split("."));
				var user=tok.split(".")[1];
				console.log("user: "+user);
				var deco=window.atob(user);// Decodifica en base64
				deco=JSON.parse(deco);
				var user = deco["userName"];
				var tenant = deco["tenant"];
				console.log(deco);
				console.log("tenant" + tenant);
				alert('Bienvenido' + user);
				window.location.href = '../Sport_web/sport.html';
			});
			
			
        }

    });
    return App.Controller.LoginController;
}); 