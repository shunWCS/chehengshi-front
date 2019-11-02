(function(angular){
	angular.module('scHelper').filter('orderClass', function() {
	  	return function (direction) {
		    if (direction === -1){
		      return "glyphicon-sort-by-attributes-alt";
		    }else{
		      return "glyphicon-sort-by-attributes";
		    }
	  	}
	});
})(angular);
