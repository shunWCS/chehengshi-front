(function(angular){
	angular.module('module.controller')
	.controller('OrderCtrl',[
		'$scope',
		'$rootScope',
		'Order',
		'User',
		'Manufacturer',
		function($scope,$rootScope,Order,User,Manufacturer){
			var vm = $scope.vm = {};
			
			vm.blockquote = "订单列表";
			
			vm.cloak = {};
			
			vm.manufacturerId = $rootScope.$stateParams.manufacturerId;
			vm.status = $rootScope.$stateParams.status;
			
			vm.params = {
				manufacturerId: vm.manufacturerId,
				status: vm.status,
				orderType: 1
			}
			
			vm.statusList = {
				1: '待支付',
				2: '待发货',
				3: '已发货',
				4: '售后',
				5: '已关闭'
			}
			
			
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
	  			{label: '#',name: 'sort',type: 'string'},
	  			{label: '收货人',name: 'name',type: 'string'},
				{label: '联系方式',name: 'phone',type: 'string'},
	  			{label: '金额',name: 'price',type: 'string'},
				{label: '下单时间',name: 'orderTime',type: 'string'},
				{label: '状态',name: 'status',type: 'string'},
	  			{label: '操作',name: 'actions',sortable: false,colspan:2}
			];
			
		    vm.whenProvider = function(){
		    	$rootScope.$state.go('app.order.list',{
					manufacturerId: vm.manufacturerId,
					status: vm.status,
					orderType: 1
				})
		    };
		    vm.whenStatus = function(){
		    	$rootScope.$state.go('app.order.list',{
					manufacturerId: vm.manufacturerId,
					status: vm.status,
					orderType: 1
				})
		    };
			
			vm.reLoad = function(){
		    	vm.getList({
		    		manufacturerId: vm.manufacturerId,
					status: vm.status,
					orderType: 1,
					pageIndex: vm.page.index-1,
					pageSize: vm.page.size
				});
		    };
			
			vm.onLoad = function(){
				vm.getList({
					manufacturerId: vm.manufacturerId,
					status: vm.status,
					orderType: 1,
					pageIndex: vm.page.index-1,
					pageSize: vm.page.size
				});
				vm.getProviderList()
			};
			
			vm.getProviderList = function(params){
				Manufacturer.getList(params).then(function(answer){vm.providerList = answer})
			};
			
			vm.getList = function(params){
				Order.getList(params).then(({data,pageTotal}) =>{
					vm.pageTotal = pageTotal
					vm.items = data
				});
			};
			vm.getById = function(id,openId){
				Order.getById(id).then(function(answer){vm.Item = answer});
			};
			vm.getUserById = function(id){
				User.getById(id).then(function(answer){vm.User = answer});
			};
			vm.update = function(obj,status){
				obj.status = status
				Order.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				Order.remove(id).then(vm.resolveRemove);
				$('#removeModal').modal('hide');
			};
			
			vm.grand = function(obj,status){
				obj['status'] = status
				vm.update(obj)
			}
			
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
