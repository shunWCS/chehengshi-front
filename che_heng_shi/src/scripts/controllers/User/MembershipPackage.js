(function(angular){
	angular.module('module.controller')
	.controller('MembershipPackageCtrl',[
		'$scope',
		'MembershipPackage',
		function($scope,MembershipPackage){
			var vm = $scope.vm = {};
			
			vm.blockquote = "会员套餐";
			
			vm.page = {
			    size: 5,
			    index: 1
			};
			vm.sort = {
			    column: 'id',
			    direction: -1,
			    toggle: function(column) {
				    if (column.sortable === false){
				        return;
				    }else if (this.column === column.name) {
				        this.direction = -this.direction || -1;
				    } else {
				        this.column = column.name;
				        this.direction = -1;
				    }
			    }
			};
	  		vm.columns = [
	  			{label: '#',name: 'sort',sortable: false},
	  			{label: '类型',name: 'setMeal',type: 'string'},
	  			{label: '价格',name: 'price',type: 'string'},
	  			{label: '原价',name: 'originalPrice',type: 'string'},
	  			{label: '标签',name: 'introduce',type: 'string'},
	  			{label: '套餐有持续日期',name: 'duration',type: 'string'},
	  			{label: '销量',name: 'sales',type: 'string'},
	  			{label: '操作',name: 'actions',sortable: false,colspan:2}
			];
			
			vm.cloak = {};
			
			vm.reset = function(){
				angular.copy(vm.cloak,vm.New)
			};
			
			vm.onLoad = function(){
				vm.getList();
				vm.reset();
			};
			
			vm.getList = function(params){
				MembershipPackage.getList(params).then(function(answer){vm.items = answer});
			};
			vm.getById = function(id){
				MembershipPackage.getById(id).then(function(answer){vm.Item = answer});
			};
			
			vm.create = function(obj){
				MembershipPackage.create(obj).then(vm.resolveCreate)
				$('#createModal').modal('hide');
			};
			vm.update = function(obj){
				MembershipPackage.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				MembershipPackage.remove(id).then(vm.resolveRemove);
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
			});
		}
	])
})(angular);
