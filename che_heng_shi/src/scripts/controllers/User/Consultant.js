(function(angular){
	angular.module('module.controller')
	.controller('ConsultantCtrl',[
		'$scope',
		'$filter',
		'FileUploader',
		'User',
		function($scope,$filter,FileUploader,User){
			var vm = $scope.vm = {};
			
			vm.blockquote = "咨询师傅";
			
			vm.cloak = {consultant:2};
			
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
	  			{label: '#',name: 'openId',type: 'string'},
	  			{label: '微信昵称',name: 'nickName',type: 'string'},
	  			{label: '名字',name: 'name',type: 'string'},
	  			{label: '联系方式',name: 'phone',type: 'string'},
	  			{label: '会员编码',name: 'membershipId',type: 'string'},
	  			{label: '注册时间',name: 'registrationTime',type: 'string'},
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
			
			vm.reset = function(){
				angular.copy(vm.cloak,vm.New)
			};
			
			vm.onLoad = function(){
				vm.getList(vm.cloak);
				vm.getUserList()
				vm.reset();
			};
			
			vm.getList = function(params){
				User.getList(params).then(function(answer){vm.items = answer});
			};
			vm.getById = function(id){
				User.getById(id).then(function(answer){vm.Item = answer});
			};
			
			vm.getUserList = function(){
				User.getList().then(function(answer){vm.UserList = answer});
			};
			
			vm.create = function(obj){
				User.update(obj).then(vm.resolveCreate)
				$('#createModal').modal('hide');
			};
			vm.update = function(obj){
				obj.text = obj.text?$filter('unicodeToString')(obj.text):''
				User.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				User.remove(id).then(vm.resolveRemove);
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
