/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


define(['model/loginModel'], function(loginModel) {
    App.Controller._LoginController = Backbone.View.extend({
        initialize: function(options) {
            

            this.modelClass = options.modelClass;
            this.listModelClass = options.listModelClass;
            this.showEdit = true;
            this.showDelete = true;
            this.editTemplate = _.template($('#login').html());
            if (!options || !options.componentId) {
                this.componentId = _.random(0, 100) + "";
            }else{
				this.componentId = options.componentId;
			}
			this.currentList = new this.listModelClass();
			if(options && options.pageSize){
				this.pageSize = options.pageSize;
				this.currentList.setPageSize(options.pageSize);
			}
			
            var self = this;
            if(self.postInit){
            	self.postInit(options);
            }
        },
        create: function() {
            if (App.Utils.eventExists(this.componentId + '-' +'instead-login-create')) {
                Backbone.trigger(this.componentId + '-' + 'instead-login-create', {view: this});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-login-create', {view: this});
                this.currentModel = new this.modelClass({componentId: this.componentId});
                this._renderEdit();
                Backbone.trigger(this.componentId + '-' + 'post-login-create', {view: this});
            }
        },
        list: function(params,callback,context) {
            if (params) {
                var data = params.data;
            }
            if (App.Utils.eventExists(this.componentId + '-' +'instead-login-list')) {
                Backbone.trigger(this.componentId + '-' + 'instead-login-list', {view: this, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-login-list', {view: this, data: data});
                var self = this;
				if(!this.currentList){
	                this.currentList = new this.listModelClass();
	                if (this.pageSize) {
						this.currentList.setPageSize(this.pageSize);
					}
				}
//                this.currentList.fetch({
//                    data: data,
//                    success: function(resp) {
//                        callback.call(context,{data: self.currentList, page: resp.state.currentPage, pages: resp.state.totalPages, totalRecords: resp.state.totalRecords});
//                        Backbone.trigger(self.componentId + '-' + 'post-login-list', {view: self});
//                    },
//                    error: function(mode, error) {
//                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'login-list', view: self, error: error});
//                    }
//                });
            }
        },
        edit: function(params) {
            var id = params.id;
            var data = params.data;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-login-edit')) {
                Backbone.trigger(this.componentId + '-' + 'instead-login-edit', {view: this, id: id, data: data});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-login-edit', {view: this, id: id, data: data});
                if (this.currentList) {
                    this.currentModel = this.currentList.get(id);
                    this.currentModel.set('componentId',this.componentId); 
                    this._renderEdit();
                    Backbone.trigger(this.componentId + '-' + 'post-login-edit', {view: this, id: id, data: data});
                } else {
                    var self = this;
                    this.currentModel = new this.modelClass({id: id});
                    this.currentModel.fetch({
                        data: data,
                        success: function() {
                            self.currentModel.set('componentId',self.componentId); 
                            self._renderEdit();
                            Backbone.trigger(self.componentId + '-' + 'post-login-edit', {view: this, id: id, data: data});
                        },
                        error: function() {
                            Backbone.trigger(self.componentId + '-' + 'error', {event: 'login-edit', view: self, id: id, data: data, error: error});
                        }
                    });
                }
            }
        },
        destroy: function(params) {
            var id = params.id;
            var self = this;
            if (App.Utils.eventExists(this.componentId + '-' +'instead-login-delete')) {
                Backbone.trigger(this.componentId + '-' + 'instead-login-delete', {view: this, id: id});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-login-delete', {view: this, id: id});
                var deleteModel = new this.modelClass({id: id});
                if(deleteModel.setCacheList){
                    deleteModel.setCacheList(this.currentList);
                }
                deleteModel.destroy({
                    success: function() {
                        Backbone.trigger(self.componentId + '-' + 'post-login-delete', {view: self, model: deleteModel});
                    },
                    error: function() {
                        Backbone.trigger(self.componentId + '-' + 'error', {event: 'login-delete', view: self, error: error});
                    }
                });
            }
        },
        save: function() {
            var self = this;
            var model = $('#' + this.componentId + '-loginForm').serializeObject();
            if (App.Utils.eventExists(this.componentId + '-' +'instead-login-save')) {
                Backbone.trigger(this.componentId + '-' + 'instead-login-save', {view: this, model : model});
            } else {
                Backbone.trigger(this.componentId + '-' + 'pre-login-save', {view: this, model : model});
                this.currentModel.set(model);
                this.currentModel.save({},
                        {
                            success: function(model) {
                                Backbone.trigger(self.componentId + '-' + 'post-login-save', {model: self.currentModel});
                            },
                            error: function(model,response,options) {
                                Backbone.trigger(self.componentId + '-' + 'error', {event: 'login-save', view: self, error: response});
                            }
                        });
            }
        },
        _renderList: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.listTemplate({logins: self.currentList.models, componentId: self.componentId, showEdit : self.showEdit , showDelete : self.showDelete}));
                self.$el.slideDown("fast");
            });
        },
        _renderEdit: function() {
            var self = this;
            this.$el.slideUp("fast", function() {
                self.$el.html(self.editTemplate({login: self.currentModel, componentId: self.componentId , showEdit : self.showEdit , showDelete : self.showDelete
 
				}));
                self.$el.slideDown("fast");
            });
        },
		setPage: function(page){
		    this.currentList.state.currentPage = page;
		},
        setPageSize: function(pageSize){
            this.pageSize = pageSize;
            this.currentList.setPageSize(pageSize);
        },
        getRecords: function(){
			return this.currentList.toJSON();
		},
		setRecords: function(records){
			this.currentList.reset(records);
		},
		getDeletedRecords: function(){
			var deletedArray = [];
			if (this.currentList.deletedModels) {
				for (var idx in this.currentList.deletedModels) {
					deletedArray.push(this.currentList.deletedModels[idx].toJSON());
				}
			}
			return deletedArray;
		},
		getCreatedRecords: function(){
			var createdArray = [];
			for (var idx in this.currentList.models) {
				var model = this.currentList.models[idx];
				if (model.isCreated && model.isCreated()) {
					var jsonModel = model.toJSON();
					delete jsonModel.id;
					createdArray.push(jsonModel);
				}
			}
			return createdArray;
		},
		getUpdatedRecords: function(){
			var updatedArray = [];
			for (var idx in this.currentList.models) {
				var model = this.currentList.models[idx];
				if (model.isUpdated && model.isUpdated()) {
					updatedArray.push(model.toJSON());
				}
			}
			return updatedArray;
		},
		addRecords: function(objArray){
			if (Array.isArray(objArray)) {
				for (var idx in objArray) {
					var newModel = this.currentList.push(objArray[idx]);
					if (newModel.setCacheList) {
						newModel.setCacheList(this.currentList);
						newModel.save({}, {});
					}
				}
			}else{
				if (typeof(objArray)==="object") {
					var newModel = this.currentList.push(objArray);
					if (newModel.setCacheList) {
						newModel.setCacheList(this.currentList);
						newModel.save({}, {});
					}
				}
			}
			
		},
		updateRecord: function(record){
			this.currentList.add(record,{merge: true});
		},
		clearCache: function(){
			this.currentList.reset();
		}
    });
    return App.Controller._LoginController;
});