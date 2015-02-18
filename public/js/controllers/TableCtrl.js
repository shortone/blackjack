angular.module('TableCtrl', [])
.controller('TableController', ['$scope', '$routeParams', function($scope, $routeParams) {
  $scope.tagline = 'This is the table view ' + $routeParams.id;
}]);
