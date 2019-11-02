(function(angular) {
	angular.module('module.controller').controller('SwiperCtrl', [
		'$scope',
		'FileUploader',
		'Swiper',
		function($scope, FileUploader,Swiper) {
			var vm = $scope.vm = {};

			vm.inform = {type: 0,};
			
			vm.clock = {};
			
			vm.reset = function(){
				angular.copy(vm.clock,vm.New)
			};
			
			vm.page = {	size: 6,index: 1};
			
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

			vm.reset = function() {
				vm.New = angular.copy(vm.inform)
				vm.Item = angular.copy(vm.inform)
			};

			vm.onLoad = function() {
				vm.getList(vm.inform);
				vm.reset();
			};

			vm.getList = function(params) {
				Swiper.getList(params).then(function(answer) {vm.items = answer})
			};
			vm.getById = function(id) {
				Swiper.getById(id).then(function(answer) {vm.Item = answer})
			};

			vm.create = function(obj) {
				Swiper.create(obj).then(vm.resolveCreate)
				$('#createModal').modal('hide');
			};
			vm.update = function(obj) {
				Swiper.update(obj).then(vm.resolveUpdate)
				$('#updateModal').modal('hide');
			};
			vm.remove = function(id) {
				Swiper.remove(id).then(vm.resolveRemove)
				$('#removeModal').modal('hide');
			};

			vm.resolveCreate = function(res) {
				var code = res.code
				code == 200?alert('新增成功！'):alert('新增失败！')
				vm.onLoad();
			};
			vm.resolveUpdate = function(res) {
				var code = res.code
				code == 200?alert('修改成功！'):alert('修改失败！')
				vm.onLoad();
			};
			vm.resolveRemove = function(res) {
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
	]);
})(angular);