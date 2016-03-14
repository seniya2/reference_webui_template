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
	
	function PersonPage(size, totalElements, totalPages, number) {
		this.size = size;
		this.totalElements = totalElements;
		this.totalPages = totalPages;
		this.number = number;
	}
	
	
	angular.module('singApp.crud').controller('crudController', crudController);
	crudController.$inject = ['config', '$scope', '$resource', '$http', 'usSpinnerService', '$timeout' ];
	function crudController(config, $scope, $resource, $http, usSpinnerService, $timeout) {
		
		//console.log("baseRestUrl : " + $scope.baseRestUrl);
		
		$scope.initilize = function() {
			
		}
		
		$scope.read = function(search) {
			
		}
		
		$scope.readOne = function(person) {
			
		}
		
		$scope.createForm = function() {
			
			
		}
		
		$scope.create = function(obj) {
			
			
		}
		
		$scope.updateForm = function(obj) {
			
			
		}
		
		$scope.remove = function(obj) {
			
		}
		
		$scope.cancel = function() {
			
		}
		
		
		
		$scope.success = function(json) {
			// 리스트 or 하나의 객체
			
		}
		
		
		$scope.error = function() {
			
			
		}
		
		
	}
	
	
})
