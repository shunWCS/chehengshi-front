(function(angular){
    angular.module('module.service').service('PosterBanner',[
        '$resource',
        '$q',
        function($resource,$q){
            var PosterBanner = $resource(PosterBannerURL+'/:_id',{_id:'@_id'});
            return {
                getList: function(typeValue){
                    var deferred = $q.defer();//不可抽出
                    PosterBanner.get(typeValue,
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
                    PosterBanner.get({_id: id},
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
                    PosterBanner.create(obj,
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
                    PosterBanner.remove({_id: id},
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
                    PosterBanner.update(obj,
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
