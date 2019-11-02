(function(angular){
	angular.module('module.controller')
	.controller('fileOrder',[
		'$scope',
		'$rootScope',
		'User',
		'Order',
		function($scope,$rootScope,User,Order){
			var vm = $scope.vm = {};
			
			vm.blockquote = "文档订单";
			
			vm.page = {
			    size: 10,
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
	  			{label: '商品',name: 'title',type: 'string'},
	  			{label: '金额',name: 'actualPrice',type: 'string'},
	  			{label: '下单时间',name: 'orderTime',type: 'string'},
	  			{label: '操作',name: 'actions',sortable: false,colspan:2}
			];
			
			vm.reLoad = function(){
		    	vm.getList({
		    		orderType: 3,
					pageIndex: vm.page.index-1,
					pageSize: vm.page.size
				});
		    };
			
			vm.onLoad = function(){
				vm.getList({
					orderType: 3,
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
			vm.getById = function(id){
				Order.getById(id).then(function(answer){vm.Item = answer});
			};
			vm.getUserById = function(id){
				User.getById(id).then(function(answer){vm.User = answer});
			};
			
			vm.onLoad();
			
			$('#updateModal').on('show.bs.modal', function (event) {
			  	var button = $(event.relatedTarget); 
			  	vm.getById(button.data('id'))
			  	vm.getUserById(button.data('openid'))
			});
		}
	])
})(angular);
