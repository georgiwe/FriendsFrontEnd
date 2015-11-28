'use strict';

angular.module('Friends').controller('ActivitiesCtrl', ['$scope', '$timeout', 'activitiesData', function ($scope, $timeout, activitiesData) {

	activitiesData.getAll().then(function (activities) {
		$scope.activities = activities;
	})
	.then(function () {
		$timeout(activitiesData.processResponsiveImages, 110);
	});

}]);