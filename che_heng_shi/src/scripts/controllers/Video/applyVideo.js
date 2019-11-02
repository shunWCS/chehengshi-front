(function(angular){
    angular.module('module.controller')
        .controller('ApplyVideoCtrl',[
            '$scope',
            '$filter',
            '$rootScope',
            'FileUploader',
            'ShareVideo',
            function($scope,$filter,$rootScope,FileUploader,ShareVideo){
                var vm = $scope.vm = {};

                vm.blockquote = "待审核列表";

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
                    {label: '#',name: 'id',type: 'int'},
                    {label: '发布人',name: 'name',type: 'string'},
                    {label: '标题',name: 'title',type: 'string'},
                    {label: '视频链接',name: 'videoUrl',type: 'string'},
                    {label: '联系电话',name: 'phone',type: 'string'},
                    {label: '备注',name: 'remark',type: 'string'},
                    {label: '发布时间',name: 'time',type: 'string'},
                    {label: '操作',name: 'actions',sortable: false,colspan:2}
                ];

                vm.whenType = function(){
                    $rootScope.$state.go('app.applyVideo.list',{type: vm.type})
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
                    vm.reset();
                };

                vm.getList = function(params){
                    ShareVideo.getList(params).then(function(answer){vm.items = answer});
                };
                vm.getById = function(id){
                    ShareVideo.getById(id).then(function(answer){vm.Item = answer});
                };

                vm.create = function(obj){
                    obj.text = obj.text?$filter('unicodeToString')(obj.text):''
                    ShareVideo.create(obj).then(vm.resolveCreate)
                    $('#createModal').modal('hide');
                };
                vm.update = function(obj){
                    obj.text = obj.text?$filter('unicodeToString')(obj.text):''
                    ShareVideo.update(obj).then(vm.resolveUpdate);
                    $('#updateModal').modal('hide');
                };

                vm.remove = function(id){
                    ShareVideo.remove(id).then(vm.resolveRemove);
                    $('#removeModal').modal('hide');
                };

                vm.resolveCreate = function(res){
                    var code = res.code
                    code == 200?alert('新增成功！'):alert('新增失败！')
                    vm.onLoad();
                };
                vm.resolveUpdate = function(res){
                    var code = res.code
                    code == 200?alert('审核成功！'):alert('审核失败！')
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
