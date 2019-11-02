(function(angular){
    angular.module('module.controller')
        .controller('CourseCtrl',[
            '$scope',
            '$filter',
            '$rootScope',
            'FileUploader',
            'Course',
            'CourseType',
            function($scope,$filter,$rootScope,FileUploader,Course,CourseType){
                var vm = $scope.vm = {};

                vm.blockquote = "课程列表";

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
                    {label: '开始时间',name: 'beginTime',type: 'string'},
                    {label: '结束时间',name: 'endTime',type: 'string'},
                    {label: '操作',name: 'actions',sortable: false,colspan:2}
                ];

                vm.whenType = function(){
                    $rootScope.$state.go('app.course.list',{type: vm.type})
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
                    CourseType.getList(params).then(function(answer){vm.typeList = answer});
                };

                vm.getList = function(params){
                    Course.getList(params).then(function(answer){vm.items = answer});
                };
                vm.getById = function(id){
                    Course.getById(id).then(function(answer){vm.Item = answer});
                };

                vm.create = function(obj){
                    obj.text = obj.text?$filter('unicodeToString')(obj.text):''
                    var begin = obj.beginTime;
                    var beginDate=new Date(begin.replace("-","/"));
                    var end = obj.endTime;
                    var endDate=new Date(end.replace("-","/"));
                    if(beginDate>endDate){
                        alert("开始时间必须小于结束时间");
                        return;
                    }
                    Course.create(obj).then(vm.resolveCreate)
                    $('#createModal').modal('hide');
                };
                vm.update = function(obj){
                    obj.text = obj.text?$filter('unicodeToString')(obj.text):''
                    var begin = obj.beginTime;
                    var beginDate=new Date(begin.replace("-","/"));
                    var end = obj.endTime;
                    var endDate=new Date(end.replace("-","/"));
                    if(beginDate>endDate){
                        alert("开始时间必须小于结束时间");
                        return;
                    }
                    Course.update(obj).then(vm.resolveUpdate);
                    $('#updateModal').modal('hide');
                };

                vm.remove = function(id){
                    Course.remove(id).then(vm.resolveRemove);
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

                $('#beginTime').datetimepicker({
                    language:'zh-CN',
                    format: 'yyyy-mm-dd hh:ii',//显示格式
                    autoclose: true,
                    todayBtn: true,
                    pickerPosition: "bottom-right"//日期框的箭头是在左边，或者右边

                });
                $('#endTime').datetimepicker({
                    language:'zh-CN',
                    format: 'yyyy-mm-dd hh:ii',//显示格式
                    autoclose: true,
                    todayBtn: true,//今天按钮是否显示
                    pickerPosition: "bottom-right"//日期框的箭头是在左边，或者右边
                });

                $('#beginTime1').datetimepicker({
                    language:'zh-CN',
                    format: 'yyyy-mm-dd hh:ii',//显示格式
                    autoclose: true,
                    clearBtn: true,//清除按钮
                    todayBtn: true,
                    pickerPosition: "bottom-right"//日期框的箭头是在左边，或者右边

                });
                $('#endTime1').datetimepicker({
                    language:'zh-CN',
                    format: 'yyyy-mm-dd hh:ii',//显示格式
                    autoclose: true,
                    clearBtn: true,//清除按钮
                    todayBtn: true,//今天按钮是否显示
                    pickerPosition: "bottom-right"//日期框的箭头是在左边，或者右边
                });

            }
        ])
})(angular);
