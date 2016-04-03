(function() {
  'use strict';
  
	function Point() {
		this.id = null;
		this.name = null;
		this.datetime = null;
		this.value = null;
		this.dataType = null;
	}
	
	function PointPage(size, totalElements, totalPages, number, currentPage, newPage) {
		this.size = size;
		this.totalElements = totalElements;
		this.totalPages = totalPages;
		this.number = number;
		this.currentPage = currentPage;
		this.newPage = newPage;
	}
	
	function PointSearch(sortAttr, sortOder, searchText, searchTarget) {
		this.sortAttr = sortAttr;
		this.sortOder = sortOder;
		this.searchText = searchText;
		this.searchTarget = searchTarget;
	}

  	PMController.$inject = ['$scope', '$rootScope', '$resource', 'usSpinnerService', '$timeout', '$sce', '$http', '$translate', '$stateParams'];
    function PMController ($scope, $rootScope, $resource, usSpinnerService, $timeout, $sce, $http, $translate, $stateParams) {
    	
    	var entityName = $stateParams.entityName;
    	
    	var template_base = "modules/point-manage/";
		$scope.msg = {};
		
		$scope.initilize = function() {			
			console.log("--> initilize");			
			
			try {
				
				$translate(['setting_network_ui'
				            ,'setting_network_rest'
				            ,'setting_network_xd'
				            ,'view_point_manage_list_point_normal'
				            ,'view_point_manage_list_point_alarm'
				            ,'view_point_manage_list_point_history'
				            ,'view_point_manage_create_success'
				            ,'view_point_manage_create_fail'
				            ,'view_point_manage_update_success'
				            ,'view_point_manage_update_fail'
				            ,'view_point_manage_delete_success'
				            ,'view_point_manage_delete_fail']).then(function (translations) {
				            	
				            
				            	
			            	$scope.baseUIUrl = translations.setting_network_ui;
			            	$scope.baseRestUrl = translations.setting_network_rest;	
			            	$scope.baseXDUrl = translations.setting_network_xd;
			            	$scope.entityUrl = $scope.baseRestUrl+entityName;			            	
			            	$scope.xdListUrl = $scope.baseXDUrl+"current/"+entityName+"/";
			        		$scope.xdUpdateUrl = $scope.baseXDUrl+"setting/"+entityName+"/";
			            	
			            	$scope.msg.create_success = translations.view_point_manage_create_success;
			            	$scope.msg.create_fail = translations.view_point_manage_create_fail;
							$scope.msg.update_success = translations.view_point_manage_update_success;
							$scope.msg.update_fail = translations.view_point_manage_update_fail;
							$scope.msg.delete_success = translations.view_point_manage_delete_success;
							$scope.msg.delete_fail = translations.view_point_manage_delete_fail;							
							$scope.msg.point_normal = translations.view_point_manage_list_point_normal;
							$scope.msg.point_alarm = translations.view_point_manage_list_point_alarm;
							$scope.msg.point_history = translations.view_point_manage_list_point_history;	
							
							$scope.currentPoint = new Point();
							$scope.pointList = null;
							$scope.pointPage = new PointPage(20, 0, 0, 0, 1, 0);
							$scope.pointSearch = new PointSearch("id", "desc", null, null);
							$scope.paginationDisplay = true;
							$scope.template = template_base + "point-manage-list.html";

							$scope.getPointInfo();
							$scope.read($scope.pointPage, $scope.pointSearch);
				});
				
			} catch (e) {
				console.log("initilize error : " + e);
			}			
		}
    	
		
		$scope.read = function(pointPage, pointSearch, attr, newPageNumber) {
			console.log("--> read ");
			console.log(pointPage);		
			try {			
				
				usSpinnerService.spin('app-spinner');
				
				if (attr != null || attr != undefined) {
					if ($scope.pointSearch.sortAttr != attr) {
						$scope.pointSearch.sortOder = "desc"
						$scope.pointSearch.sortAttr = attr;
					} else {
						if ($scope.pointSearch.sortOder == "desc") {
							$scope.pointSearch.sortOder = "asc"
						} else {
							$scope.pointSearch.sortOder = "desc"
						}
					}
				}
				
				if (newPageNumber != null  || newPageNumber != undefined) {				
					$scope.pointPage.newPage = newPageNumber-1;
				} else {
					$scope.pointPage.newPage = $scope.pointPage.currentPage-1;
				}		
				
				var sort = pointSearch.sortAttr + "," + pointSearch.sortOder;
				var requestUrl = $scope.xdListUrl + "?page="+$scope.pointPage.newPage + "&size=" + $scope.pointPage.size + "&sort="+sort;	
				if ($scope.pointSearch.searchText != null) {
					requestUrl = $scope.xdListUrl + '?page='+$scope.pointPage.newPage + '&size=' + $scope.pointPage.size + '&sort='+sort
								+'&name='+$scope.pointSearch.searchText;
				}
				
				
				
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
		
		$scope.readOne = function(id, idx) {
			console.log("--> readOne");			
			
			try {		
				usSpinnerService.spin('app-spinner');
				$http({
					method : 'GET',
					url : $scope.xdListUrl+id
				}).success(function(data) {		
					$scope.pointList[idx].datetime = data.datetime;
					$scope.pointList[idx].value = data.value;
					//console.log("idx : " + idx);
					$timeout(function(){usSpinnerService.stop('app-spinner')}, 500);
				}).error(function(error) {
					
				});
			} catch (e) {
				console.log("readOne error : " + e);
			}
		}
		
		$scope.updateForm = function(obj) {
			console.log("--> updateForm");		
			
			try {
				$scope.currentPoint = obj;
				$scope.template = template_base + "point-manage-edit.html";							
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
				
				$rootScope.$broadcast("app.disableScreen", true);
				
				var name = document.getElementById("name");
				var interval = document.getElementById("interval");
				var criteria = document.getElementById("criteria");
				
				if (name != null) {
					$scope.currentPoint.name = name.value;
				} else {
					$scope.currentPoint.name = null;
				}
				if (interval != null) {
					$scope.currentPoint.interval = parseInt(interval.value);	
				} else {
					$scope.currentPoint.interval = null;
				}
				if (criteria != null) {
					$scope.currentPoint.criteria = criteria.value;
				} else {
					$scope.currentPoint.criteria = null;
				}	
				
				var postData = "";
				if ($scope.currentPoint.name != null) {
					postData += "&name="+encodeURIComponent($scope.currentPoint.name)
				} else {
					//postData += "&name=null"
				}
				if ($scope.currentPoint.interval != null) {
					if (!isNaN($scope.currentPoint.interval)){
						postData += "&interval="+$scope.currentPoint.interval
					} else {
						postData += "&interval=-1"
					}
				} else {
					postData += "&interval="
				}
				if ($scope.currentPoint.criteria != null && $scope.currentPoint.criteria != "") {
					postData += "&criteria="+encodeURIComponent($scope.currentPoint.criteria)
				}
				
				$http({
					method : 'POST',
					url : $scope.xdUpdateUrl + obj.id,
					headers : {
						'Content-Type': 'application/x-www-form-urlencoded'
					},
					data : postData
				}).success(function(data) {
					$scope.success(data, "UPDATE");
				}).error(function(error) {
					$scope.error(error, "UPDATE");
				});				
			} catch (e) {
				console.log("update error : " + e);
			}		
		}
		
		$scope.success = function(data, type) {			
			$rootScope.$broadcast("app.disableScreen", false);
			if (type == "LIST") {
				$scope.pointList = data.content;				
				var dataType = "";
				for (var key in $scope.pointList) {
					if ($scope.pointList[key].interval != null) {
						dataType = '<span class="label label-info">'+$scope.msg.point_history+'</span>';
						if ($scope.pointList[key].criteria != null && $scope.pointList[key].criteria != "") {
							dataType += '&nbsp; <span class="label label-warning">'+$scope.msg.point_alarm+'</span>';
						}
					} else {
						if ($scope.pointList[key].criteria != null && $scope.pointList[key].criteria != "") {
							dataType = '<span class="label label-warning">'+$scope.msg.point_alarm+'</span>';
						} else {
							dataType = '<span class="label label-default">'+$scope.msg.point_normal+'</span>';
						}
					}
					$scope.pointList[key].dataType = $sce.trustAsHtml(dataType);
				}								
				$scope.pointPage.size = data.size;
				$scope.pointPage.totalElements = data.totalElements;
				$scope.pointPage.totalPages = data.totalPages;
				$scope.pointPage.number = data.number;
				$scope.pointPage.currentPage = data.number+1;
				
				//= new PointPage(data.size, data.totalElements, data.totalPages, data.number, data.number+1, null);
				$scope.paginationDisplay = true;
				console.log($scope.pointPage);	
			} else if (type == "UPDATE") {
				$scope.template = template_base + "point-manage-list.html";
				$scope.read($scope.pointPage, $scope.pointSearch);
				$rootScope.$broadcast("app.massagePopup", {"msg" : $scope.msg.update_success, "type" : "success"});
				//$scope.massagePopup($scope.msg.update_success, "success");
			} 		
		}		
		
		$scope.error = function(error, type) {
			//$scope.disableScreen(false);
			$rootScope.$broadcast("app.disableScreen", false);
			if (type == "LIST") {				
				console.log("$http error : " + error);
			} else if (type == "UPDATE") {
				$rootScope.$broadcast("app.massagePopup", {"msg" : $scope.msg.update_fail, "type" : "error"});
				//$scope.massagePopup($scope.msg.update_fail, "error");				
				console.log("$http error : " + error);
			} 
		}
		
		$scope.cancel = function() {
			console.log("--> cancel");
			try {
				$scope.template = template_base + "point-manage-list.html";
				$scope.read($scope.pointPage, $scope.pointSearch);				
			} catch (e) {
				console.log("cancel error : " + e);
			}
		}	
				
		$scope.getPointInfo = function() {	
			console.log("--> getPointInfo " + $scope.xdListUrl);
			var listUrl = $scope.xdListUrl + '?page=0&size=2000';	
			try {
				$http({
						method : 'GET',
						url : listUrl
					}).success(function(data) {						
						var pointInfoArray = [];
						for (var key in data.content) {
							pointInfoArray.push(data.content[key].id);
							pointInfoArray.push(data.content[key].name);
						}						
						$scope.pointInfo = pointInfoArray;
					}).error(function(error) {
						
					});
			} catch (e) {
				console.log("getPointInfo error : " + e);
			}
		}
		
		$scope.searchClickFn = function(){			
			console.log("--> searchClickFn ------------- ");
			var searchName = document.getElementById("searchName");
			$scope.pointSearch.searchText = searchName.value;
			$scope.read($scope.pointPage, $scope.pointSearch, null, 0);
		}
		
    }
    
    angular.module('singApp.point-manage').controller('PMController', PMController);

})();
