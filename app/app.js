'use strict';

angular.module('Friends', ['ui.router'])
	.constant('API_KEY', 'DMcljujfrykFryWB')
	.constant('LOADER_URL', '../assets/images/loader.gif')
	.constant('MISSING_IMAGE_URL', '../assets/images/no-image.jpg')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'home/home.html',
				controller: 'HomeCtrl'
			})

			.state('activities', {
				url: '/activities',
				templateUrl: 'activities/activities.html',
				controller: 'ActivitiesCtrl'
			})

			.state('users', {
				url: '/users',
				templateUrl: 'users/users.html',
				controller: 'UsersCtrl'
			})

			.state('user', {
				url: '/user/:id',
				templateUrl: 'user/user.html',
				controller: 'UserCtrl',
				resolve: {
					userId: ['$stateParams', function ($stateParams) {
						return $stateParams.id;
					}]
				}
			});
	}]);

