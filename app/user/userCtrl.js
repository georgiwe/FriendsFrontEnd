'use strict';

angular.module('Friends').controller('UserCtrl', ['$scope', 'usersData', 'userId', function ($scope, usersData, userId) {
	usersData.getById(userId).then(function (user) {
		// user.Likes.push({
		// 	Text: 'Wawahawhehwhehewhewh w h ewhewhewh ehw',
		// 	CreatedBy: 'Georgi Prodanov'
		// });
		$scope.user = user;
		// console.log(user)
	});
}]);