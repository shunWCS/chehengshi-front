(function(angular){
	angular.module('module.service').service('Config',[
		'$resource',
		'$q',
		function($resource,$q){
			var Resource = $resource(ConfigURL+'/:_id',{_id:'@_id'});
			return {
				getList: function(params){
					var deferred = $q.defer();//不可抽出
					Resource.get(params,({data}) =>{deferred.resolve(data)	});
					return deferred.promise;
				},
				getById: function(id){
					var deferred = $q.defer();//不可抽出
					Resource.get({_id: id},({data}) =>{deferred.resolve(data)	});
					return deferred.promise;
				},
				create: function(obj){
					var deferred = $q.defer();//不可抽出
					Resource.create(obj,({code}) =>{deferred.resolve(answer)});
					return deferred.promise;
				},
				remove: function(id){
					var deferred = $q.defer();//不可抽出
					Resource.remove({_id: id},({code}) =>{deferred.resolve(code)	});
					return deferred.promise;
				},
				update: function(obj){
					var deferred = $q.defer();//不可抽出
					Resource.update(obj,({code}) =>{deferred.resolve(code)	});
					return deferred.promise;
				}
			};
		}
	]);
})(angular);
