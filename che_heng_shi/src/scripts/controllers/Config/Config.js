(function(angular){
	angular.module('module.controller')
	.controller('config',[
		'$scope',
		'Config',
		function($scope,Config){
			var vm = $scope.vm = {};

			vm.blockquote = "配置管理";

			vm.onLoad = function(){
				vm.getList();
			};

			vm.getList = function(params){
				Config.getList(params).then(function(answer){
					answer.forEach(function(item){
						switch(item.id){
							case '118985538300001': vm.m1 = item; break;
							case '119434814500001': vm.m2 = item; break;
							case '119775238800001': vm.m3 = item; break;
							case '119797751800001': vm.m4 = item; break;
							case '121544853500001': vm.m5 = item; break;
						}
					})
				});
			};

			vm.update1 = function(obj){
				Config.update(obj).then(vm.resolveUpdate);
				$('#updateModalOne').modal('hide');
			};
			vm.update2 = function(obj){
				Config.update(obj).then(vm.resolveUpdate);
				$('#updateModalTow').modal('hide');
			};
			vm.update3 = function(obj){
				Config.update(obj).then(vm.resolveUpdate);
				$('#updateModal3').modal('hide');
			};
			vm.update4 = function(obj){
				Config.update(obj).then(vm.resolveUpdate);
				$('#updateModal4').modal('hide');
			};
			vm.update5 = function(obj){
				Config.update(obj).then(vm.resolveUpdate);
				$('#updateModal5').modal('hide');
			};

			vm.resolveUpdate = function(code){
				code == 200?alert('修改成功！'):alert('修改失败！')
				vm.onLoad();
			};

			vm.onLoad();
		}
	])
})(angular);
