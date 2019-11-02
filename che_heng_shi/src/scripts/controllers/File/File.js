(function(angular){
	angular.module('module.controller')
	.controller('FileCtrl',[
		'$scope',
		'$filter',
		'$rootScope',
		'FileUploader',
		'File',
		'FileType',
		function($scope,$filter,$rootScope,FileUploader,File,FileType){
			var vm = $scope.vm = {};
			
			vm.blockquote = "文档列表";
			
			vm.type = $rootScope.$stateParams.type;
			
			vm.params = {typeId: vm.type}
			
			vm.cloak = {};
			
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
	  			{label: '标题',name: 'title',type: 'string'},
	  			{label: '价格',name: 'price',type: 'string'},
	  			{label: '点击',name: 'clicks',type: 'string'},
	  			{label: '销量',name: 'sales',type: 'string'},
	  			{label: '时间',name: 'time',type: 'string'},
	  			{label: '操作',name: 'actions',sortable: false,colspan:2}
			];
			
			vm.whenType = function(){
		    	$rootScope.$state.go('app.file.list',{type: vm.type})
		    };
			
			vm.setTarget = function($event){
				vm.target = $event.currentTarget.dataset.target;
			};
			vm.whenTarget = function(target,avatar) {
				var targetList = {
					'New': function(){
						vm.New = vm.New || {}
						vm.New.banner = avatar;
					},
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
			
			vm.reset = function(){
				angular.copy(vm.cloak,vm.New)
			};
			
			vm.onLoad = function(){
				vm.getList(vm.params);
				vm.getTypeList();
				vm.reset();
			};
			
			vm.getTypeList = function(params){
				FileType.getList(params).then(function(answer){vm.typeList = answer});
			};
			
			vm.getList = function(params){
				File.getList(params).then(function(answer){vm.items = answer});
			};
			vm.getById = function(id){
				File.getById(id).then(function(answer){vm.Item = answer});
			};
			
			vm.create = function(obj){
				obj.text = obj.text?$filter('unicodeToString')(obj.text):''
				File.create(obj).then(vm.resolveCreate)
				$('#createModal').modal('hide');
			};
			vm.update = function(obj){
				obj.text = obj.text?$filter('unicodeToString')(obj.text):''
				File.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				File.remove(id).then(vm.resolveRemove);
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
