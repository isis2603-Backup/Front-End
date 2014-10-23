/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['component/_loginComponent','controller/toolbarController','model/toolbarModel'], function() {
    App.Component.LoginComponent = App.Component._LoginComponent.extend({
        postInit: function(){
			var self = this;
			this.toolbarComponent.hideButton("create");
			this.toolbarComponent.hideButton("refresh");
			this.toolbarComponent.hideButton("search");
			this.toolbarComponent.hideButton("print");
			this.toolbarComponent.addButton({
				name: 'login',
                icon: 'glyphicon-user',
				displayName: 'Login',
                show: false,
                menu: 'utils'
			},function(){
				self.componentController.login();
				
			});

			this.toolbarComponent.addButton({
                name: 'showlogin',
                icon: 'glyphicon-user',
				displayName: 'Sign Up',
                show: true,
                menu: 'utils'
            },function(){
				
				self.toolbarComponent.showButton('cancel');
				self.toolbarComponent.showButton('login');
				self.toolbarComponent.hideButton("print");
				self.toolbarComponent.hideButton("showlogin");
				self.toolbarComponent.render();
				self.componentController.create();
			});
			
			
			
    }   		
        
    });
    return App.Component.LoginComponent;
});