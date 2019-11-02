(function(angular){
	angular.module('module.controller')
	.controller('ProductTypeCtrl',[
		'$scope',
		'FileUploader',
		'ProductType',
		function($scope,FileUploader,ProductType){
			var vm = $scope.vm = {};
			
			vm.blockquote = "产品类型";
			
			vm.cloak = {};
			
			vm.reset = function(){
				vm.New = angular.copy(vm.cloak)
			};
			
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
//	  			{label: 'ID',name: 'id',type: 'string'},
	  			{label: '#',name: 'sort',type: 'string'},
	  			{label: '类型',name: 'typeName',type: 'string'},
//	  			{label: '排列',name: 'sort',type: 'string'},
	  			{label: '操作',name: 'actions',sortable: false,colspan:2}
			];
			
			vm.setTarget = function($event){
				vm.target = $event.currentTarget.dataset.target;
			};
			vm.whenTarget = function(target,avatar) {
				var targetList = {
					'New': function(){vm.New.banner = avatar;},
					'Item': function(){vm.Item.banner = avatar;},
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
			
			vm.onLoad = function(){
				vm.getList();
				vm.reset();
			};
			
			vm.getList = function(params){
				ProductType.getList(params).then(function(answer){vm.items = answer});
			};
			vm.getById = function(id){
				ProductType.getById(id).then(function(answer){vm.Item = answer});
			};
			
			vm.create = function(obj){
				ProductType.create(obj).then(vm.resolveCreate)
				$('#createModal').modal('hide');
			};
			vm.update = function(obj){
				ProductType.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				ProductType.remove(id).then(vm.resolveRemove);
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
			
			$(":file").filestyle();
			
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
