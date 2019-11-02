(function(angular){
	angular.module('module.controller')
	.controller('ProviderCtrl',[
		'$scope',
		'$rootScope',
		'Manufacturer',
		function($scope,$rootScope,Manufacturer){
			var vm = $scope.vm = {};
			
			vm.blockquote = "供应商列表";
			
			vm.List = {
				1: '申请中',
				2: '正常使用中',
				3: '不通过',
			}
			vm.whenStatus = function(one){
				$rootScope.$state.go('app.manufacturer.provider',{status:one})
			}
			
			vm.page = {
			    size: 5,
			    index: 1
			};
			
			vm.clock = {type:1};
			
			vm.reset = function(){
				angular.copy(vm.clock,vm.New)
			};
			
			vm.onLoad = function(){
				vm.status = $rootScope.$stateParams.status
				var {status,type = 1} = $rootScope.$stateParams
				vm.getList({status,type});
				vm.reset();
			};
			
			vm.getList = function(params){
				Manufacturer.getList(params).then(function(answer){vm.items = answer})
			};
				
			vm.getById = function(id){
				Manufacturer.getById(id).then(function(answer){vm.Item = answer});
			};
			
			vm.create = function(obj){
				Manufacturer.create(obj).then(vm.resolveCreate)
				$('#createModal').modal('hide');
			};
			vm.update = function(obj){
				Manufacturer.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			vm.give = function(obj){
				Manufacturer.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				Manufacturer.remove(id).then(vm.resolveRemove);
				$('#updateModal').modal('hide');
				$('#removeModal').modal('hide');
			};
			
			vm.resolveCreate = function(res){
				var code = res.code
				code == 200?alert('新增成功！'):alert('新增失败！')
				vm.onLoad();
			};
			vm.resolveUpdate = function(res){
				var code = res.code
				code == 200?alert('修改成功！'):alert('修改失败！')
				vm.onLoad();
			};
			vm.resolveRemove = function(res){
				var code = res.code
				code == 200?alert('删除成功！'):alert('删除失败！')
				vm.onLoad();
			};
			
			vm.onLoad();
			
			$('#updateModal').on('show.bs.modal', function (event) {
			  	var button = $(event.relatedTarget); 
			  	vm.getById(button.data('id'))
			});
			$('#removeModal').on('show.bs.modal', function (event) {
			  	var button = $(event.relatedTarget); 
			  	vm.itemId = button.data('id');
				$('#updateModal').modal('hide');
			});
		}
	])
})(angular);
