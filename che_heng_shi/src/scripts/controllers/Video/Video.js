(function(angular){
	angular.module('module.controller')
	.controller('VideoCtrl',[
		'$scope',
		'$sce',
		'$rootScope',
		'$filter',
		'FileUploader',
		'Video',
		'VideoType',
		function($scope,$sce,$rootScope,$filter,FileUploader,Video,VideoType){
			var vm = $scope.vm = {};
			
			vm.blockquote = "视频列表";
			
			vm.type = $rootScope.$stateParams.type;
			
			vm.params = {typeId: vm.type}
			
			vm.cloak = {};
			
			vm.New = {
				banner: '',
				video: '',
				flashView: ''
			}
			vm.Item = {
				banner: '',
				video: '',
				flashView: ''
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
//	  			{label: 'ID',name: 'id',type: 'string'},
	  			{label: '标题',name: 'title',type: 'string'},
	  			{label: '价格',name: 'price',type: 'string'},
//	  			{label: '排列',name: 'sort',type: 'string'},
	  			{label: '点击',name: 'clicks',type: 'string'},
	  			{label: '销量',name: 'sales',type: 'string'},
	  			{label: '时间',name: 'time',type: 'string'},
	  			{label: '操作',name: 'actions',sortable: false,colspan:2}
			];
			vm.videoUrlFun = function(url){
		        //$sce.trustAsResourceUrl方法把普通路径处理加工成一个angular环境可识别，并认为是安全的路径来使用
		        return $sce.trustAsResourceUrl(url);;
		    };
		    
		    vm.whenType = function(){
		    	$rootScope.$state.go('app.video.list',{type: vm.type})
		    };
			
			vm.setTarget = function($event){
				vm.target = $event.currentTarget.dataset.target;
			};
			vm.whenTarget = function(target,avatar) {
				var targetList = {
					'New.banner': function() {vm.New.banner = avatar},
					'New.video': function() {vm.New.video = avatar},
					'New.flashView': function() {vm.New.flashView = avatar},
					'Item.banner': function() {vm.Item.banner = avatar},
					'Item.video': function() {vm.Item.video = avatar},
					'Item.flashView': function() {vm.Item.flashView = avatar},
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

			vm.uploader.onSuccessItem = function(VideoItem, response, status, headers) {
				vm.avatar = response.data;
				vm.whenTarget(VideoItem.target,vm.avatar)
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
				VideoType.getList(params).then(function(answer){vm.typeList = answer});
			};
			
			vm.getList = function(params){
				Video.getList(params).then(function(answer){vm.items = answer});
			};
			vm.getById = function(id){
				Video.getById(id).then(function(answer){vm.Item = answer});
			};
			
			vm.create = function(obj){
				obj.introduce = obj.introduce?$filter('unicodeToString')(obj.introduce):''
				Video.create(obj).then(vm.resolveCreate)
				$('#createModal').modal('hide');
			};
			vm.update = function(obj){
				obj.introduce = obj.introduce?$filter('unicodeToString')(obj.introduce):''
				Video.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				Video.remove(id).then(vm.resolveRemove);
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
