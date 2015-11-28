'use strict';

angular.module('Friends', ['ui.router'])
	.constant('API_KEY', 'DMcljujfrykFryWB')
	.constant('LOADER_URL', '../assets/images/loader.gif')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'app/home/home.html',
				controller: 'HomeCtrl'
			})

			.state('activities', {
				url: '/activities',
				templateUrl: 'app/activities/activities.html',
				controller: 'ActivitiesCtrl'
			})

			.state('users', {
				url: '/users',
				templateUrl: 'app/users/users.html',
				controller: 'UsersCtrl'
			})

			.state('user', {
				url: '/user/:id',
				templateUrl: 'app/user/user.html',
				controller: 'UserCtrl'
			});
	}]);

