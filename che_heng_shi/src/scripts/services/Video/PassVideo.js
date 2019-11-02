(function(angular){
    angular.module('module.service').service('PassVideo',[
        '$resource',
        '$q',
        function($resource,$q){
            var PassVideo = $resource(PassVideoUrl+'/:_id',{_id:'@_id'});
            return {
                getList: function(params){
                    var deferred = $q.defer();//不可抽出
                    PassVideo.get(params,
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
                    PassVideo.get({_id: id},
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
                    PassVideo.create(obj,
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
                    PassVideo.remove({_id: id},
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
                    PassVideo.update(obj,
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
