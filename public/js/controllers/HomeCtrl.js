angular.module('HomeCtrl', [])
.controller('HomeController', ['$scope', '$location', 'Table', function($scope, $location, Table) {

  $scope.createNewTable = function() {
    // TODO ask server to create new table
    var table = Table.create();
    
    // TODO redirect the client to the new table page
    $location.path('/table/' + table.id);
  };
}]);
