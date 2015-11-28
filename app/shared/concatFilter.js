'use strict';

angular.module('Friends').filter('concat', function () {
	return function (input, separator) {
		if (!Array.isArray(input)) {
			throw 'The concatenation filter only works with arrays.';
		}

		return input.join(separator || ', ');
	};
});