(function() {
	'use strict';

	positionController.$inject = ['$scope', '$rootScope', '$resource', '$http', 'usSpinnerService', "$log" ];
	function positionController($scope, $rootScope, $resource, $http, usSpinnerService, $log) {
		
		
		$scope.collectionResource = null;
		$scope.itemResource = null;
		$scope.search = {"page" : null, "size" : 5, "sort" : [], "currentPage" : 1};
				
		
		$scope.initilize = function() {			
			console.log("--> initilize");			
			$scope.readAll();
		}
		
		
		$scope.preHandle = function() {
			$rootScope.$broadcast("app.blockingPopup", true);
		}
		
		$scope.postHandle = function(template) {
			$rootScope.$broadcast("app.blockingPopup", false);
			$scope.template = template;
		}
		
		$scope.getSortClass = function(name) {
			for (var i=0; i<$scope.search.sort.length; i++) {			
				if($scope.search.sort[i].indexOf(name+",asc") > -1) {
					return "sorting_asc";
				} else if($scope.search.sort[i].indexOf(name+",desc") > -1) {
					return "sorting_desc";
				} else if($scope.search.sort[i].indexOf(name+",null") > -1){
					return "sorting";
				}
			}			
			return "sorting";
		}		
		
		$scope.sortHandle = function(name) {			
			for (var i=0; i<$scope.search.sort.length; i++) {			
				if($scope.search.sort[i].indexOf(name+",asc") > -1) {					
					$scope.search.sort[i] = name+",desc";
					console.log($scope.search.sort);
					$scope.readAll();
					return;
				} else if($scope.search.sort[i].indexOf(name+",desc") > -1) {					
					$scope.search.sort[i] = name+",null";
					console.log($scope.search.sort);
					$scope.readAll();
					return;
				} else if($scope.search.sort[i].indexOf(name+",null") > -1){					
					$scope.search.sort[i] = name+",asc";
					console.log($scope.search.sort);
					$scope.readAll();
					return;
				}
			}			
			$scope.search.sort.push(name+",asc");
			console.log($scope.search.sort);
			$scope.readAll();
		}
    	
    	
		$scope.readAll = function() {
			$log.debug("readAll()");
			
			$scope.preHandle();
			
			var sort = [];
			
			for (var i=0; i<$scope.search.sort.length; i++) {
				if($scope.search.sort[i].indexOf("null") == -1) {					
					sort.push($scope.search.sort[i]);
				}
			}
						
			var params = {
					"page" : $scope.search.page, 
					"size" : $scope.search.size, 
					"sort" : sort
			};
			
			console.log(params);
			
			$http({						
				method : 'GET',
				url : "/position",
				params : params		
			}).success(function(d, a, b, c) {
				$log.debug("["+c.method+"] " + c.url + " " + a);
				$scope.search.currentPage = d.page.number +1;
				$scope.collectionResource = d;
				$scope.postHandle("position/position-list.html");
			}).error(function(e) {	
				$scope.postHandle("position/position-error.html");
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
				$scope.postHandle("position/position-view.html");
			}).error(function(e) {	
				$scope.postHandle("position/position-error.html");
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
			$scope.postHandle("position/position-edit.html");	
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
				$scope.postHandle("position/position-error.html");
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
				$scope.postHandle("position/position-edit.html");
			}).error(function(e) {		
				$scope.postHandle("position/position-error.html");
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
				$scope.postHandle("position/position-error.html");
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
				$scope.postHandle("position/position-error.html");
			});	
			
		}
		
		$scope.cancel = function() {
			$log.debug("cancel()");
			$scope.readAll();
		}		
		
		
	}
	
	angular.module('singApp.position').controller('positionController', positionController);
	
})();
