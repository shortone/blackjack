angular.module('HomeCtrl', [])
.controller('HomeController', ['$scope', '$location', 'Table', function($scope, $location, Table) {

  $scope.createNewTable = function() {
    var table = Table.create().success(function(data, status, headers, config) {
      $location.path('/table/' + data._id);
    }).error(function(data, status, headers, config) {
      // TODO properly handle error...
      console.log('error...');
    });
  };
}]);
