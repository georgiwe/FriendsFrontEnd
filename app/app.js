'use strict';

angular.module('Friends', ['ui.router', 'toastr'])
	.constant('API_KEY', 'DMcljujfrykFryWB')
	.constant('LOADER_URL', '../assets/images/loader.gif')
	.constant('MISSING_IMAGE_URL', '../assets/images/no-image.jpg')
	.config(['toastrConfig', function (toastrConfig) {
		angular.extend(toastrConfig, {
			preventOpenDuplicates: true,
			positionClass: 'toast-top-left'
		});
	}]);
