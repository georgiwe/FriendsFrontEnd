'use strict';


angular.module('Friends').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
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
			url: '/users/:id',
			templateUrl: 'user/user.html',
			controller: 'UserCtrl',
			resolve: {
				userId: ['$stateParams', function ($stateParams) {
					return $stateParams.id;
				}]
			}
		});
}]);