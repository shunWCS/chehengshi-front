'use strict';

angular.module('app', [
		'ngAnimate',
		'ngCookies',
		'ngResource',
		'ui.router',
		'ui.router.state.events',
		'ui.bootstrap',
		'ui.load',
		'oc.lazyLoad',
		'angularFileUpload',
		'module.service',
		'module.controller',
		'scHelper'
	])
	.run(['$rootScope', '$window', '$state', '$location', function($rootScope, $window, $state, $location) {

		$rootScope.$on('$stateChangeStart', function(event) {
			var ifLoginTrue = $window.sessionStorage['ifLoginTrue'] || false,
				ifAuthTrue = $window.sessionStorage['ifAuthTrue'] || false;
			console.info('ifLoginTrue', ifLoginTrue)
			if(!ifAuthTrue && !ifLoginTrue) {
				$location.path('/access/signin');
				return;
			} else if(!ifLoginTrue) {
				$location.path('/lockme');
				return;
			}
		})

		$rootScope.userInfo = {
			ifLoginTrue: $window.sessionStorage['ifLoginTrue'],
			avatar: $window.sessionStorage['avatar'],
			nickName: $window.sessionStorage['ifAuthTrue']
		}
	}])