'use strict';

/**
 * Config for the router
 */
angular.module('app')
	.run(
		['$rootScope', '$state', '$stateParams',
			function($rootScope, $state, $stateParams) {
				$rootScope.$state = $state;
				$rootScope.$stateParams = $stateParams;
			}
		]
	)
	.config(
		['$stateProvider', '$urlRouterProvider',
			function($stateProvider, $urlRouterProvider) {

				$urlRouterProvider
					.otherwise('/access/signin');
				$stateProvider
					.state('app', {
						abstract: true,
						url: '/app',
						templateUrl: 'views/app.html'
					})
					.state('app.dashboard', {
						url: '/dashboard',
						controller: 'AdminCtrl',
						templateUrl: 'views/dashboard.html',
					})

					// others
					.state('lockme', {
						url: '/lockme',
						controller: 'LockMeCtrl',
						templateUrl: 'views/lockme.html'
					})
					.state('access', {
						url: '/access',
						template: '<div ui-view class="fade-in-right-big smooth"></div>'
					})
					.state('access.signin', {
						url: '/signin',
						templateUrl: 'views/signin.html',
						controller: 'SigninFormController',
					})

					.state('app.config', {
						url: '/config',
						template: '<div ui-view></div>'
					})
					.state('app.config.swiper', {
						url: '/swiper',
						controller: 'SwiperCtrl',
						templateUrl: 'views/Config/Swiper.html',
					})
					.state('app.config.config', {
						url: '/config',
						controller: 'config',
						templateUrl: 'views/Config/Config.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})
					.state('app.config.rule', {
						url: '/rule',
						controller: 'RuleCtrl',
						templateUrl: 'views/Config/Rule.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})

					.state('app.video', {
						url: '/video',
						template: '<div ui-view></div>'
					})
					.state('app.video.type', {
						url: '/type',
						controller: 'VideoTypeCtrl',
						templateUrl: 'views/Video/VideoType.html',
					})
					.state('app.video.list', {
						url: '/list/:type',
						params: {
							'type': null
						},
						controller: 'VideoCtrl',
						templateUrl: 'views/Video/Video.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})

					.state('app.file', {
						url: '/file',
						template: '<div ui-view></div>'
					})
					.state('app.file.type', {
						url: '/type',
						controller: 'FileTypeCtrl',
						templateUrl: 'views/File/FileType.html',
					})
					.state('app.file.list', {
						url: '/list/:type',
						params: {
							'type': null
						},
						controller: 'FileCtrl',
						templateUrl: 'views/File/File.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})
					.state('app.course', {
						url: '/course',
						template: '<div ui-view></div>'
					})
					.state('app.course.type', {
						url: '/type',
						controller: 'CourseTypeCtrl',
						templateUrl: 'views/Course/CourseType.html',
					})
					.state('app.course.list', {
						url: '/list/:type',
						params: {
							'type': null
						},
						controller: 'CourseCtrl',
						templateUrl: 'views/Course/Course.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})
					.state('app.courseApply', {
						url: '/courseApply',
						template: '<div ui-view></div>'
					})
					.state('app.courseApply.list', {
						url: '/list/:type',
						params: {
							'type': null
						},
						controller: 'CourseApplyCtrl',
						templateUrl: 'views/Course/CourseApply.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})

					.state('app.user', {
						url: '/user',
						template: '<div ui-view></div>'
					})
					.state('app.user.customer', {
						url: '/customer',
						controller: 'CustomerCtrl',
						templateUrl: 'views/User/Customer.html',
					})
					.state('app.user.membershipPackage', {
						url: '/membershipPackage',
						controller: 'MembershipPackageCtrl',
						templateUrl: 'views/User/MembershipPackage.html',
					})
					.state('app.user.consultant', {
						url: '/consultant',
						controller: 'ConsultantCtrl',
						templateUrl: 'views/User/Consultant.html',
					})

					.state('app.product', {
						url: '/product',
						template: '<div ui-view></div>'
					})
					.state('app.product.type', {
						url: '/type',
						controller: 'ProductTypeCtrl',
						templateUrl: 'views/Product/ProductType.html',
					})
					.state('app.product.new', {
						url: '/new',
						controller: 'ProductNewCtrl',
						templateUrl: 'views/Product/ProductNew.html',
					})
					.state('app.product.list', {
						url: '/list/:productTypeId/:manufacturerId/:status',
						params: {
							'productTypeId': null,
							'manufacturerId': null,
							'status': null,
						},
						controller: 'ProductCtrl',
						templateUrl: 'views/Product/Product.html',
					})
					.state('app.product.integral', {
						url: '/integral/:productTypeId',
						params: {
							'productTypeId': null
						},
						controller: 'IntegralCtrl',
						templateUrl: 'views/Product/Integral.html',
					})

					.state('app.order', {
						url: '/order',
						template: '<div ui-view></div>'
					})
					.state('app.order.list', {
						url: '/list/:manufacturerId/:status',
						params: {
							'manufacturerId': null,
							'status': null,
						},
						controller: 'OrderCtrl',
						templateUrl: 'views/Order/OrderList.html',
					})
					.state('app.order.video', {
						url: '/video',
						controller: 'videoOrder',
						templateUrl: 'views/Order/videoOrderList.html',
					})
					.state('app.order.file', {
						url: '/file',
						controller: 'fileOrder',
						templateUrl: 'views/Order/fileOrderList.html',
					})
					.state('app.order.integral', {
						url: '/integral',
						controller: 'integralOrder',
						templateUrl: 'views/Order/integralOrderList.html',
					})
					.state('app.order.member', {
						url: '/member',
						controller: 'memberOrder',
						templateUrl: 'views/Order/memberOrderList.html',
					})

					.state('app.news', {
						url: '/news',
						template: '<div ui-view></div>'
					})
					.state('app.news.list', {
						url: '/list',
						controller: 'NewsCtrl',
						templateUrl: 'views/Config/News.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})
					.state('app.news.listCourseNew', {
						url: '/list',
						controller: 'CourseNewsCtrl',
						templateUrl: 'views/Config/CourseNews.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})
					.state('app.manufacturer', {
						url: '/manufacturer',
						template: '<div ui-view></div>'
					})
					.state('app.manufacturer.provider', {
						url: '/provider/:status',
						params: {
							'status': null
						},
						controller: 'ProviderCtrl',
						templateUrl: 'views/Manufacturer/Provider.html',
					})
					.state('app.manufacturer.product', {
						url: '/product/:manufacturerId',
						params: {
							'manufacturerId': null
						},
						controller: 'ProviderProductCtrl',
						templateUrl: 'views/Manufacturer/Product.html',
					})
					.state('app.manufacturer.factory', {
						url: '/factory/:status',
						params: {
							'status': null
						},
						controller: 'FactoryCtrl',
						templateUrl: 'views/Manufacturer/Factory.html',
					})
					.state('app.applyVideo', {
						url: '/applyVideo',
						template: '<div ui-view></div>'
					})
					.state('app.applyVideo.list', {
						url: '/list/:type',
						params: {
							'type': null
						},
						controller: 'ApplyVideoCtrl',
						templateUrl: 'views/Video/applyVideo.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})
					.state('app.applyVideo.passList', {
						url: '/list/:type',
						params: {
							'type': null
						},
						controller: 'PassVideoCtrl',
						templateUrl: 'views/Video/PassVideo.html',
						resolve: {
							deps: ['$ocLazyLoad',
								function($ocLazyLoad) {
									return $ocLazyLoad.load('textAngular')
								}
							]
						}
					})


			}
		]
	);
