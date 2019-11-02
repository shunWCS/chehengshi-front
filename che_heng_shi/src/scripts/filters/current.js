(function(angular) {
	angular.module('scHelper').filter('current', function() {
		return function(items,index) {
			if(!items) {
				return ;
			}
			return items[index]
		}
	});
})(angular);