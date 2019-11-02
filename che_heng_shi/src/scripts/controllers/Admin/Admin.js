(function(angular) {
	angular.module('module.controller').controller('AdminCtrl', [
		'$scope',
		'$rootScope',
		'$window',
		'Admin',
		function($scope, $rootScope,$window, Admin) {
			var vm = $scope.vm = {};
			
			vm.blockquote = '账户信息';
			
			$rootScope.userInfo = {
				ifLoginTrue: $window.sessionStorage['ifLoginTrue'],
				nickName: $window.sessionStorage['ifAuthTrue']
			}
			
			vm.onLoad = function() {
				vm.getById($rootScope.userInfo.ifLoginTrue)
			};

			vm.getById = function(id) {
				Admin.getById(id).then(function(answer) {vm.Item = answer})
			};

			vm.update = function(obj) {
				Admin.update(obj).then(vm.resolveUpdate)
			};

			vm.resolveUpdate = function(res) {
				var code = res.code
				code == 200?alert('修改成功！'):alert('修改失败！')
				vm.onLoad();
			};

			vm.onLoad();

			$('#updateModal').on('show.bs.modal', function(event) {
				var button = $(event.relatedTarget);
				vm.getById(button.data('id'))
			});
			$('#removeModal').on('show.bs.modal', function(event) {
				var button = $(event.relatedTarget);
				vm.getById(button.data('id'))
			});
		}
	]);
})(angular);