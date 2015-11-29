'use strict';

angular.module('Friends').controller('UserCtrl', ['$scope', 'usersData', 'userId', function ($scope, usersData, userId) {
	usersData.getById(userId).then(function (user) {
		$scope.user = user;
	});
}]);