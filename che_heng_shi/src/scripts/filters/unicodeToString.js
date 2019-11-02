(function(angular) {
	angular.module('scHelper').filter('unicodeToString', function() {
		return function(content) {
			var div = document.createElement('div');
			if(content) {
				div.innerHTML = content;
			}
			return div.innerHTML;
		}
	});
})(angular);