angular.module('HomeCtrl', [])
.controller('HomeController', ['$scope', '$location', 'Table', 'User', function($scope, $location, Table, User) {

  $scope.tableId = '';

  $scope.createTable = function() {
    Table.create().then(function(payload) {
      // TODO validate that the table was successfully created
      User.init(payload.data._id, Table.RoleEnum.DEALER);
      $location.path('/table/' + payload.data._id);
    });
  };

  $scope.joinTable = function() {
    // TODO validate that the table exist
    User.init($scope.tableId, Table.RoleEnum.PLAYER);
    $location.path('/table/' + $scope.tableId);
  };
}]);
