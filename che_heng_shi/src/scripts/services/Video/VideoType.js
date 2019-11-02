(function(angular){
	angular.module('module.service').service('VideoType',[
		'$resource',
		'$q',
		function($resource,$q){
			var VideoType = $resource(VideoTypeURL+'/:_id',{_id:'@_id'});
			return {
				getList: function(params){
					var deferred = $q.defer();//不可抽出
					VideoType.get(params,
						function(answer){
							deferred.resolve(answer.data);
						},
						function(error){
							deferred.resolve(error);
						}
					);
					return deferred.promise;
				},
				getById: function(id){
					var deferred = $q.defer();//不可抽出
					VideoType.get({_id: id},
						function(answer){
							deferred.resolve(answer.data);
						},
						function(error){
							deferred.resolve(error);
						}
					);
					return deferred.promise;
				},
				create: function(obj){
					var deferred = $q.defer();//不可抽出
					VideoType.create(obj,
						function(answer){
							deferred.resolve(answer);
						},
						function(error){
							deferred.resolve(error);
						}
					);
					return deferred.promise;
				},
				remove: function(id){
					var deferred = $q.defer();//不可抽出
					VideoType.remove({_id: id},
						function(answer){
							deferred.resolve(answer);
						},
						function(error){
							deferred.resolve(error);
						}
					);
					return deferred.promise;
				},
				update: function(obj){
					var deferred = $q.defer();//不可抽出
					VideoType.update(obj,
						function(answer){
							deferred.resolve(answer);
						},
						function(error){
							deferred.resolve(error);
						}
					);
					return deferred.promise;
				}
			};
		}
	]);
})(angular);
