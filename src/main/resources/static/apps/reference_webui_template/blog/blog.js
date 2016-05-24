(function() {
	'use strict';

	blogController.$inject = ['$scope', '$rootScope', '$resource', '$http', 'usSpinnerService', "$log", 'FileUploader' ];
	function blogController($scope, $rootScope, $resource, $http, usSpinnerService, $log, FileUploader) {
		
		var uploader = $scope.uploader = new FileUploader();
		
		uploader.onWhenAddingFileFailed = function(item /*{File|FileLikeObject}*/, filter, options) {
            console.info('onWhenAddingFileFailed', item, filter, options);
        };
        uploader.onAfterAddingFile = function(fileItem) {
            console.info('onAfterAddingFile', fileItem);
        };
        uploader.onAfterAddingAll = function(addedFileItems) {
            console.info('onAfterAddingAll', addedFileItems);
        };
        uploader.onBeforeUploadItem = function(item) {
            console.info('onBeforeUploadItem', item);
        };
        uploader.onProgressItem = function(fileItem, progress) {
            console.info('onProgressItem', fileItem, progress);
        };
        uploader.onProgressAll = function(progress) {
            console.info('onProgressAll', progress);
        };
        uploader.onSuccessItem = function(fileItem, response, status, headers) {
            console.info('onSuccessItem', fileItem, response, status, headers);
        };
        uploader.onErrorItem = function(fileItem, response, status, headers) {
            console.info('onErrorItem', fileItem, response, status, headers);
        };
        uploader.onCancelItem = function(fileItem, response, status, headers) {
            console.info('onCancelItem', fileItem, response, status, headers);
        };
        uploader.onCompleteItem = function(fileItem, response, status, headers) {
            console.info('onCompleteItem', fileItem, response, status, headers);
        };
        uploader.onCompleteAll = function() {
            console.info('onCompleteAll');
        };
		
        
        
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
				url : "/blog",
				params : params		
			}).success(function(d, a, b, c) {
				$log.debug("["+c.method+"] " + c.url + " " + a);
				$scope.search.currentPage = d.page.number +1;
				$scope.collectionResource = d;
				$scope.postHandle("blog/blog-list.html");
			}).error(function(e) {	
				$scope.postHandle("blog/blog-error.html");
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
				$scope.postHandle("blog/blog-view.html");
			}).error(function(e) {	
				$scope.postHandle("blog/blog-error.html");
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
			$scope.postHandle("blog/blog-edit.html");	
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
				$scope.postHandle("blog/blog-error.html");
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
				$scope.postHandle("blog/blog-edit.html");
			}).error(function(e) {		
				$scope.postHandle("blog/blog-error.html");
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
				$scope.postHandle("blog/blog-error.html");
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
				$scope.postHandle("blog/blog-error.html");
			});	
			
		}
		
		$scope.cancel = function() {
			$log.debug("cancel()");
			$scope.readAll();
		}		
		
		
	}
	
	angular.module('singApp.blog').controller('blogController', blogController);
	
})();
