(function(angular){
	angular.module('module.controller')
	.controller('ProviderProductCtrl',[
		'$scope',
		'FileUploader',
		'Product',
		'ProductType',
		'Manufacturer',
		function($scope,FileUploader,Product,ProductType,Manufacturer){
			var vm = $scope.vm = {};
			
			vm.blockquote = "供应商城";
			
			
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
//	  			{label: 'ID',name: 'id',type: 'string'},
	  			{label: '标题',name: 'title',type: 'string'},
	  			{label: '价格',name: 'price',type: 'string'},
//	  			{label: '排列',name: 'sort',type: 'string'},
	  			{label: '点击',name: 'clicks',type: 'string'},
	  			{label: '销量',name: 'sales',type: 'string'},
	  			{label: '时间',name: 'time',type: 'string'},
	  			{label: '操作',name: 'actions',sortable: false,colspan:2}
			];
			
			vm.setTarget = function($event){
				vm.target = $event.currentTarget.dataset.target;
			};
			vm.whenTarget = function(target,avatar) {
				var targetList = {
					'New.banner': function() {vm.New.banner.push(avatar)},
					'New.detailImg': function() {vm.New.banndetailImger.push(avatar)},
					'Item.banner': function() {vm.Item.banner.push(avatar)},
					'Item.detailImg': function() {vm.Item.detailImg.push(avatar)},
				}
				return targetList[target]()
			};

			
			vm.uploader = new FileUploader({
				url: uploadWeightUrl,
				autoUpload: true, // 自动开始上传
			});

			vm.uploader.onBeforeUploadItem = function(item){
				item.target = vm.target
			};

			vm.uploader.onSuccessItem = function(fileItem, response, status, headers) {
				vm.avatar = response.data;
				vm.whenTarget(fileItem.target,vm.avatar)
			};
			
			vm.reset = function(){
				angular.copy({
					banner: [],
			      	detailImg: [],
			      	type: 1,
			      	productParameterList: [],
			      	skuList: []
				},vm.New)
			};
			
			vm.onLoad = function(){
				vm.getList({manufacturerId: -1});
				vm.getTypeList();
				vm.getProviderList()
				vm.reset();
			};
			
			vm.getTypeList = function(params){
				ProductType.getList(params).then(function(answer){vm.typeList = answer});
			};
			
			vm.getProviderList = function(params){
				Manufacturer.getList(params).then(function(answer){vm.providerList = answer})
			};
			
			vm.getList = function(params){
				Product.getList(params).then(function(answer){vm.items = answer});
			};
			vm.getById = function(id){
				Product.getById(id).then(function(answer){vm.Item = answer});
			};
			
			vm.update = function(obj){
				Product.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				Product.remove(id).then(vm.resolveRemove);
				$('#removeModal').modal('hide');
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
			
			vm.splice = function(obj,index){obj.splice(index, 1)}
			
//			$(":file").filestyle();
			
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
