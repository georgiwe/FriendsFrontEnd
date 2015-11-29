'use strict';

angular.module('Friends').controller('UsersCtrl', ['$scope', 'usersData', function ($scope, usersData) {
	usersData.getAll().then(function (users) {
		$scope.users = users;
	});
}]);