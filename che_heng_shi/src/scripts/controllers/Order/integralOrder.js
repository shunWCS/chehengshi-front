(function(angular){
	angular.module('module.controller')
	.controller('integralOrder',[
		'$scope',
		'$rootScope',
		'Order',
		'User',
		'Manufacturer',
		function($scope,$rootScope,Order,User,Manufacturer){
			var vm = $scope.vm = {};
			
			vm.blockquote = "积分订单";
			
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
			
			vm.reLoad = function(){
		    	vm.getList({
		    		orderType: 4,
					pageIndex: vm.page.index-1,
					pageSize: vm.page.size
				});
		    };
			
			vm.onLoad = function(){
				vm.getList({
					orderType: 4,
					pageIndex: vm.page.index-1,
					pageSize: vm.page.size
				});
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
			
			vm.resolveUpdate = function(res){
				var code = res.code
				code == 200?alert('修改成功！'):alert('修改失败！')
				vm.onLoad();
			};
			
			vm.onLoad();
			
			
			$('#updateModal').on('show.bs.modal', function (event) {
			  	var button = $(event.relatedTarget); 
			  	vm.getById(button.data('id'))
			});
		}
	])
})(angular);
