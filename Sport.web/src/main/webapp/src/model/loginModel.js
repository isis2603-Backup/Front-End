/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['model/_loginModel'], function() {
    App.Model.LoginModel = App.Model._LoginModel.extend({

 		validate: function(attrs,options){
            var validationMessage = "";
            if(!attrs.userName){
                validationMessage = "The userName can't be empty.";
            }
            if(validationMessage.length>0){
               return validationMessage;
            }
        }

    });

    App.Model.LoginList = App.Model._LoginList.extend({
        model: App.Model.LoginModel
    });

    return  App.Model.LoginModel;

});