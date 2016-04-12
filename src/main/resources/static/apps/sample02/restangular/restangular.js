(function() {
	'use strict';

	restangularController.$inject = [ '$scope', '$rootScope','$translate', 'Restangular'];
	function restangularController($scope, $rootScope, $translate, Restangular) {

		console.log("restangularController -->");
		
		
		
		var User = Restangular.all('foos');

		var allUsers = User.getList();
		
		User.getList().then(function(users) {
			console.log(users);
		})
		
		console.log(allUsers);
		
		/*
		var oneUser = Restangular.one('foos', '1');
		

		oneUser.get().then(function(user) {
			console.log(user);
		});
		*/

	}

	angular.module('singApp.restangular').controller('restangularController', restangularController);

})();
