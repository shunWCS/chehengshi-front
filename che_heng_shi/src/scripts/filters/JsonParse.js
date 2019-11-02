(function(angular) {
	angular.module('scHelper').filter('JsonParse', function() {
		return function(content) {
			if(!content){
				return 
			}
			return JSON.parse(content);
		}
	});
})(angular);