(function() {
	'use strict';

	var entityName = "person";
	
	var person = {
		no: null,
		name: null,
		birth: null,
		password: null,
		password2: null,
		description: null,
		gender: null,
		email: null,
		tel: null
	}
	
	function Person() {
		this.no = null;
		this.name = null;
		this.birth = null;
		this.password = null;
		this.password2 = null;
		this.description = null;
		this.gender = null;
		this.email = null;
		this.tel = null;
	}
	
	var page = {
			size: 20,
			totalElements: 0,
			totalPages: 0,
			number: 0
	}
	
	angular.module('singApp.crud').controller('crudController', crudController);
	crudController.$inject = ['config', '$scope', '$resource', '$http', 'usSpinnerService', '$timeout' ];
	function crudController(config, $scope, $resource, $http, usSpinnerService, $timeout) {

		var baseRestUrl = config.settings.network.rest;
		var entityUrl = config.settings.network.rest+entityName;
		var template_base = "dev_base2/modules/crud/";		
		
		$scope.sortAttr = "id";
		$scope.sortOder = "desc";		
		$scope.page = page;		
		$scope.currentPerson = new Person();
		
		
		$scope.massagePopup = function(msg, type) {	
			console.log("--> massagePopup : " + msg);
			
			try {
				
				Messenger({
					extraClasses: 'messenger-fixed messenger-on-top',
	    		    theme: 'air'
				}).post({
					  message: msg,
					  type: type,
					  showCloseButton: false
				});
				
			}catch (e) {
				console.log("massagePopup error :" + e);
			}
		}
		
		$scope.disableScreen = function(enable) {	
			console.log("--> disableScreen : " + enable);
			
			try {
				
				if (enable) {
					config.globalDisable = true;
					usSpinnerService.spin('app-spinner');					
				} else {
					$timeout(function(){
						config.globalDisable = false;					
						usSpinnerService.stop('app-spinner');
					}, 500);
				}
				
			}catch (e) {
				console.log("disableScreen error :" + e);
			}			
		};
		
		$scope.prepareAction = function() {
			console.log("--> prepareAction");
			
			try {
				
				$scope.template = template_base + "crud-list.html";	
				$scope.listAction(0);	
				
			} catch (e) {
				console.log("prepareAction error : " + e);
			}
		}
				
		$scope.listAction = function(page) {
			console.log("--> listAction : " + page);
			
			var sort = $scope.sortAttr + "," + $scope.sortOder;
			var requestUrl = entityUrl + "?page="+page + "&size=" + $scope.page.size + "&sort="+sort;
			
			try {			
				usSpinnerService.spin('app-spinner');
				
				$http({	
					
					method : 'GET',
					url : requestUrl
						
				}).success(function(data) {
							
					$scope.people = data._embedded.person;
					$scope.page = data.page;
					$scope.disableScreen(false);
					
				}).error(function(error) {					
					$scope.disableScreen(false);
					console.log("$http error : " + error);
				});
				
			} catch (e) {
				console.log("listAction error : " + e);
			}
		}
						
		$scope.formSubmit = function(valid) {
			console.log("--> Submitting form valid : " + valid);
			
			try {
				
				if (!valid) {
					return;
				}				
				if ($scope.currentPerson.no != null) {
					$scope.updateAction($scope.currentPerson);
				}else {
					$scope.createAction($scope.currentPerson);
				}
				
			} catch (e) {
				console.log("formSubmit error : " + e);
			}
		}
		
		$scope.createAction = function(entity) {
			console.log("--> createAction : " + entity);
			console.log(entity);
			
			try {
				
				$scope.disableScreen(true);
				$http({
					method : 'POST',
					url : entityUrl,
					headers : {
						'Content-Type' : 'application/json; charset=UTF-8'
					},
					data : entity
				}).success(function(data) {				
					$scope.template = template_base + "crud-list.html";
					$scope.listAction(0);
					$scope.massagePopup("저장 되었습니다.", "success");
					$scope.disableScreen(false);
				}).error(function(error) {
					$scope.massagePopup("저장 실패.", "error");
					$scope.disableScreen(false);
					console.log("$http error : " + error);
				});
				
			} catch (e) {
				console.log("createAction error : " + e);
			}
		}
		
		$scope.updateAction = function(entity) {
			console.log("--> updateAction : " + entity);
			console.log(entity);
			
			try {
				
				$scope.disableScreen(true);
				$http({
					method : 'PUT',
					url : entityUrl + '/' + entity.no,
					headers : {
						'Content-Type' : 'application/json; charset=UTF-8'
					},
					data : entity
				}).success(function(data) {
					$scope.template = template_base + "crud-list.html";
					$scope.listAction($scope.page.number);	
					$scope.massagePopup("변경 되었습니다.", "success");
					$scope.disableScreen(false);
				}).error(function(error) {
					$scope.massagePopup("변경 실패.", "error");
					$scope.disableScreen(false);
					console.log("$http error : " + e);
				});
				
			} catch (e) {
				console.log("updateAction error : " + e);
			}
		}
		
		$scope.deleteAction = function(id) {			
			console.log("--> deleteAction : " + id);
			
			try {
				
				$scope.disableScreen(true);
				$http({
					method : 'DELETE',
					url : entityUrl + '/' + id
				}).success(function(data) {
					$scope.template = template_base + "crud-list.html";
					$scope.listAction($scope.page.number);
					$scope.massagePopup("삭제 되었습니다.", "success");
					$scope.disableScreen(false);
				}).error(function(error) {
					$scope.massagePopup("삭제 실패.", "error");
					$scope.disableScreen(false);
					console.log("$http error : " + e);
				});
				
			} catch (e) {
				console.log("deleteAction error : " + e);
			}
		}
		
		$scope.viewAction = function(entity) {
			console.log("--> viewAction");
			console.log(entity);
			
			try {
				
				entity.birth = new Date(entity.birth);
				$scope.currentPerson = entity;
				$scope.template = template_base + "crud-view.html";
				
			} catch (e) {
				console.log("viewAction error : " + e);
			}
		}
		
		$scope.editAction = function(entity) {
			console.log("--> editAction");
			console.log(entity);
			
			try {
				
				if (angular.isUndefined(entity)) {
					$scope.currentPerson = new Person();				
				} else {
					entity.birth = new Date(entity.birth);
					entity.tel = parseInt(entity.tel, 10);				
					$scope.currentPerson = entity;
				}
				$scope.template = template_base + "crud-edit.html";
				
			} catch (e) {
				console.log("editAction error : " + e);
			}
		}
		
		$scope.cancelAction = function() {
			console.log("--> cancelAction");
			
			try {	
				
				$scope.listAction($scope.page.number);
				$scope.template = template_base + "crud-list.html";
				
			} catch (e) {
				console.log("cancelAction error : " + e);
			}			
		}
		
		
		$scope.getSortClass = function(attr) {
			if ($scope.sortAttr != attr) {
				return "sorting";
			}
			if ($scope.sortOder == "desc") {
				return "sorting_desc";
			} else {
				return "sorting_asc";
			}
		}
		
		$scope.sortAction = function(attr) {
			console.log("--> sortAction : " + attr);
			
			try {	
				
				if ($scope.sortAttr != attr) {
					$scope.sortOder = "desc"
					$scope.sortAttr = attr;
				} else {
					if ($scope.sortOder == "desc") {
						$scope.sortOder = "asc"
					} else {
						$scope.sortOder = "desc"
					}
				}			
				$scope.listAction($scope.page.number);
				
			} catch (e) {
				console.log("sortAction error : " + e);
			}	
		}
		
		$scope.pageChangeHandler = function(num) {
			console.log("--> pageChangeHandler : " + num);
			try {	
				$scope.listAction(num - 1);
			} catch (e) {
				console.log("sortAction error : " + e);
			}
		}
		
	}
	
})();
