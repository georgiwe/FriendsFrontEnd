'use strict';

angular.module('Friends').controller('ActivitiesCtrl', ['$scope', 'activitiesData', function ($scope, activitiesData) {
	activitiesData.getAll().then(function (activities) {
		$scope.activities = activities;
	});
}]);