/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define([], function() {
    App.Model._LoginModel = Backbone.Model.extend({
        defaults: {
 
		 'userName' : '' ,  
		 'password' : '' ,  
		 'email' : ''        },
        initialize: function() {
          var self = this;
          this.on('invalid',function(error){
                 Backbone.trigger(self.get('componentId') + '-' + 'error',{event: 'validation', message: error.validationError});
          });
        },
        getDisplay: function(user) {
         return this.get(user);
        }
    });

    App.Model._LoginList = Backbone.PageableCollection.extend({
        model: App.Model._LoginModel,
        initialize: function() {
        },
		queryParams: {
		    currentPage: "page",
		    pageSize: "maxRecords"
		},
        parseState: function (resp, queryParams, state, options) {
          return {totalRecords: resp.totalRecords};
        },
        parseRecords: function (resp, options) {
          return resp.records;
        }
    });
    return App.Model._LoginModel;
});