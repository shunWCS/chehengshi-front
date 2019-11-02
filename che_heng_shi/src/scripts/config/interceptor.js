(function(angular){
	angular.module('app').config(['$httpProvider',function($httpProvider){
//		$httpProvider.defaults.withCredentials = true;
  		$httpProvider.interceptors.push('httpInterceptor');
	}])	
})(angular); 	
