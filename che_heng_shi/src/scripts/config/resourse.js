(function(angular){
	angular.module('app').config(['$resourceProvider',
		function($resourceProvider) {
		  	$resourceProvider.defaults.actions = { 
	            create: {method: 'POST'}, 
	            get:    {method: 'GET'}, 
	            getAll: {method: 'GET'}, 
	            update: {method: 'PUT'}, 
	            remove: {method: 'DELETE'} 
       		}; 
		}]);
})(angular);