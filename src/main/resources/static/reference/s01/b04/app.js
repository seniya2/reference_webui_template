var app = angular.module('app', []);


app.directive('hello', function() {
	  return {
	    restrict: "E",
	    replace: true,
	    template: "<div>Hello readers, thank you for coming</div>"
	  }
	});