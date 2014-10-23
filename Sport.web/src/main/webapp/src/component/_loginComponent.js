/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['component/_CRUDComponent','controller/toolbarController','model/toolbarModel','model/loginModel','controller/loginController'], function() {
    App.Component._LoginComponent = App.Component._CRUDComponent.extend({
        name: 'login',
        modelClass: App.Model.LoginModel,
        listModelClass: App.Model.LoginList,
        controller : App.Controller.LoginController,
        configUI: function(){
        	this.listComponent.addColumn('user','User');
        	this.listComponent.addColumn('password','Password');
        	this.listComponent.addColumn('email','Email');
       
        }
    });

    return App.Component._LoginComponent;
});