(function() {
	'use strict';

	appleController.$inject = ['$scope', '$rootScope', '$resource', '$http', 'usSpinnerService', "$log" ];
	function appleController($scope, $rootScope, $resource, $http, usSpinnerService, $log) {
		
		
		$scope.collectionResource = null;
		$scope.itemResource = null;
		$scope.search = {"page" : null, "size" : 5, "sort" : null, "currentPage" : 1};
				
		
		$scope.initilize = function() {			
			console.log("--> initilize");			
			$scope.readAll({});
		}
		
		
		$scope.preHandle = function() {
			$rootScope.$broadcast("app.blockingPopup", true);
		}
		
		$scope.postHandle = function(template) {
			$rootScope.$broadcast("app.blockingPopup", false);
			$scope.template = template;
		}
    	
    	
		$scope.readAll = function() {
			$log.debug("readAll()");
			
			$scope.preHandle();
			
			$http({						
				method : 'GET',
				url : "/apple",
				params : $scope.search				
			}).success(function(d, a, b, c) {
				$log.debug("["+c.method+"] " + c.url + " " + a);
				$scope.search.currentPage = d.page.number +1;
				$scope.collectionResource = d;
				$scope.postHandle("apple/apple-list.html");
			}).error(function(e) {	
				$scope.postHandle("apple/apple-error.html");
			});	
			
		}
		
		$scope.read = function(item) {
			$log.debug("read()");		
			
			$scope.preHandle();
			
			$http({						
				method : 'GET',
				url : item._links.self.href						
			}).success(function(d, a, b, c) {
				$log.debug("["+c.method+"] " + c.url + " " + a);	
				$scope.itemResource = d;
				$scope.postHandle("apple/apple-view.html");
			}).error(function(e) {	
				$scope.postHandle("apple/apple-error.html");
			});		
			
		}
		
		$scope.editForm = function(item) {
			
			if (item == null) {
				$scope.search['isNew'] = true;
				$scope.createForm();
			} else {
				$scope.search['isNew'] = false;
				$scope.updateForm(item);
			}	
		}
		
		$scope.edit = function(valid) {
			
			if (!valid) {
				return;
			}			
			if ($scope.search['isNew']) {
				$scope.create();
			} else {
				$scope.update();
			}			
		}
		
		
		$scope.createForm = function() {
			$log.debug("createForm()");
			$scope.itemResource = {};
			$scope.postHandle("apple/apple-edit.html");	
		}
		
		$scope.create = function() {
			$log.debug("create()");
			$scope.preHandle();
			
			$http({						
				method : 'POST',
				url : $scope.collectionResource._links.self.href,
				headers : {'Content-Type' : 'application/json; charset=UTF-8'},
				data : $scope.itemResource
			}).success(function(d, a, b, c) {
				$log.debug("["+c.method+"] " + c.url + " " + a);			
				$scope.readAll();
			}).error(function(e) {		
				$scope.postHandle("apple/apple-error.html");
			});	
		}
		
		$scope.updateForm = function(item) {
			$log.debug("updateForm()");	
			
			$scope.preHandle();
			
			$http({						
				method : 'GET',
				url : item._links.self.href				
			}).success(function(d, a, b, c) {
				$log.debug("["+c.method+"] " + c.url + " " + a);
				$scope.itemResource = d;
				$scope.postHandle("apple/apple-edit.html");
			}).error(function(e) {		
				$scope.postHandle("apple/apple-error.html");
			});	
		}
		
		$scope.update = function() {
			$log.debug("update()");
			$scope.preHandle();
			
			$http({						
				method : 'PUT',
				url : $scope.itemResource._links.self.href,
				headers : {	'Content-Type' : 'application/json; charset=UTF-8'},
				data : $scope.itemResource
			}).success(function(d, a, b, c) {
				$log.debug("["+c.method+"] " + c.url + " " + a);				
				$scope.readAll();
			}).error(function(e) {		
				$scope.postHandle("apple/apple-error.html");
			});	
			
		}
		
		$scope.remove = function(item) {
			$log.debug("remove()");
			$scope.preHandle();
			
			$http({						
				method : 'DELETE',
				url : item._links.self.href							
			}).success(function(d, a, b, c) {
				$log.debug("["+c.method+"] " + c.url + " " + a);				
				$scope.readAll();
			}).error(function(e) {		
				$scope.postHandle("apple/apple-error.html");
			});	
			
		}
		
		$scope.cancel = function() {
			$log.debug("cancel()");
			$scope.readAll();
		}		
		
		
	}
	
	angular.module('singApp.apple').controller('appleController', appleController);
	
})();
