'use strict';

angular.module('Friends', ['ui.router'])
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider.state('home', {
			url: '/',
			templateUrl: 'home/home.html',
			controller: 'HomeCtrl'
		});
	}]);

