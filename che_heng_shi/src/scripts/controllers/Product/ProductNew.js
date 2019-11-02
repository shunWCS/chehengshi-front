(function(angular){
	angular.module('module.controller')
	.controller('ProductNewCtrl',[
		'$scope',
		'FileUploader',
		'Product',
		'ProductType',
		function($scope,FileUploader,Product,ProductType){
			var vm = $scope.vm = {};
			
			vm.blockquote = "新增产品";
			
			vm.cloak = {};
			
			vm.New = {
				bannerList: [],
		      	detailImgList: [],
		      	type: 1,
		      	manufacturerId: 1,
		      	productParameterList: [],
		      	skuList: []
			}
			
			vm.setTarget = function($event){
				vm.target = $event.currentTarget.dataset.target;
			};
			vm.whenTarget = function(target,avatar) {
				var targetList = {
					'New.banner': function() {vm.New.bannerList.push(avatar)},
					'New.detailImg': function() {vm.New.detailImgList.push(avatar)},
					'Item.banner': function() {vm.Item.bannerList.push(avatar)},
					'Item.detailImg': function() {vm.Item.detailImgList.push(avatar)},
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
					bannerList: [],
			      	detailImgList: [],
			      	type: 1,
			      	manufacturerId: 1,
			      	productParameterList: [],
			      	skuList: []
				},vm.New)
			};
			
			vm.onLoad = function(){
//				vm.getById();
				vm.getTypeList();
				vm.reset();
			};
			
			vm.getTypeList = function(params){
				ProductType.getList(params).then(function(answer){vm.typeList = answer});
			};
			
			vm.getById = function(id){
				Product.getById(id).then(function(answer){vm.Item = answer});
			};
			
			vm.pill = function(list,obj){
				var {name ,price,stock ,paramKey,paramValue} = obj
				list.push({name ,price,stock ,paramKey,paramValue} )
			}
			vm.splice = function(obj,index){obj.splice(index, 1)}
			
			
			vm.create = function(obj){
				obj.banner = obj.bannerList.join(';')
				obj.detailImg = obj.detailImgList.join(';')
				Product.create(obj).then(vm.resolveCreate)
//				$('#createModal').modal('hide');
			};
			vm.update = function(obj){
				Product.update(obj).then(vm.resolveUpdate);
//				$('#updateModal').modal('hide');
			};
			
			vm.resolveCreate = function(res){
				var code = res.code
				code == 200?alert('新增成功！'):alert('新增失败！')
//				vm.onLoad();
			};
			vm.resolveUpdate = function(res){
				var code = res.code
				code == 200?alert('修改成功！'):alert('修改失败！')
				vm.onLoad();
			};
			
			vm.onLoad();
			

			
		}
	])
})(angular);
