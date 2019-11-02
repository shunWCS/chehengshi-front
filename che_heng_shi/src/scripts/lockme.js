'use strict';

/* Controllers */
// signin controller
app.controller('LockMeCtrl', ['$scope', '$http', '$state', '$window',
	function($scope, $http, $state, $window) {
		var vm = $scope.vm = {};
		vm.user = {
			userName: $window.sessionStorage['ifAuthTrue']
		};
		vm.authError = null;
		
		vm.reset = function(){
			$window.sessionStorage.removeItem("ifLoginTrue");
		};
	
		vm.identify = function(user) {
			$scope.authError = null;
			// Try to login
			$http.post(userCheckLoginURL, user)
				.then(function(res) {
					var data = res.data
					if(data.code == 200) {
						var Authorization = data.data || {}
						alert('登陆成功!')
						$window.sessionStorage['ifLoginTrue'] = Authorization.id;
						$window.sessionStorage['ifAuthTrue'] = user.userName;
						$state.go('app.dashboard');
					} else {
						alert('账号或密码错误，登陆失败!');
					}
				}, function(x) {
					$scope.authError = '服务器繁忙,请稍后重试';
				});
		};
		
		vm.reset();
		
	}
]);