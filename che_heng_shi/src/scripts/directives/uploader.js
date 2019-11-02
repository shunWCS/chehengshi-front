(function(angular){
	angular.module('app').directive('ngUploader',function(){
		return {
			restrict: 'AE',
			replace: 'true',
			templateUrl: './views/directive/ngUploader.html',
		}
	})
})(angular);
