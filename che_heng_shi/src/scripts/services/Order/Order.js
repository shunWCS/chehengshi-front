(function(angular){
	angular.module('module.service').service('Order',[
		'$resource',
		'$q',
		function($resource,$q){
			var Order = $resource(OrderURL+'/:_id',{_id:'@_id'});
			return {
				getList: function(params){
					var deferred = $q.defer();//不可抽出
					Order.get(params,deferred.resolve);
					return deferred.promise;
				},
				getById: function(id){
					var deferred = $q.defer();//不可抽出
					Order.get({_id: id},({data}) =>{ deferred.resolve(data)});
					return deferred.promise;
				},
				create: function(obj){
					var deferred = $q.defer();//不可抽出
					Order.create(obj,(answer) =>{deferred.resolve(answer)});
					return deferred.promise;
				},
				remove: function(id){
					var deferred = $q.defer();//不可抽出
					Order.remove({_id: id},(answer) =>{deferred.resolve(answer)});
					return deferred.promise;
				},
				update: function(obj){
					var deferred = $q.defer();//不可抽出
					Order.update(obj,(answer) =>{deferred.resolve(answer)});
					return deferred.promise;
				}
			};
		}
	]);
})(angular);
