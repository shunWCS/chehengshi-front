(function(angular){
	angular.module('module.controller')
	.controller('IntegralCtrl',[
		'$scope',
		'$rootScope',
		'FileUploader',
		'Product',
		'ProductType',
		'Sku',
		'ProductParameter',
		function($scope,$rootScope,FileUploader,Product,ProductType,Sku,ProductParameter){
			var vm = $scope.vm = {};
			
			vm.blockquote = "积分商城";
			
			vm.cloak = {};
			
			vm.productTypeId = $rootScope.$stateParams.productTypeId;
			
			vm.params = {
				type: 2,
				productTypeId: vm.productTypeId,
			}
			
			vm.New = {
				bannerList: [],
		      	detailImgList: [],
		      	type: 2,
		      	manufacturerId: 1,
		      	productParameterList: [],
		      	skuList: []
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
	  			{label: '标题',name: 'title',type: 'string'},
	  			{label: '点击',name: 'clicks',type: 'string'},
	  			{label: '销量',name: 'sales',type: 'string'},
	  			{label: '操作',name: 'actions',sortable: false,colspan:2}
			];
			
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
			
			vm.whenType = function(){
		    	$rootScope.$state.go('app.product.integral',{
					productTypeId: vm.productTypeId
				})
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
			      	type: 2,
			      	manufacturerId: 1,
			      	productParameterList: [],
			      	skuList: [],
			      	status: 2
				},vm.New)
			};
			
			vm.onLoad = function(){
				vm.getList(vm.params);
				vm.getTypeList();
				vm.reset();
			};
			
			vm.getTypeList = function(params){
				ProductType.getList(params).then(function(answer){vm.typeList = answer});
			};
			
			vm.getList = function(params){
				Product.getList(params).then(function(answer){vm.items = answer});
			};
			vm.getById = function(id){
				Product.getById(id).then(function(answer){
					answer.bannerList = answer.banner.split(';')
					answer.detailImgList = answer.detailImg.split(';')
					vm.Item = answer
				});
			};
			vm.getSkuList = function(id){
				Sku.getList({productId: id}).then(function(answer){vm.skuList = answer})
			}
			vm.getParamsList = function(id){
				ProductParameter.getList({productId: id}).then(function(answer){vm.productParameterList = answer})
			}
			
			vm.pill = function(list,obj){
				var {name ,price,stock ,integral,paramKey,paramValue} = obj
				list.push({name ,price,stock ,integral,paramKey,paramValue} )
			};
			
			vm.splice = function(obj,index){obj.splice(index, 1)};
			
			vm.create = function(obj){
				obj.bannerT = obj.bannerList[0]
				obj.banner = obj.bannerList.join(';')
				obj.detailImg = obj.detailImgList.join(';')
				Product.create(obj).then(vm.resolveCreate)
				$('#createModal').modal('hide');
			};
			vm.update = function(obj){
				obj.bannerT = obj.bannerList[0]
				obj.banner = obj.bannerList.join(';')
				obj.detailImg = obj.detailImgList.join(';')
				Product.update(obj).then(vm.resolveUpdate);
				$('#updateModal').modal('hide');
			};
			
			vm.remove = function(id){
				Product.remove(id).then(vm.resolveRemove);
				$('#removeModal').modal('hide');
			};
			
			vm.createParam = function(obj){
				obj.productId = vm.Item.id;
				ProductParameter.create(obj).then(vm.resolveParam)
			};
			vm.resolveParam = function(){
				vm.getParamsList(vm.Item.id)
			};
			
			vm.createSku = function(obj){
				obj.productId = vm.Item.id;
				Sku.create(obj).then(vm.resolveSku)
			};
			vm.resolveSku = function(){
				vm.getSkuList(vm.Item.id)
			};
			
			vm.removeParam = function(id){
				ProductParameter.remove(id).then(vm.resolveParam);
			};
			
			vm.removeSku = function(id){
				Sku.remove(id).then(vm.resolveSku);
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
			
			vm.splice = function(obj,index){obj.splice(index, 1)}
			
			
//			$(":file").filestyle();
			
			$('#updateModal').on('show.bs.modal', function (event) {
			  	var button = $(event.relatedTarget); 
			  	vm.getById(button.data('id'))
			  	vm.getSkuList(button.data('id'))
			  	vm.getParamsList(button.data('id'))
			});
			$('#removeModal').on('show.bs.modal', function (event) {
			  	var button = $(event.relatedTarget); 
			  	vm.itemId = button.data('id');
			});
		}
	])
})(angular);
