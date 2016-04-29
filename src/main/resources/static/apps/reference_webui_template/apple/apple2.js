(function() {
	'use strict';

	var entityName = "apple";
	var template_base = "apple/";
	
		
	appleController.$inject = ['$scope', '$rootScope', '$resource', '$http', 'usSpinnerService', '$timeout', '$translate' ];
	function appleController($scope, $rootScope, $resource, $http, usSpinnerService, $timeout, $translate) {

		
		$scope.msg = {};
		$scope.baseUIUrl = "http://localhost:8080/";
    	$scope.baseRestUrl = "http://localhost:8080/";			
    	$scope.entityUrl = $scope.baseRestUrl+entityName;
    	
    	$scope.responseObj = {};
    	$scope.entities = [];
    	$scope.entity = {};
    	$scope.currentPage = 1;
		
		$scope.initilize = function() {			
			console.log("--> initilize");			
			try {								
				$scope.template = template_base + "apple-list.html";	
				$scope.read(0);
			} catch (e) {
				console.log("initilize error : " + e);
			}
		}
		
		
				
		$scope.read = function(page) {
			console.log("--> read ");
			console.log("page : " + page);
			try {							
				usSpinnerService.spin('app-spinner');
				//var sort = personSearch.sortAttr + "," + personSearch.sortOder;
				var sort = "";
				var requestUrl = $scope.entityUrl + "?page="+page+"&size=5" + "&sort="+sort;				
				
				$http({						
					method : 'GET',
					url : requestUrl						
				}).success(function(data) {				
					
					$rootScope.$broadcast("app.blockingPopup", false);
					$scope.currentPage = data.page.number+1;
					$scope.responseObj = data;
					$scope.entities = data._embedded[entityName];
					console.log($scope.entities);
					
				}).error(function(error) {		
					
					$rootScope.$broadcast("app.blockingPopup", false);
					console.log("$http error : " + error);
					
				});	
				
			} catch (e) {
				console.log("read error : " + e);
			}
		}
		
		$scope.readOne = function(obj) {
			console.log("--> readOne");			
			try {
				$scope.entity = obj;
				$scope.template = template_base + "apple-view.html";				
			} catch (e) {
				console.log("readOne error : " + e);
			}
		}
		
		$scope.createForm = function() {
			console.log("--> createForm");			
			try {
				$scope.entity = {};
				$scope.template = template_base + "apple-edit.html";				
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
				$rootScope.$broadcast("app.blockingPopup", true);
				$http({
					method : 'POST',
					url : $scope.responseObj._links.self.href,
					headers : {
						'Content-Type' : 'application/json; charset=UTF-8'
					},
					data : obj
				}).success(function(data) {						
					$rootScope.$broadcast("app.blockingPopup", false);
					$rootScope.$broadcast("app.massagePopup", {"messageKey" : "APP.CREATE_SUCCESS", "messageType" : "success"});
					//$scope.template = template_base + "apple-list.html";
					$scope.read($scope.responseObj.page.number);
				}).error(function(error) {					
					$rootScope.$broadcast("app.blockingPopup", false);
					//$rootScope.$broadcast("app.massagePopup", {"messageKey" : "APP.CREATE_FAIL", "messageType" : "error"});
					console.log("$http error : " + error);
				});				
			} catch (e) {
				console.log("create error : " + e);
			}
		}
		
		$scope.updateForm = function(obj) {
			console.log("--> updateForm");		
			
			try {				
				$scope.entity = obj;
				$scope.template = template_base + "apple-edit.html";				
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
				$rootScope.$broadcast("app.blockingPopup", true);
				$http({
					method : 'PUT',
					url : obj._links.self.href,
					headers : {
						'Content-Type' : 'application/json; charset=UTF-8'
					},
					data : obj
				}).success(function(data) {
					$rootScope.$broadcast("app.blockingPopup", false);
					$scope.template = template_base + "apple-list.html";
					$scope.read($scope.responseObj.page.number);
					//$rootScope.$broadcast("app.massagePopup", {"messageKey" : "APP.UPDATE_SUCCESS", "messageType" : "success"});
				}).error(function(error) {
					$rootScope.$broadcast("app.blockingPopup", false);
					//$rootScope.$broadcast("app.massagePopup", {"messageKey" : "APP.UPDATE_FAIL", "messageType" : "error"});
					console.log("$http error : " + e);
				});				
			} catch (e) {
				console.log("update error : " + e);
			}		
		}
		
		$scope.remove = function(obj) {
			console.log("--> remove");
			try {				
				$rootScope.$broadcast("app.blockingPopup", true);
				$http({
					method : 'DELETE',
					url : obj._links.self.href
				}).success(function(data) {
					$rootScope.$broadcast("app.blockingPopup", false);
					$scope.template = template_base + "apple-list.html";
					$scope.read($scope.responseObj.page.number);	
					//$rootScope.$broadcast("app.massagePopup", {"messageKey" : "APP.DELETE_SUCCESS", "messageType" : "success"});		
				}).error(function(error) {
					$rootScope.$broadcast("app.blockingPopup", false);
					$scope.template = template_base + "apple-list.html";
					$scope.read($scope.responseObj.page.number);	
					//$rootScope.$broadcast("app.massagePopup", {"messageKey" : "APP.DELETE_FAIL", "messageType" : "error"});
				});				
			} catch (e) {
				console.log("deleteAction error : " + e);
			}
		}
		
		$scope.cancel = function() {
			console.log("--> cancel");
			try {
				$scope.template = template_base + "apple-list.html";
				$scope.read($scope.responseObj.page.number);				
			} catch (e) {
				console.log("cancel error : " + e);
			}
		}		
		
		/*
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
		*/
		
		/*
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
		*/
		
	}
	
	angular.module('singApp.apple').controller('appleController', appleController);
	
})();
