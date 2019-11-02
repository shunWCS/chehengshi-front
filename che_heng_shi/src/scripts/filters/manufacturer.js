(function(angular) {
	angular.module('scHelper').filter('manufacturer', function() {
		return function(one) {
			var List = {
				1: '申请中',
				2: '正常使用中',
				3: '不通过',
			}
			return List[one]
		}
	});
})(angular);