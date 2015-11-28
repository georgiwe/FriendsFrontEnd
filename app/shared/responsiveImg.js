'use strict';

angular.module('Friends').directive('responsive', ['backendServices', function (backendServices) {
	return {
		restrict: 'A',
		link: function (scope, element, attrs) {
			scope.$watch(function () {
				return attrs.dataSrc;
			}, function () {
				backendServices
					.processResponsiveImage(element)
					.then(function (result) {
						result.processed[0].dataset.offline = false;
						result.processed[0].dataset.responsive = false;
					});
			});
		}
	};
}]);