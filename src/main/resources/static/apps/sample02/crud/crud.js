(function() {
	'use strict';

	var entityName = "person";
	
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
	
	function PersonPage(size, totalElements, totalPages, number, currentPage, newPage) {
		this.size = size;
		this.totalElements = totalElements;
		this.totalPages = totalPages;
		this.number = number;
		this.currentPage = currentPage;
		this.newPage = newPage;
	}
	
	function PersonSearch(sortAttr, sortOder, searchText, searchTarget) {
		this.sortAttr = sortAttr;
		this.sortOder = sortOder;
		this.searchText = searchText;
		this.searchTarget = searchTarget;
	}
	
	
	crudController.$inject = ['$scope', '$rootScope', '$resource', '$http', 'usSpinnerService', '$timeout', '$translate' ];
	function crudController($scope, $rootScope, $resource, $http, usSpinnerService, $timeout, $translate) {

		var template_base = "crud/";
		$scope.msg = {};
		$scope.baseUIUrl = "http://localhost:8080/";
    	$scope.baseRestUrl = "http://localhost:8080/";			
    	$scope.entityUrl = $scope.baseRestUrl+entityName;
		
		$scope.initilize = function() {			
			console.log("--> initilize");			
			
        	//$scope.msg.create_success = translations.APP.CREATE_SUCCESS;
        	//$scope.msg.create_fail = translations.APP.CREATE_FAIL;
			//$scope.msg.update_success = translations.APP.UPDATE_SUCCESS;
			//$scope.msg.update_fail = translations.APP.UPDATE_FAIL;
			//$scope.msg.delete_success = translations.APP.DELETE_SUCCESS;
			//$scope.msg.delete_fail = translations.APP.DELETE_FAIL;							
						
			try {
				
				$scope.currentPerson = new Person();
				$scope.personPage = new PersonPage(20, 0, 0, 0, 1, 0);
				$scope.personSearch = new PersonSearch("id", "desc", null, null);
				$scope.template = template_base + "crud-list.html";	
				$scope.read($scope.personPage, $scope.personSearch);							
				
			} catch (e) {
				console.log("initilize error : " + e);
			}		
			
		}
				
		$scope.read = function(personPage, personSearch, attr, newPageNumber) {
			console.log("--> read ");
			
			if (attr != null || attr != undefined) {
				if ($scope.personSearch.sortAttr != attr) {
					$scope.personSearch.sortOder = "desc"
					$scope.personSearch.sortAttr = attr;
				} else {
					if ($scope.personSearch.sortOder == "desc") {
						$scope.personSearch.sortOder = "asc"
					} else {
						$scope.personSearch.sortOder = "desc"
					}
				}			
				$scope.read(personPage, $scope.personSearch);  
			}
			
			if (newPageNumber != null  || newPageNumber != undefined) {				
				$scope.personPage.newPage = newPageNumber - 1;
			}			
			
			try {							
				usSpinnerService.spin('app-spinner');				
				var sort = personSearch.sortAttr + "," + personSearch.sortOder;
				var requestUrl = $scope.entityUrl + "?page="+personPage.newPage + "&size=" + personPage.size + "&sort="+sort;				
				$http({						
					method : 'GET',
					url : requestUrl						
				}).success(function(data) {							
					$scope.success(data, "LIST");					
				}).error(function(error) {					
					$scope.error(error, "LIST");
				});				
			} catch (e) {
				console.log("read error : " + e);
			}
		}
		
		$scope.readOne = function(obj) {
			console.log("--> readOne");			
			try {				
				obj.birth = new Date(obj.birth);
				$scope.currentPerson = obj;
				$scope.template = template_base + "crud-view.html";				
			} catch (e) {
				console.log("readOne error : " + e);
			}
		}
		
		$scope.createForm = function() {
			console.log("--> createForm");			
			try {
				$scope.currentPerson = new Person();
				$scope.template = template_base + "crud-edit.html";				
			} catch (e) {
				console.log("createForm error : " + e);
			}
		}
		
		$scope.create = function(obj, valid) {
			console.log("--> create : " + obj);		
			console.log("--> Submitting form valid : " + valid);	
			if (!valid) {
				return;
			}	
			try {				
				//$scope.disableScreen(true);
				$rootScope.$broadcast("app.disableScreen", true);
				$http({
					method : 'POST',
					url : $scope.entityUrl,
					headers : {
						'Content-Type' : 'application/json; charset=UTF-8'
					},
					data : obj
				}).success(function(data) {			
					$scope.success(data, "CREATE");	
				}).error(function(error) {
					$scope.error(error, "CREATE");
				});				
			} catch (e) {
				console.log("create error : " + e);
			}
		}
		
		$scope.updateForm = function(obj) {
			console.log("--> updateForm");		
			
			try {				
				obj.birth = new Date(obj.birth);
				obj.tel = parseInt(obj.tel, 10);				
				$scope.currentPerson = obj;
				$scope.template = template_base + "crud-edit.html";				
			} catch (e) {
				console.log("updateForm error : " + e);
			}			
		}
		
		$scope.update = function(obj, valid) {
			console.log("--> update : " + obj);
			console.log("--> Submitting form valid : " + valid);	
			if (!valid) {
				return;
			}	
			try {
				//$scope.disableScreen(true);
				$rootScope.$broadcast("app.disableScreen", true);
				$http({
					method : 'PUT',
					url : $scope.entityUrl + '/' + obj.no,
					headers : {
						'Content-Type' : 'application/json; charset=UTF-8'
					},
					data : obj
				}).success(function(data) {
					$scope.success(data, "UPDATE");
				}).error(function(error) {
					$scope.error(error, "UPDATE");
				});				
			} catch (e) {
				console.log("update error : " + e);
			}		
		}
		
		$scope.remove = function(obj) {
			console.log("--> remove");
			try {
				//$scope.disableScreen(true);
				$rootScope.$broadcast("app.disableScreen", true);
				$http({
					method : 'DELETE',
					url : $scope.entityUrl + '/' + obj.no
				}).success(function(data) {
					$scope.success(data, "REMOVE");					
				}).error(function(error) {
					$scope.error(error, "REMOVE");					
				});				
			} catch (e) {
				console.log("deleteAction error : " + e);
			}
		}
		
		$scope.cancel = function() {
			console.log("--> cancel");
			try {
				$scope.template = template_base + "crud-list.html";
				$scope.read($scope.personPage, $scope.personSearch);				
			} catch (e) {
				console.log("cancel error : " + e);
			}
		}		
		
		$scope.success = function(data, type) {
			//$scope.disableScreen(false);
			$rootScope.$broadcast("app.blockingPopup", false);
			if (type == "LIST") {
				$scope.people = data._embedded.person;
				$scope.personPage = new PersonPage(data.page.size, data.page.totalElements, data.page.totalPages, data.page.number, data.page.number+1, data.page.number);		
			} else if (type == "CREATE") {
				$scope.template = template_base + "crud-list.html";
				$scope.read($scope.personPage, $scope.personSearch);
				$rootScope.$broadcast("app.massagePopup", {"msg" : $scope.msg.create_success, "type" : "success"});
				//$scope.massagePopup($scope.msg.create_success, "success");				
			} else if (type == "UPDATE") {
				$scope.template = template_base + "crud-list.html";
				$scope.read($scope.personPage, $scope.personSearch);
				$rootScope.$broadcast("app.massagePopup", {"msg" : $scope.msg.update_success, "type" : "success"});
				//$scope.massagePopup($scope.msg.update_success, "success");
			} else if (type == "REMOVE") {
				$scope.template = template_base + "crud-list.html";
				$scope.read($scope.personPage, $scope.personSearch);
				$rootScope.$broadcast("app.massagePopup", {"msg" : $scope.msg.delete_success, "type" : "success"});
				//$scope.massagePopup($scope.msg.delete_success, "success");				
			}			
		}
		
		
		$scope.error = function(error, type) {
			//$scope.disableScreen(false);
			$rootScope.$broadcast("app.blockingPopup", false);
			if (type == "LIST") {				
				console.log("$http error : " + error);
			} else if (type == "CREATE") {
				$rootScope.$broadcast("app.massagePopup", {"msg" : $scope.msg.create_fail, "type" : "error"});
				//$scope.massagePopup($scope.msg.create_fail, "error");				
				console.log("$http error : " + error);
			} else if (type == "UPDATE") {
				$rootScope.$broadcast("app.massagePopup", {"msg" : $scope.msg.update_fail, "type" : "error"});
				//$scope.massagePopup($scope.msg.update_fail, "error");				
				console.log("$http error : " + e);
			} else if (type == "REMOVE") {
				$rootScope.$broadcast("app.massagePopup", {"msg" : $scope.msg.delete_fail, "type" : "error"});
				//$scope.massagePopup($scope.msg.delete_fail, "error");
				console.log("$http error : " + e);
			}
		}
		
	}
	
	angular.module('singApp.crud').controller('crudController', crudController);
	
})();
