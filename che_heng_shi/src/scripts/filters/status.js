(function(angular) {
	angular.module('scHelper').filter('status', function() {
		return function(one) {
			var List = {
				1: '待支付',
				2: '待发货',
				3: '已发货',
				4: '售后',
				5: '已关闭'
			}
			return List[one]
		}
	});
})(angular);