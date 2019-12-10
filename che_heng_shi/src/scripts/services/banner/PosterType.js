(function(angular){
    angular.module('module.service').service('PosterType',[
        '$resource',
        '$q',
        function($resource,$q){
            var PosterType = $resource(PosterTypeURL+'/:_id',{_id:'@_id'});
            return {
                getList: function(params){
                    var deferred = $q.defer();//不可抽出
                    PosterType.get(params,
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
                    PosterType.get({_id: id},
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
                    PosterType.create(obj,
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
                    PosterType.remove({_id: id},
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
                    PosterType.update(obj,
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
