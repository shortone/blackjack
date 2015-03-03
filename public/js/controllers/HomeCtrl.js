angular.module('HomeCtrl', [])
.controller('HomeController', ['$scope', '$location', 'Table', function($scope, $location, Table) {
  $scope.tableId = '';

  $scope.createTable = function() {
    Table.create().then(function(payload) {
      $location.path('/table/' + payload.data._id);
    });
  };

  /*
  $scope.createTable = function() {
    user.createTable().then(function(id) {
      $location.path('/table/' + id);
    });
  };

  $scope.joinTable = function() {
    console.log('joining table ' + $scope.tableId + '...');
    user.joinTable($scope.tableId).then(function() {
      $location.path('/table/' + $scope.tableId);
    });
  };*/

  /*
  $scope.createNewTable = function() {
    var table = Table.create().success(function(data, status, headers, config) {
      $location.path('/table/' + data._id);
    }).error(function(data, status, headers, config) {
      // TODO properly handle error...
      console.log('error...');
    });
  };*/
}]);
